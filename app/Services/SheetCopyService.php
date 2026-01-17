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
        // 1. Setup Client
        $client = new Client();
        $client->setClientId(config('services.google.bot_client_id'));
        $client->setClientSecret(config('services.google.bot_client_secret'));
        $client->refreshToken(config('services.google.bot_refresh_token'));

        $driveService = new GoogleDrive($client);
        $templateFolderId = config('services.google.template_folder_id');

        // 2. Prepare Metadata
        $ktjId = sprintf('KTJ%07d', $user->id);
        $year = now()->year;
        $userName = $user->name;
        $planName = ucfirst($plan->type ?? 'Pro');
        $folderName = "KTJ {$planName} v1.0 - {$ktjId} - {$userName} - KeyTagJo {$year}";

        // 3. Create Folder
        $folderMetadata = new DriveFile([
            'name' => $folderName,
            'mimeType' => 'application/vnd.google-apps.folder',
        ]);

        $newFolder = $driveService->files->create($folderMetadata, [
            'fields' => 'id, name, webViewLink'
        ]);

        // 4. Copy Files
        $copyData = self::copyFiles(
            $driveService,
            $templateFolderId,
            $newFolder->id,
            $userName,
            $ktjId
        );

        // 5. Populate Dashboard (Only if exists)
        if ($copyData['dashboardId']) {
            self::populateDashboardSheet(
                $client,
                $copyData['dashboardId'],
                $newFolder->webViewLink,
                $copyData['monthlySheets'],
                $userName,
                $ktjId,
                $planName
            );
        }

        // 6. Share with User
        $userPermission = new Permission([
            'type' => 'user',
            'role' => 'writer',
            'emailAddress' => $user->email
        ]);

        // We use 'sendNotificationEmail' => false to speed it up/reduce spam
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
    }

    private static function copyFiles(GoogleDrive $driveService, $sourceId, $destId, $userName, $userId)
    {
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
                $newFileName = str_replace(['<Username>', '<User ID>'], [$userName, $userId], $file->name);

                // Append suffix if no placeholder was found to ensure uniqueness/clarity
                if ($newFileName === $file->name) {
                    $newFileName = "{$file->name} - {$userName}";
                }

                $copyMetadata = new DriveFile([
                    'name' => $newFileName,
                    'parents' => [$destId]
                ]);

                // Copy the file
                $copiedFile = $driveService->files->copy($file->id, $copyMetadata, [
                    'fields' => 'id, name, webViewLink, mimeType'
                ]);

                // Categorize
                if ($file->mimeType === 'application/vnd.google-apps.spreadsheet') {
                    // Detect Monthly Sheet vs Dashboard
                    if (preg_match('/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/i', $copiedFile->name)) {
                        $monthlySheets[] = [
                            'name' => $copiedFile->name,
                            'url' => "https://docs.google.com/spreadsheets/d/{$copiedFile->id}/edit"
                        ];
                    } else {
                        // Assuming anything that isn't a month is the Dashboard
                        $dashboardId = $copiedFile->id;
                    }
                }
            }
            $pageToken = $response->nextPageToken;
        } while ($pageToken != null);

        return ['dashboardId' => $dashboardId, 'monthlySheets' => $monthlySheets];
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
