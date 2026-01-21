<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        // 1. Add ->with('author') here
        $query = Post::query()
            ->with(['author:id,name,avatar'])
            ->where('status', 'published')
            ->orderBy('published_at', 'desc');

        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('title', 'like', "%{$request->search}%")
                    ->orWhere('description', 'like', "%{$request->search}%")
                    ->orWhere('tags', 'like', "%{$request->search}%");
            });
        }

        $posts = $query->paginate(9)->withQueryString();

        return Inertia::render('Frontend/Blog/Index', [
            'posts' => $posts,
            'filters' => $request->only(['search']),
        ]);
    }

    public function show($id)
    {

        $userId = auth()->id();
        // 2. Add ->with('author') here too (for the single post page)
        $post = Post::query()
            ->with([ 'author:id,name,avatar'])
            ->with(['comments' => function ($query) use ($userId) {
                $query->whereNull('parent_id')
                    ->orderBy('created_at', 'desc')
                    ->with([
                        'user:id,name,avatar',
                        // Load the replies recursively
                        'replies' => function($q) use ($userId) {
                            $q->with('user:id,name,avatar')
                                ->withCount('likes')
                                ->withExists(['likes as is_liked' => function($subQ) use ($userId) {
                                    $subQ->where('user_id', $userId);
                                }]);
                        }
                    ])
                    ->withCount('likes')
                    ->withExists(['likes as is_liked' => function($q) use ($userId) {
                        $q->where('user_id', $userId);
                    }]);
            }])
            ->where('id', $id)
            ->where('status', 'published')
            ->firstOrFail();

//        dd($post);

        $post->increment('views');

        return Inertia::render('Frontend/Blog/Show', [
            'post' => $post,
            'readTime' => ceil(str_word_count(strip_tags($post->content)) / 200),
        ]);
    }

    public function getLatestPostsJson()
    {
        // 3. Add ->with('author') here for your API/Widget
        $posts = Post::query()
            ->with(['author:id,name,avatar'])
            ->where('status', 'published')
            ->latest()
            ->take(request('limit', 5))
            ->get();

        // Transform image path logic
        $posts->transform(function ($post) {
            if ($post->featured_image && !str_starts_with($post->featured_image, 'http')) {
                $post->featured_image = '/storage/' . $post->featured_image;
            }
            return $post;
        });

        return response()->json([
            'success' => true,
            'data' => $posts
        ]);
    }
}
