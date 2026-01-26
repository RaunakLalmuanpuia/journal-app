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

        $userClient = self::getUserClient($user);
        $userDrive = new GoogleDrive($userClient);

        // Bot Client (Reader)
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
        // 3. TRANSFER FILES (ALL TYPES)
        // ------------------------------------------------------

        $copyData = self::bridgeFiles(
            $botDrive,      // Reader (Bot)
            $userDrive,     // Writer (User)
            $templateFolderId,
            $newFolder->id, // Destination
            $userName,
            $ktjId
        );

        // ------------------------------------------------------
        // 4. POPULATE SHEETS (AS USER)
        // ------------------------------------------------------

        // A. Populate Dashboard (Special Logic: E2, E3, E4, Links at E9)
        if ($copyData['dashboardId']) {
            self::populateDashboardSheet(
                $userClient,
                $copyData['dashboardId'],
                $copyData['monthlySheets'], // List of sheets for links
                $userName,
                $ktjId,
                $planName
            );
        }

        // B. Populate Monthly Sheets (Standard Logic: Fill F2 and F3)
        foreach ($copyData['monthlySheets'] as $sheet) {
            self::populateMonthlySheet(
                $userClient,
                $sheet['id'], // Use the file ID
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
                'type' => $fileData['type'], // Now 'sheet' even for Dashboard
                'google_file_id' => $fileData['google_file_id'],
                'name' => $fileData['name'],
                'link' => $fileData['link']
            ]);
        }

        return $newFolder;
    }

    /**
     * Copies ALL files (Sheets, Docs, Images, PDFs) from Bot to User.
     */
    /**
     * Copies ALL files (Sheets, Docs, Images, PDFs) from Bot to User.
     * Updated to support Shared Drives (Folders shared with the Bot).
     */
    private static function bridgeFiles(GoogleDrive $reader, GoogleDrive $writer, $sourceId, $destId, $userName, $userId)
    {
        $dashboardId = null;
        $monthlySheets = [];
        $allFiles = [];
        $pageToken = null;

        Log::info("--- STARTING BRIDGE FILES ---");
        Log::info("Looking in Source Folder: {$sourceId}");

        do {
            // 1. LIST FILES (Keep flags here - this works!)
            $response = $reader->files->listFiles([
                'q' => "'{$sourceId}' in parents and trashed = false",
                'fields' => 'nextPageToken, files(id, name, mimeType, webViewLink)',
                'pageToken' => $pageToken,
                'supportsAllDrives' => true,
                'includeItemsFromAllDrives' => true
            ]);

            Log::info("Found " . count($response->files) . " files in this page.");

            foreach ($response->files as $file) {
                $newFileName = str_replace(['<Username>', '<User ID>'], [$userName, $userId], $file->name);
                if ($newFileName === $file->name) {
                    $newFileName = "{$file->name} - {$userName}";
                }

                if ($file->mimeType === 'application/vnd.google-apps.shortcut') {
                    Log::info("Skipping shortcut: {$file->name}");
                    continue;
                }

                $fileContent = null;
                $uploadMimeType = null;
                $convertFile = false;

                try {
                    // --------------------------------------------------------
                    // FIX: Separate Options for Export vs Get
                    // --------------------------------------------------------

                    // Options for EXPORT (Docs/Sheets) - CANNOT have 'supportsAllDrives'
                    $exportOptions = [
                        'alt' => 'media'
                    ];

                    // Options for GET (Binary files) - CAN have 'supportsAllDrives'
                    $getOptions = [
                        'alt' => 'media',
                        'supportsAllDrives' => true
                    ];

                    if ($file->mimeType === 'application/vnd.google-apps.spreadsheet') {
                        // Use exportOptions (No supportsAllDrives)
                        $export = $reader->files->export(
                            $file->id,
                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                            $exportOptions
                        );
                        $fileContent = $export->getBody()->getContents();
                        $uploadMimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                        $convertFile = true;
                    }
                    elseif ($file->mimeType === 'application/vnd.google-apps.document') {
                        // Use exportOptions
                        $export = $reader->files->export(
                            $file->id,
                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                            $exportOptions
                        );
                        $fileContent = $export->getBody()->getContents();
                        $uploadMimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                        $convertFile = true;
                    }
                    elseif ($file->mimeType === 'application/vnd.google-apps.presentation') {
                        // Use exportOptions
                        $export = $reader->files->export(
                            $file->id,
                            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                            $exportOptions
                        );
                        $fileContent = $export->getBody()->getContents();
                        $uploadMimeType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
                        $convertFile = true;
                    }
                    else {
                        // Binary Files (PDFs, Images) -> Use getOptions (With supportsAllDrives)
                        $content = $reader->files->get($file->id, $getOptions);
                        $fileContent = $content->getBody()->getContents();
                        $uploadMimeType = $file->mimeType;
                        $convertFile = false;
                    }
                } catch (\Exception $e) {
                    Log::error("Failed to download {$file->name}: " . $e->getMessage());
                    continue;
                }

                // 3. UPLOAD AS USER
                $fileMetadataConfig = [
                    'name' => $newFileName,
                    'parents' => [$destId],
                ];

                if ($convertFile) {
                    if (str_contains($uploadMimeType, 'spreadsheet')) $fileMetadataConfig['mimeType'] = 'application/vnd.google-apps.spreadsheet';
                    elseif (str_contains($uploadMimeType, 'wordprocessing')) $fileMetadataConfig['mimeType'] = 'application/vnd.google-apps.document';
                    elseif (str_contains($uploadMimeType, 'presentation')) $fileMetadataConfig['mimeType'] = 'application/vnd.google-apps.presentation';
                }

                try {
                    $createdFile = $writer->files->create(new DriveFile($fileMetadataConfig), [
                        'data' => $fileContent,
                        'mimeType' => $uploadMimeType,
                        'uploadType' => 'multipart',
                        'fields' => 'id, name, webViewLink, mimeType'
                    ]);

                    $type = 'docs';
                    if ($createdFile->mimeType === 'application/vnd.google-apps.spreadsheet') {
                        $isMonthly = preg_match('/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/i', $createdFile->name);
                        if ($isMonthly) {
                            $type = 'sheet';
                            $monthlySheets[] = [
                                'id' => $createdFile->id,
                                'name' => $createdFile->name,
                                'url' => "https://docs.google.com/spreadsheets/d/{$createdFile->id}/edit"
                            ];
                        } else {
                            $type = 'sheet';
                            $dashboardId = $createdFile->id;
                        }
                    }

                    $allFiles[] = [
                        'google_file_id' => $createdFile->id,
                        'name' => $createdFile->name,
                        'link' => $createdFile->webViewLink,
                        'type' => $type
                    ];

                    Log::info("Copied: {$createdFile->name}");

                } catch (\Exception $e) {
                    Log::error("Failed to upload {$newFileName}: " . $e->getMessage());
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
     private static function getUserClient(User $user)
    {
        $client = new Client();
        $client->setClientId(config('services.google.client_id'));
        $client->setClientSecret(config('services.google.client_secret'));

        $token = [
            'access_token' => $user->googleAccount->access_token,
            'refresh_token' => $user->googleAccount->refresh_token,
            'expires_in'    => $user->googleAccount->token_expires_at->diffInSeconds(now(), false),
            'created'       => $user->googleAccount->updated_at->timestamp,
        ];

        $client->setAccessToken($token);

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

    private static function populateDashboardSheet($client, $spreadsheetId, $monthlySheets, $userName, $userId, $planName)
    {
        $sheetsService = new Sheets($client);

        // Sort months
        $months = array_flip(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
        usort($monthlySheets, function ($a, $b) use ($months) {
            preg_match('/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/i', $a['name'], $mA);
            preg_match('/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/i', $b['name'], $mB);
            $idxA = isset($mA[1]) ? ($months[ucfirst(strtolower($mA[1]))] ?? 99) : 99;
            $idxB = isset($mB[1]) ? ($months[ucfirst(strtolower($mB[1]))] ?? 99) : 99;
            return $idxA <=> $idxB;
        });

        $urlValues = array_map(fn($sheet) => [$sheet['url']], $monthlySheets);

        // Build Batch Update for Dashboard
        $data = [
            ['range' => 'E2', 'values' => [[$userName]]],
            ['range' => 'E3', 'values' => [[$userId]]],
            ['range' => 'E4', 'values' => [[$planName]]],
            // Links start at E9
        ];

        if (!empty($urlValues)) {
            $data[] = ['range' => 'E9', 'values' => $urlValues];
        }

        $batchRequests = [];
        foreach ($data as $item) {
            $batchRequests[] = new ValueRange([
                'range' => $item['range'],
                'values' => $item['values']
            ]);
        }

        $body = new \Google\Service\Sheets\BatchUpdateValuesRequest([
            'valueInputOption' => 'USER_ENTERED',
            'data' => $batchRequests
        ]);

        $sheetsService->spreadsheets_values->batchUpdate($spreadsheetId, $body);
    }

    /**
     * Fills F2 with Username and F3 with User ID for standard monthly sheets.
     */
    private static function populateMonthlySheet($client, $spreadsheetId, $userName, $userId)
    {
        $sheetsService = new Sheets($client);

        $data = [
            ['range' => 'F2', 'values' => [[$userName]]],
            ['range' => 'F3', 'values' => [[$userId]]],
        ];

        $batchRequests = [];
        foreach ($data as $item) {
            $batchRequests[] = new ValueRange([
                'range' => $item['range'],
                'values' => $item['values']
            ]);
        }

        $body = new \Google\Service\Sheets\BatchUpdateValuesRequest([
            'valueInputOption' => 'USER_ENTERED',
            'data' => $batchRequests
        ]);

        try {
            $sheetsService->spreadsheets_values->batchUpdate($spreadsheetId, $body);
        } catch (\Exception $e) {
            Log::error("Failed to populate monthly sheet {$spreadsheetId}: " . $e->getMessage());
        }
    }
}
