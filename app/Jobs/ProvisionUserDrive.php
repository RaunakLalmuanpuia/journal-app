<?php

namespace App\Jobs;

use App\Models\User;
use App\Models\Plan;
use App\Services\SheetCopyService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProvisionUserDrive implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $user;
    protected $plan;

    /**
     * Increase the timeout for this specific job to 5 minutes (300 seconds)
     * because Google API operations are slow.
     */
    public $timeout = 300;

    public function __construct(User $user, Plan $plan)
    {
        $this->user = $user;
        $this->plan = $plan;
    }

    public function handle()
    {
        Log::info("Starting Drive Provisioning for User: {$this->user->id}");

        try {
            SheetCopyService::provisionFolderForUser($this->user, $this->plan);
            // Optional: Send an email to the user saying drive synced.
            Log::info("Drive Provisioning Completed for User: {$this->user->id}");
        } catch (\Exception $e) {
            Log::error("Drive Provisioning Failed for User {$this->user->id}: " . $e->getMessage());
            // Optional: Send an email to the user saying setup failed
            // or release the job back to the queue to retry later
            $this->fail($e);
        }
    }
}
