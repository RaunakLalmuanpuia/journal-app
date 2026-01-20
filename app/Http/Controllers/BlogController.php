<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
class BlogController extends Controller
{
    //
    public function index(Request $request)
    {
        $query = Post::query()
            ->where('status', 'published')
            ->orderBy('published_at', 'desc');

        // Search functionality
        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('title', 'like', "%{$request->search}%")
                    ->orWhere('description', 'like', "%{$request->search}%")
                    ->orWhere('tags', 'like', "%{$request->search}%");
            });
        }

        // Pagination (9 posts per page)
        $posts = $query->paginate(9)->withQueryString();

        return Inertia::render('Frontend/Blog/Index', [
            'posts' => $posts,
            'filters' => $request->only(['search']),
        ]);
    }

    public function show($id)
    {
        $post = Post::query()
            ->where('id', $id)
            ->where('status', 'published')
            ->firstOrFail();

        // Increment Views (Atomic operation)
        $post->increment('views');

        return Inertia::render('Frontend/Blog/Show', [
            'post' => $post,
            // Calculate read time roughly on server side or pass raw body
            'readTime' => ceil(str_word_count(strip_tags($post->content)) / 200),
        ]);
    }

}
