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
        // 1. Initialize Client as the "Bot Account"
        $client = new Client();
        $client->setClientId(config('services.google.bot_client_id'));
        $client->setClientSecret(config('services.google.bot_client_secret'));
        $client->refreshToken(config('services.google.bot_refresh_token'));

        $driveService = new GoogleDrive($client);

        // This should now be the ID of the *Folder* containing your templates
        $templateFolderId = config('services.google.template_folder_id');

        try {
            // 2. Construct the specific Folder Name
            // Logic: Formats User ID (e.g., 5) to 7 digits (0000005)
            $ktjId = sprintf('KTJ%07d', $user->id);
            $year = now()->year;

            // Result: "KTJ Pro v1.0 - KTJ0000005 - John Doe - KeyTagJo 2025"
            $folderName = "KTJ Pro v1.0 - {$ktjId} - {$user->name} - KeyTagJo {$year}";

            // 3. Create the New Folder
            $folderMetadata = new DriveFile([
                'name' => $folderName,
                'mimeType' => 'application/vnd.google-apps.folder',
            ]);

            $newFolder = $driveService->files->create($folderMetadata, [
                'fields' => 'id, name, webViewLink'
            ]);

            // 4. Copy contents from Template Folder to New Folder
            self::copyFiles(
                $driveService,
                $templateFolderId,
                $newFolder->id
            );

            // 5. Share the NEW FOLDER with User (As Editor)
            // Sharing the parent folder automatically gives access to files inside
            $userPermission = new Permission([
                'type' => 'user',
                'role' => 'writer', // Editor access
                'emailAddress' => $user->email
            ]);

            $driveService->permissions->create(
                $newFolder->id,
                $userPermission,
                ['sendNotificationEmail' => false]
            );

            // 6. Save to Database
            $user->driveResources()->create([
                'type' => 'folder', // Changed type to folder
                'google_file_id' => $newFolder->id,
                'name' => $newFolder->name,
                'plan_id' => $plan->id,
                'ownership' => 'shared',
                'link' => $newFolder->webViewLink // Optional: save the direct link
            ]);

            return $newFolder;

        } catch (\Exception $e) {
            throw new Exception("Bot Service Error: " . $e->getMessage());
        }
    }

    /**
     * Helper to list files in source and copy them to destination.
     * Note: This is a "shallow" copy. It copies files, but not sub-folders.
     */
    private static function copyFiles(GoogleDrive $service, $sourceId, $destId)
    {
        // Safety check: Ensure the template folder ID is actually set in .env
        if (empty($sourceId)) {
            throw new Exception("Configuration Error: GOOGLE_TEMPLATE_FOLDER_ID is missing.");
        }

        $pageToken = null;

        do {
            // FIX: Changed 'trash' to 'trashed' in the query string
            $response = $service->files->listFiles([
                'q' => "'{$sourceId}' in parents and trashed = false",
                'fields' => 'nextPageToken, files(id, name, mimeType)',
                'pageToken' => $pageToken
            ]);

            foreach ($response->files as $file) {
                $copyMetadata = new DriveFile([
                    'name' => $file->name,
                    'parents' => [$destId]
                ]);

                $service->files->copy($file->id, $copyMetadata);
            }

            $pageToken = $response->nextPageToken;
        } while ($pageToken != null);
    }
}
