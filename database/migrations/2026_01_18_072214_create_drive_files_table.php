<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('drive_files', function (Blueprint $table) {
            $table->id();
            // Links this file to the main Folder record in drive_resources
            $table->foreignId('drive_resource_id')->constrained('drive_resources')->cascadeOnDelete();
            $table->string('google_file_id');
            $table->string('name');
            $table->string('type'); // e.g., 'dashboard', 'sheet'
            $table->string('link');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('drive_files');
    }
};
