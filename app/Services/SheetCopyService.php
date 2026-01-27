<?php

namespace App\Services;

use Google\Client;
use Google\Service\Drive as GoogleDrive;
use Google\Service\Drive\DriveFile;
use Google\Service\Sheets;
use Google\Service\Sheets\ValueRange;
use App\Models\User;
use App\Models\Plan;
use Illuminate\Support\Facades\Log;
use Google\Service\Drive\Permission;
class SheetCopyService
{
    /**
     * @param User $user
     * @param Plan $plan
     * @param array $selectedMonths Array of month strings, e.g., ['Jan', 'Feb']
     */
    public static function provisionFolderForUser(User $user, Plan $plan, array $selectedMonths = [])
    {
        // ------------------------------------------------------
        // 1. SETUP ACTORS
        // ------------------------------------------------------
        $userClient = self::getUserClient($user);
        $userDrive = new GoogleDrive($userClient);

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
        ]);

        try {
            $newFolder = $userDrive->files->create($folderMetadata, [
                'fields' => 'id, name, webViewLink'
            ]);
            // SHARE FOLDER WITH BOT (Necessary for future operations if needed)
//            $botEmail = config('services.google.bot_client_email');
//            if (!empty($botEmail)) {
//                try {
//                    $permission = new Permission([
//                        'type' => 'user',
//                        'role' => 'writer',
//                        'emailAddress' => $botEmail
//                    ]);
//                    $userDrive->permissions->create($newFolder->id, $permission, ['sendNotificationEmail' => false]);
//                } catch (\Exception $e) {
//                    Log::error("SHARING ERROR: " . $e->getMessage());
//                }
//            }
        } catch (\Google\Service\Exception $e) {
            Log::error('Google Drive Create Failed: ' . $e->getMessage());
            throw $e;
        }

        // ------------------------------------------------------
        // 3. TRANSFER FILES (WITH MONTH FILTERING)
        // ------------------------------------------------------
        $copyData = self::bridgeFiles(
            $botDrive,      // Reader (Bot)
            $userDrive,     // Writer (User)
            $templateFolderId,
            $newFolder->id,
            $userName,
            $ktjId,
            $selectedMonths
        );

        // ------------------------------------------------------
        // 4. POPULATE SHEETS (AS USER)
        // ------------------------------------------------------
        if ($copyData['dashboardId']) {
            self::populateDashboardSheet(
                $userClient,
                $copyData['dashboardId'],
                $copyData['monthlySheets'], // Contains 'month' and 'url'
                $userName,
                $ktjId,
                $planName
            );
        }

        foreach ($copyData['monthlySheets'] as $sheet) {
            self::populateMonthlySheet(
                $userClient,
                $sheet['id'],
                $userName,
                $ktjId
            );
        }

        // ------------------------------------------------------
        // 5. SAVE TO DB
        // ------------------------------------------------------
        $resource = $user->driveResources()->create([
            'type' => 'folder',
            'google_file_id' => $newFolder->id,
            'name' => $newFolder->name,
            'plan_id' => $plan->id,
            'status' => 'active',
            'link' => $newFolder->webViewLink
        ]);

        foreach ($copyData['allFiles'] as $fileData) {
            $resource->files()->create([
                'type' => $fileData['type'],
                'google_file_id' => $fileData['google_file_id'],
                'name' => $fileData['name'],
                'link' => $fileData['link']
            ]);
        }

        return $newFolder;
    }

    private static function bridgeFiles(GoogleDrive $reader, GoogleDrive $writer, $sourceId, $destId, $userName, $userId, array $selectedMonths)
    {
        $dashboardId = null;
        $monthlySheets = [];
        $allFiles = [];
        $pageToken = null;

        Log::info("--- STARTING BRIDGE FILES WITH MONTH FILTERING ---");

        do {
            $response = $reader->files->listFiles([
                'q' => "'{$sourceId}' in parents and trashed = false",
                'fields' => 'nextPageToken, files(id, name, mimeType, webViewLink)',
                'pageToken' => $pageToken,
                'supportsAllDrives' => true,
                'includeItemsFromAllDrives' => true
            ]);

            foreach ($response->files as $file) {
                // 1. Check if it's a Monthly Sheet and if it's selected
                $isMonthly = preg_match('/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/i', $file->name, $matches);
                $monthFound = $isMonthly ? ucfirst(strtolower($matches[1])) : null;

                if ($isMonthly && !in_array($monthFound, $selectedMonths)) {
                    Log::info("Skipping month: {$monthFound} (not in selection)");
                    continue;
                }

                // 2. Prepare Naming
                $newFileName = str_replace(['<Username>', '<User ID>'], [$userName, $userId], $file->name);
                if ($newFileName === $file->name) {
                    $newFileName = "{$file->name} - {$userName}";
                }

                if ($file->mimeType === 'application/vnd.google-apps.shortcut') continue;

                // 3. Download & Upload Logic
                try {
                    $exportOptions = ['alt' => 'media'];
                    $getOptions = ['alt' => 'media', 'supportsAllDrives' => true];

                    $convertFile = false;
                    $uploadMimeType = $file->mimeType;

                    if ($file->mimeType === 'application/vnd.google-apps.spreadsheet') {
                        $content = $reader->files->export($file->id, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', $exportOptions);
                        $fileContent = $content->getBody()->getContents();
                        $uploadMimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                        $convertFile = true;
                    }
                    // Handle Google Sheets
                    if ($file->mimeType === 'application/vnd.google-apps.spreadsheet') {
                        $content = $reader->files->export($file->id, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', $exportOptions);
                        $fileContent = $content->getBody()->getContents();
                        $uploadMimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                        $convertFile = true;
                    }
                    // Handle Google Docs (This is what likely caused your error)
                    elseif ($file->mimeType === 'application/vnd.google-apps.document') {
                        $content = $reader->files->export($file->id, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', $exportOptions);
                        $fileContent = $content->getBody()->getContents();
                        $uploadMimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                        $convertFile = true;
                    }
                    // Handle Google Presentations
                    elseif ($file->mimeType === 'application/vnd.google-apps.presentation') {
                        $content = $reader->files->export($file->id, 'application/vnd.openxmlformats-officedocument.presentationml.presentation', $exportOptions);
                        $fileContent = $content->getBody()->getContents();
                        $uploadMimeType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
                        $convertFile = true;
                    }
                    else {
                        $content = $reader->files->get($file->id, $getOptions);
                        $fileContent = $content->getBody()->getContents();
                    }

                    $fileMetadataConfig = ['name' => $newFileName, 'parents' => [$destId]];
                    if ($convertFile) {
                        $fileMetadataConfig['mimeType'] = $file->mimeType; // Convert back to Google format
                    }

                    $createdFile = $writer->files->create(new DriveFile($fileMetadataConfig), [
                        'data' => $fileContent,
                        'mimeType' => $uploadMimeType,
                        'uploadType' => 'multipart',
                        'fields' => 'id, name, webViewLink, mimeType'
                    ]);

                    // 4. Categorize for Dashboard and DB
                    $type = 'docs';
                    if ($createdFile->mimeType === 'application/vnd.google-apps.spreadsheet') {
                        $type = 'sheet';
                        if ($isMonthly) {
                            $monthlySheets[] = [
                                'id' => $createdFile->id,
                                'name' => $createdFile->name,
                                'month' => $monthFound,
                                'url' => "https://docs.google.com/spreadsheets/d/{$createdFile->id}/edit"
                            ];
                        } else {
                            $dashboardId = $createdFile->id;
                        }
                    }

                    $allFiles[] = [
                        'google_file_id' => $createdFile->id,
                        'name' => $createdFile->name,
                        'link' => $createdFile->webViewLink,
                        'type' => $type
                    ];

                } catch (\Exception $e) {
                    Log::error("Failed to copy {$file->name}: " . $e->getMessage());
                }
            }
            $pageToken = $response->nextPageToken;
        } while ($pageToken != null);

        return [
            'dashboardId' => $dashboardId,
            'monthlySheets' => $monthlySheets,
            'allFiles' => $allFiles
        ];
    }

    private static function populateDashboardSheet($client, $spreadsheetId, $monthlySheets, $userName, $userId, $planName)
    {
        $sheetsService = new Sheets($client);

        // Sort months chronologically
        $monthsMap = array_flip(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
        usort($monthlySheets, fn($a, $b) => ($monthsMap[$a['month']] ?? 99) <=> ($monthsMap[$b['month']] ?? 99));

        // Prepare rows: Column D is Name, Column E is URL
        $dashboardRows = array_map(fn($sheet) => [$sheet['month'], $sheet['url']], $monthlySheets);

        $data = [
            ['range' => 'E2', 'values' => [[$userName]]],
            ['range' => 'E3', 'values' => [[$userId]]],
            ['range' => 'E4', 'values' => [[$planName]]],
        ];

        if (!empty($dashboardRows)) {
            $startRow = 10;
            // Calculation: StartRow + Count - 1.
            // Example: 10 + 3 months - 1 = Row 12. Range: D10:E12
            $endRow = $startRow + count($dashboardRows) - 1;

            $data[] = [
                'range' => "D{$startRow}:E{$endRow}",
                'values' => $dashboardRows
            ];
        }

        $batchRequests = array_map(fn($item) => new ValueRange([
            'range' => $item['range'],
            'values' => $item['values']
        ]), $data);

        $body = new \Google\Service\Sheets\BatchUpdateValuesRequest([
            'valueInputOption' => 'USER_ENTERED',
            'data' => $batchRequests
        ]);

        $sheetsService->spreadsheets_values->batchUpdate($spreadsheetId, $body);
    }

    private static function getUserClient(User $user)
    {
        $client = new Client();
        $client->setClientId(config('services.google.client_id'));
        $client->setClientSecret(config('services.google.client_secret'));

        $ga = $user->googleAccount;
        $token = [
            'access_token' => $ga->access_token,
            'refresh_token' => $ga->refresh_token,
            'expires_in'    => $ga->token_expires_at->diffInSeconds(now(), false),
            'created'       => $ga->updated_at->timestamp,
        ];

        $client->setAccessToken($token);

        if ($client->isAccessTokenExpired()) {
            $newToken = $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
            $ga->update([
                'access_token' => $newToken['access_token'],
                'token_expires_at' => now()->addSeconds($newToken['expires_in'])
            ]);
        }

        return $client;
    }

    private static function populateMonthlySheet($client, $spreadsheetId, $userName, $userId)
    {
        $sheetsService = new Sheets($client);
        $data = [
            ['range' => 'F2', 'values' => [[$userName]]],
            ['range' => 'F3', 'values' => [[$userId]]],
        ];

        $body = new \Google\Service\Sheets\BatchUpdateValuesRequest([
            'valueInputOption' => 'USER_ENTERED',
            'data' => array_map(fn($item) => new ValueRange($item), $data)
        ]);

        $sheetsService->spreadsheets_values->batchUpdate($spreadsheetId, $body);
    }
}
