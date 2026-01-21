<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(Request $request, Post $post)
    {
        $request->validate([
            'comment' => 'required|string|max:1000',
        ]);

        $post->comments()->create([
            'user_id' => $request->user()->id, // Link to the authenticated user
            'comment' => $request->comment,
            // We don't need to save name/email anymore, we will fetch them from the user relation
        ]);

        return back()->with('success', 'Comment posted successfully!');
    }
}
