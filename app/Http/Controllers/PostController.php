<?php
namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::latest()->paginate(10);
        return Inertia::render('Backend/Posts/Index', [
            'posts' => $posts
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validatePost($request);
        $data = $this->handleImageUpload($request, $data);

        // Assign the currently authenticated user's ID
        $data['user_id'] = auth()->id();

        $data['slug'] = $request->slug ? Str::slug($request->slug) : Str::slug($request->title);

        // 2. Set published_at if status is 'published'
        if ($data['status'] === 'published') {
            $data['published_at'] = now();
        }

        Post::create($data);

        return redirect()->back();
    }

    public function update(Request $request, Post $post)
    {
        $data = $this->validatePost($request);
        $data = $this->handleImageUpload($request, $data, $post);

        // PROFESSIONAL SEO ADDITION:
        // Update slug only if title changes or manual slug is provided
        if ($request->title !== $post->title || $request->slug) {
            $data['slug'] = Str::slug($request->slug ?? $request->title);
        }

        // Set published_at ONLY if it wasn't set before and is now being published
        if ($data['status'] === 'published' && !$post->published_at) {
            $data['published_at'] = now();
        }

        $post->update($data);

        return redirect()->back();
    }

    public function destroy(Post $post)
    {
        // Only delete file if it exists and is not a URL
        if ($post->featured_image && Storage::disk('public')->exists($post->featured_image)) {
            Storage::disk('public')->delete($post->featured_image);
        }
        $post->delete();
        return redirect()->back();
    }

    // --- Helper Methods ---

    protected function validatePost(Request $request)
    {
        return $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'category' => 'required|string|max:255',
            'status' => 'required|in:draft,published',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'featured_image' => 'nullable', // Validation handled manually
            'is_featured' => 'boolean',
            'tags' => 'nullable|array',
            'seo_title' => 'nullable|string|max:60',
            'seo_description' => 'nullable|string|max:160',
            'seo_keywords' => 'nullable|array',
            'published_at' => 'nullable|date',
        ]);
    }

    protected function handleImageUpload($request, $data, $post = null)
    {
        // If the frontend sent a file object
        if ($request->hasFile('featured_image')) {
            // Delete old file if updating
            if ($post && $post->featured_image && Storage::disk('public')->exists($post->featured_image)) {
                Storage::disk('public')->delete($post->featured_image);
            }
            $data['featured_image'] = $request->file('featured_image')->store('posts', 'public');
        }
        // If the frontend sent a string (URL)
        elseif (is_string($request->featured_image) && $request->featured_image !== null) {
            $data['featured_image'] = $request->featured_image;
        }

        return $data;
    }
}
