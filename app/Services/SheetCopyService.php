<?php

namespace App\Services;

use Google\Client;
use Google\Service\Drive as GoogleDrive;
use Google\Service\Drive\DriveFile;
use Google\Service\Drive\Permission;
use Google\Service\Sheets;
use Google\Service\Sheets\ValueRange;
use Google\Service\Sheets\BatchUpdateSpreadsheetRequest;
use App\Models\User;
use App\Models\Plan;
use Exception;
use Illuminate\Support\Facades\Log;

class SheetCopyService
{
    public static function provisionFolderForUser(User $user, Plan $plan)
    {
        $client = new Client();
        $client->setClientId(config('services.google.bot_client_id'));
        $client->setClientSecret(config('services.google.bot_client_secret'));
        $client->refreshToken(config('services.google.bot_refresh_token'));

        $driveService = new GoogleDrive($client);
        $templateFolderId = config('services.google.template_folder_id');

        try {
            // 1. Prepare User Data
            $ktjId = sprintf('KTJ%07d', $user->id);
            $year = now()->year;
            $userName = $user->name;
            // Assuming plan name is "Pro", or get it from $plan->name
            $planName = ucfirst($plan->type ?? 'Pro');

            // 2. Folder Name Logic
            $folderName = "KTJ {$planName} v1.0 - {$ktjId} - {$userName} - KeyTagJo {$year}";

            // 3. Create the New Folder
            $folderMetadata = new DriveFile([
                'name' => $folderName,
                'mimeType' => 'application/vnd.google-apps.folder',
            ]);

            $newFolder = $driveService->files->create($folderMetadata, [
                'fields' => 'id, name, webViewLink'
            ]);

            // 4. Copy files AND Identify them
            // We need to know which file is the "Dashboard" and which are "Monthly Sheets"
            $copyData = self::copyFiles(
                $driveService,
                $client,
                $templateFolderId,
                $newFolder->id,
                $userName,
                $ktjId
            );

            // 5. Run the "Sync" Logic Immediately (Populate the Dashboard)
            if ($copyData['dashboardId']) {
                self::populateDashboardSheet(
                    $client,
                    $copyData['dashboardId'],
                    $newFolder, // Pass folder object to get Link
                    $copyData['monthlySheets'],
                    $userName,
                    $ktjId,
                    $planName
                );
            } else {
                Log::warning("Provisioning: Could not find a 'Dashboard' sheet to populate.");
            }

            // 6. Share with User
            $userPermission = new Permission([
                'type' => 'user',
                'role' => 'writer',
                'emailAddress' => $user->email
            ]);

            $driveService->permissions->create(
                $newFolder->id,
                $userPermission,
                ['sendNotificationEmail' => false]
            );

            // 7. Save to DB
            $user->driveResources()->create([
                'type' => 'folder',
                'google_file_id' => $newFolder->id,
                'name' => $newFolder->name,
                'plan_id' => $plan->id,
                'ownership' => 'shared',
                'link' => $newFolder->webViewLink
            ]);

            return $newFolder;

        } catch (\Exception $e) {
            throw new Exception("Bot Service Error: " . $e->getMessage());
        }
    }

    /**
     * Copies files, deletes "Privacy" tab, and categorizes files (Dashboard vs Monthly).
     */
    private static function copyFiles(GoogleDrive $driveService, Client $client, $sourceId, $destId, $userName, $userId)
    {
        if (empty($sourceId)) {
            throw new Exception("Configuration Error: GOOGLE_TEMPLATE_FOLDER_ID is missing.");
        }

        $sheetsService = new Sheets($client);

        $dashboardId = null;
        $monthlySheets = [];

        $pageToken = null;

        do {
            $response = $driveService->files->listFiles([
                'q' => "'{$sourceId}' in parents and trashed = false",
                'fields' => 'nextPageToken, files(id, name, mimeType)',
                'pageToken' => $pageToken
            ]);

            foreach ($response->files as $file) {
                // Rename Logic
                $newFileName = $file->name;
                $newFileName = str_replace('<Username>', $userName, $newFileName);
                $newFileName = str_replace('<User ID>', $userId, $newFileName);

                if ($newFileName === $file->name) {
                    $newFileName = "{$file->name} - {$userName} - {$userId}";
                }

                $copyMetadata = new DriveFile([
                    'name' => $newFileName,
                    'parents' => [$destId]
                ]);

                // Perform Copy
                $copiedFile = $driveService->files->copy($file->id, $copyMetadata, ['fields' => 'id, name, webViewLink, mimeType']);

                // Process Google Sheets
                if ($file->mimeType === 'application/vnd.google-apps.spreadsheet') {

                    // 1. Delete Privacy Tab
                    self::deleteSheetTab($sheetsService, $copiedFile->id, 'Privacy');

                    // 2. Identify if this is a Month Sheet or the Dashboard
                    // Regex looks for "Jan", "Feb", etc. in the file name
                    if (preg_match('/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i', $copiedFile->name)) {
                        $monthlySheets[] = [
                            'name' => $copiedFile->name,
                            'id' => $copiedFile->id,
                            'url' => "https://docs.google.com/spreadsheets/d/{$copiedFile->id}/edit"
                        ];
                    } else {
                        // If it doesn't look like a month sheet, we assume it's the Dashboard
                        $dashboardId = $copiedFile->id;
                    }
                }
            }

            $pageToken = $response->nextPageToken;
        } while ($pageToken != null);

        return [
            'dashboardId' => $dashboardId,
            'monthlySheets' => $monthlySheets
        ];
    }

    /**
     * Replaces the JS Script: Writes User Info, Folder Link, and Sheet Links to the Dashboard.
     */
    private static function populateDashboardSheet($client, $spreadsheetId, $folder, $monthlySheets, $userName, $userId, $planName)
    {
        $sheetsService = new Sheets($client);
        $monthMap = [
            'Jan' => 1, 'Feb' => 2, 'Mar' => 3, 'Apr' => 4, 'May' => 5, 'Jun' => 6,
            'Jul' => 7, 'Aug' => 8, 'Sep' => 9, 'Oct' => 10, 'Nov' => 11, 'Dec' => 12
        ];

        // 1. Prepare Header Data (E2, E3, E4, E9)
        $dataToUpdate = [
            ['range' => 'E2', 'values' => [[$userName]]],
            ['range' => 'E3', 'values' => [[$userId]]],
            ['range' => 'E4', 'values' => [[$planName]]],
            ['range' => 'E9', 'values' => [[$folder->webViewLink]]], // Set Folder Link
        ];

        // 2. Process Monthly Links
        // Sort them first
        usort($monthlySheets, function ($a, $b) use ($monthMap) {
            preg_match('/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i', $a['name'], $mA);
            preg_match('/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i', $b['name'], $mB);

            $ordA = $monthMap[ucfirst(strtolower($mA[1] ?? ''))] ?? 99;
            $ordB = $monthMap[ucfirst(strtolower($mB[1] ?? ''))] ?? 99;
            return $ordA <=> $ordB;
        });

        // Prepare Column Data
        $linkValues = [];
        foreach ($monthlySheets as $sheet) {
            $linkValues[] = [$sheet['url']];
        }

        // Add Links to Batch Update (Target: E10)
        if (!empty($linkValues)) {
            $dataToUpdate[] = [
                'range' => 'E10',
                'values' => $linkValues
            ];
        } else {
            $dataToUpdate[] = [
                'range' => 'C1',
                'values' => [["No valid sheets found"]]
            ];
        }

        // 3. Execute Batch Update
        $batchRequests = [];
        foreach ($dataToUpdate as $item) {
            $batchRequests[] = new ValueRange([
                'range' => $item['range'],
                'values' => $item['values']
            ]);
        }

        $batchBody = new \Google\Service\Sheets\BatchUpdateValuesRequest([
            'valueInputOption' => 'RAW',
            'data' => $batchRequests
        ]);

        $sheetsService->spreadsheets_values->batchUpdate($spreadsheetId, $batchBody);
    }

    private static function deleteSheetTab(Sheets $sheetsService, $spreadsheetId, $sheetName)
    {
        try {
            $spreadsheet = $sheetsService->spreadsheets->get($spreadsheetId);
            $sheetIdToDelete = null;

            foreach ($spreadsheet->getSheets() as $sheet) {
                if (strtolower($sheet->properties->title) === strtolower($sheetName)) {
                    $sheetIdToDelete = $sheet->properties->sheetId;
                    break;
                }
            }

            if ($sheetIdToDelete !== null) {
                $requestBody = new BatchUpdateSpreadsheetRequest([
                    'requests' => [
                        ['deleteSheet' => ['sheetId' => $sheetIdToDelete]]
                    ]
                ]);
                $sheetsService->spreadsheets->batchUpdate($spreadsheetId, $requestBody);
            }
        } catch (\Exception $e) {
            Log::warning("Could not delete '$sheetName': " . $e->getMessage());
        }
    }
}
