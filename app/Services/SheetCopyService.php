<?php

namespace App\Services;

use Google\Client;
use Google\Service\Drive as GoogleDrive;
use Google\Service\Drive\DriveFile;
use Google\Service\Drive\Permission;
use App\Models\User;
use App\Models\Plan;
use Exception;

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
            $ktjId = sprintf('KTJ%07d', $user->id); // e.g. KTJ0000005
            $year = now()->year;
            $userName = $user->name;

            // 2. Folder Name Logic
            // Result: "KTJ Pro v1.0 - KTJ0000005 - John Doe - KeyTagJo 2025"
            $folderName = "KTJ Pro v1.0 - {$ktjId} - {$userName} - KeyTagJo {$year}";

            // 3. Create the New Folder
            $folderMetadata = new DriveFile([
                'name' => $folderName,
                'mimeType' => 'application/vnd.google-apps.folder',
            ]);

            $newFolder = $driveService->files->create($folderMetadata, [
                'fields' => 'id, name, webViewLink'
            ]);

            // 4. Copy files (Passing user data for renaming)
            self::copyFiles(
                $driveService,
                $templateFolderId,
                $newFolder->id,
                $userName, // <--- Pass Name
                $ktjId     // <--- Pass ID
            );

            // 5. Share with User
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

            // 6. Save to DB
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
     * Copies files and replaces <Username> and <User ID> in the filename.
     */
    private static function copyFiles(GoogleDrive $service, $sourceId, $destId, $userName, $userId)
    {
        if (empty($sourceId)) {
            throw new Exception("Configuration Error: GOOGLE_TEMPLATE_FOLDER_ID is missing.");
        }

        $pageToken = null;

        do {
            $response = $service->files->listFiles([
                'q' => "'{$sourceId}' in parents and trashed = false",
                'fields' => 'nextPageToken, files(id, name, mimeType)',
                'pageToken' => $pageToken
            ]);

            foreach ($response->files as $file) {
                // 1. Get original name
                $newFileName = $file->name;

                // 2. Replace placeholders
                // It looks for "<Username>" and replaces with "John Doe"
                // It looks for "<User ID>" and replaces with "KTJ0000005"
                $newFileName = str_replace('<Username>', $userName, $newFileName);
                $newFileName = str_replace('<User ID>', $userId, $newFileName);

                // Optional: Fallback if you forget to put brackets in Drive
                // If the name doesn't change, we append the ID just to be safe
                if ($newFileName === $file->name) {
                    $newFileName = "{$file->name} - {$userName} - {$userId}";
                }

                $copyMetadata = new DriveFile([
                    'name' => $newFileName,
                    'parents' => [$destId]
                ]);

                $service->files->copy($file->id, $copyMetadata);
            }

            $pageToken = $response->nextPageToken;
        } while ($pageToken != null);
    }
}
