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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->text('description')->nullable();


            $table->longText('content'); // WYSIWYG HTML
            $table->string('featured_image')->nullable();

            $table->string('status')->default('draft'); // draft, published
            $table->boolean('is_featured')->default(false);


            $table->string('category')->nullable();
            $table->json('tags')->nullable();


            // SEO
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->json('seo_keywords')->nullable();


            $table->unsignedBigInteger('views')->default(0);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
