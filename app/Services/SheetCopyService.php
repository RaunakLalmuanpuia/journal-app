<?php

namespace App\Services;

use Google\Client;
use Google\Service\Drive as GoogleDrive;
use Google\Service\Drive\DriveFile;
use Google\Service\Drive\Permission;
use Google\Service\Sheets;
use Google\Service\Sheets\ValueRange;
use App\Models\User;
use App\Models\Plan;
use Exception;
use Illuminate\Support\Facades\Log;

class SheetCopyService
{
    public static function provisionFolderForUser(User $user, Plan $plan)
    {
        // ------------------------------------------------------
        // 1. SETUP ACTORS
        // ------------------------------------------------------

        // ACTOR A: THE USER (Writer)
        // We use the User's token so everything created belongs to "My Drive"
        $userClient = self::getUserClient($user);
        $userDrive = new GoogleDrive($userClient);

        // ACTOR B: THE BOT (Reader)
        // We use the Bot to read the hidden templates
        $botClient = new Client();
        $botClient->setClientId(config('services.google.bot_client_id'));
        $botClient->setClientSecret(config('services.google.bot_client_secret'));
        $botClient->refreshToken(config('services.google.bot_refresh_token'));
        $botDrive = new GoogleDrive($botClient);

        $templateFolderId = config('services.google.template_folder_id');

        // ------------------------------------------------------
        // 2. CREATE FOLDER (AS USER)
        // ------------------------------------------------------

        $ktjId = sprintf('KTJ%07d', $user->id);
        $year = now()->year;
        $userName = $user->name;
        $planName = ucfirst($plan->type ?? 'Pro');
        $folderName = "KTJ {$planName} v1.0 - {$ktjId} - {$userName} - KeyTagJo {$year}";

        $folderMetadata = new DriveFile([
            'name' => $folderName,
            'mimeType' => 'application/vnd.google-apps.folder',
            'parents' => ['root'],
            // No 'parents' defined implies 'My Drive' of the $userDrive
        ]);
        try {
            $about = $userDrive->about->get(['fields' => 'user']);
            Log::info('--------------------------------------------------');
            Log::info('ACTUAL FOLDER CREATOR IS: ' . $about->user->emailAddress);
            Log::info('--------------------------------------------------');
        } catch (\Exception $e) {
            Log::error('Could not identify creator: ' . $e->getMessage());
        }
        try {
            // This will throw an error if the user hasn't re-consented to the new Scope
            $newFolder = $userDrive->files->create($folderMetadata, [
                'fields' => 'id, name, webViewLink'
            ]);

            // NEW: SHARE FOLDER WITH BOT
// ---------------------------------------------------------
            $botEmail = config('services.google.bot_client_email');

            Log::info("DEBUG: Bot Email from config is: '{$botEmail}'"); // <--- CHECK THIS LOG

            if (!empty($botEmail)) {
                try {
                    $permission = new Permission([
                        'type' => 'user',
                        'role' => 'writer',
                        'emailAddress' => $botEmail
                    ]);

                    // Capture the result
                    $createdPermission = $userDrive->permissions->create($newFolder->id, $permission, [
                        'sendNotificationEmail' => false
                    ]);

                    Log::info("SUCCESS: Folder shared with {$botEmail}. Permission ID: " . $createdPermission->id);
                } catch (\Exception $e) {
                    // This catches specific sharing errors (like Domain Restrictions)
                    Log::error("SHARING ERROR: Could not share with {$botEmail}. Reason: " . $e->getMessage());
                    // We don't throw $e here so the rest of the script (copying files) can still finish
                }
            } else {
                Log::error("SKIPPING SHARE: Bot email config is missing or empty.");
            }

        } catch (\Google\Service\Exception $e) {
            // Check your storage/logs/laravel.log for this error!
            Log::error('Google Drive Create Failed: ' . $e->getMessage());
            throw $e;
        }

        // ------------------------------------------------------
        // 3. TRANSFER FILES (BOT READS -> USER WRITES)
        // ------------------------------------------------------

        $copyData = self::bridgeFiles(
            $botDrive,      // Reader (Bot)
            $userDrive,     // Writer (User)
            $templateFolderId,
            $newFolder->id, // Destination (User's new folder)
            $userName,
            $ktjId
        );

        // ------------------------------------------------------
        // 4. POPULATE DASHBOARD (AS USER)
        // ------------------------------------------------------

        if ($copyData['dashboardId']) {
            self::populateDashboardSheet(
                $userClient, // Use User Client to edit their own sheet
                $copyData['dashboardId'],
                $newFolder->webViewLink,
                $copyData['monthlySheets'],
                $userName,
                $ktjId,
                $planName
            );
        }

        // ------------------------------------------------------
        // 5. SAVE TO DB
        // ------------------------------------------------------

        $user->driveResources()->create([
            'type' => 'folder',
            'google_file_id' => $newFolder->id,
            'name' => $newFolder->name,
            'plan_id' => $plan->id,
            'ownership' => 'owner', // Verified Owner
            'link' => $newFolder->webViewLink
        ]);

        return $newFolder;
    }

    /**
     * Reads file as Bot, Uploads file as User.
     * This bypasses the "Sharing" requirement.
     */
    /**
     * Reads file as Bot, Uploads file as User.
     */
    private static function bridgeFiles(GoogleDrive $reader, GoogleDrive $writer, $sourceId, $destId, $userName, $userId)
    {
        $dashboardId = null;
        $monthlySheets = [];
        $pageToken = null;

        do {
            // 1. Bot lists the template files
            $response = $reader->files->listFiles([
                'q' => "'{$sourceId}' in parents and trashed = false",
                'fields' => 'nextPageToken, files(id, name, mimeType)',
                'pageToken' => $pageToken
            ]);

            foreach ($response->files as $file) {
                // Rename Logic
                $newFileName = str_replace(['<Username>', '<User ID>'], [$userName, $userId], $file->name);
                if ($newFileName === $file->name) {
                    $newFileName = "{$file->name} - {$userName}";
                }

                if ($file->mimeType === 'application/vnd.google-apps.spreadsheet') {

                    // 2. Bot EXPORTS the file
                    $export = $reader->files->export($file->id, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', [
                        'alt' => 'media'
                    ]);

                    // FIX IS HERE: Convert the Stream Resource to a String
                    // The Google Client requires a raw string for the 'data' parameter in this context.
                    $contentString = $export->getBody()->getContents();

                    // 3. User CREATES a new file
                    $fileMetadata = new DriveFile([
                        'name' => $newFileName,
                        'parents' => [$destId],
                        'mimeType' => 'application/vnd.google-apps.spreadsheet' // Auto-convert Excel back to Sheets
                    ]);

                    $createdFile = $writer->files->create($fileMetadata, [
                        'data' => $contentString, // PASS STRING, NOT RESOURCE
                        'mimeType' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                        'uploadType' => 'multipart',
                        'fields' => 'id, name, webViewLink'
                    ]);

                    // 4. Categorize
                    if (preg_match('/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/i', $createdFile->name)) {
                        $monthlySheets[] = [
                            'name' => $createdFile->name,
                            'url' => "https://docs.google.com/spreadsheets/d/{$createdFile->id}/edit"
                        ];
                    } else {
                        $dashboardId = $createdFile->id;
                    }
                }
            }
            $pageToken = $response->nextPageToken;
        } while ($pageToken != null);

        return ['dashboardId' => $dashboardId, 'monthlySheets' => $monthlySheets];
    }
    private static function getUserClient(User $user)
    {
        $client = new Client();
        $client->setClientId(config('services.google.client_id'));
        $client->setClientSecret(config('services.google.client_secret'));

        // Ensure you have these columns in your users or google_accounts table
        $token = [
            'access_token' => $user->googleAccount->access_token,
            'refresh_token' => $user->googleAccount->refresh_token,
            'expires_in'    => $user->googleAccount->token_expires_at->diffInSeconds(now(), false),
            'created'       => $user->googleAccount->updated_at->timestamp,
        ];

        $client->setAccessToken($token);

        // Refresh if expired
        if ($client->isAccessTokenExpired()) {
            if (!$client->getRefreshToken()) {
                throw new \Exception("User {$user->id} has no refresh token. Re-auth required.");
            }
            $newToken = $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());

            $user->googleAccount->update([
                'access_token' => $newToken['access_token'],
                'token_expires_at' => now()->addSeconds($newToken['expires_in'])
            ]);
        }

        return $client;
    }
    private static function populateDashboardSheet($client, $spreadsheetId, $folderLink, $monthlySheets, $userName, $userId, $planName)
    {
        $sheetsService = new Sheets($client);

        // Month sorting helper
        $months = array_flip(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);

        usort($monthlySheets, function ($a, $b) use ($months) {
            preg_match('/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/i', $a['name'], $mA);
            preg_match('/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/i', $b['name'], $mB);

            $idxA = isset($mA[1]) ? ($months[ucfirst(strtolower($mA[1]))] ?? 99) : 99;
            $idxB = isset($mB[1]) ? ($months[ucfirst(strtolower($mB[1]))] ?? 99) : 99;

            return $idxA <=> $idxB;
        });

        // Map sheet URLs
        $urlValues = array_map(fn($sheet) => [$sheet['url']], $monthlySheets);

        // Build Batch Update
        $data = [
            ['range' => 'E2', 'values' => [[$userName]]],
            ['range' => 'E3', 'values' => [[$userId]]],
            ['range' => 'E4', 'values' => [[$planName]]],
            ['range' => 'E9', 'values' => [[$folderLink]]],
        ];

        if (!empty($urlValues)) {
            $data[] = ['range' => 'E10', 'values' => $urlValues];
        }

        $batchRequests = [];
        foreach ($data as $item) {
            $batchRequests[] = new ValueRange([
                'range' => $item['range'],
                'values' => $item['values']
            ]);
        }

        $body = new \Google\Service\Sheets\BatchUpdateValuesRequest([
            'valueInputOption' => 'USER_ENTERED', // Use USER_ENTERED to ensure links are clickable
            'data' => $batchRequests
        ]);

        $sheetsService->spreadsheets_values->batchUpdate($spreadsheetId, $body);
    }
}
