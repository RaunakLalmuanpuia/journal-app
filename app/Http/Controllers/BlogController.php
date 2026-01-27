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

    /**
     * Display the specified post using Route Model Binding.
     * * @param  \App\Models\Post  $post (Laravel finds this automatically via the slug)
     * @return \Inertia\Response
     */
    public function show(Post $post)
    {
        // Check if post is published; if not, 404 (unless you want admins to see drafts)
        if ($post->status !== 'published') {
            abort(404);
        }

        $userId = auth()->id();

        $post->loadCount('likedBy as total_likes');
        $post->loadExists(['likedBy as is_liked' => function($query) use ($userId) {
            $query->where('user_id', $userId);
        }]);

        // Load necessary relationships onto the existing $post instance
        $post->load([
            'author:id,name,avatar',
            'comments' => function ($query) use ($userId) {
                $query->whereNull('parent_id')
                    ->where('is_approved', true) // Safety check for approval
                    ->orderBy('created_at', 'desc')
                    ->with([
                        'user:id,name,avatar',
                        'replies' => function ($q) use ($userId) {
                            $q->with('user:id,name,avatar')
                                ->withCount('likes')
                                ->withExists(['likes as is_liked' => function ($subQ) use ($userId) {
                                    $subQ->where('user_id', $userId);
                                }]);
                        }
                    ])
                    ->withCount('likes')
                    ->withExists(['likes as is_liked' => function ($q) use ($userId) {
                        $q->where('user_id', $userId);
                    }]);
            }
        ]);

        // Track views
        $post->increment('views');

        return Inertia::render('Frontend/Blog/Show', [
            'post' => $post,
            // SEO Data object for the frontend <Head>
            'seo' => [
                'title' => $post->seo_title ?? $post->title,
                'description' => $post->seo_description ?? $post->description,
                'keywords' => $post->seo_keywords,
                'image' => $post->featured_image ? asset('storage/' . $post->featured_image) : null,
                'canonical' => route('blog.show', $post->slug),
            ],
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

    public function toggleLike(Post $post)
    {
        // Only authenticated users can reach this (protected by middleware)
        $user = auth()->user();

        // toggle() returns an array showing if it attached or detached the record
        $post->likedBy()->toggle($user->id);

        return redirect()->back();
    }
}
