<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{

    public function store(Request $request, Post $post)
    {
        $request->validate([
            'comment' => 'required|string|max:1000',
            'parent_id' => 'nullable|exists:comments,id' // Validate parent
        ]);

        $post->comments()->create([
            'user_id' => $request->user()->id,
            'comment' => $request->comment,
            'parent_id' => $request->parent_id // Handle the reply link
        ]);

        return back();
    }

    public function toggleLike(Comment $comment)
    {
        $comment->likes()->toggle(auth()->id());
        return back();
    }

    public function destroy(Comment $comment)
    {
        // Security check: Only allow if the logged-in user owns the comment
        if (auth()->id() !== $comment->user_id) {
            abort(403, 'Unauthorized action.');
        }

        // Delete the comment
        // Note: If you have foreign keys set up correctly in your migration
        // (onDelete('cascade')), this will also automatically delete any replies
        // attached to this comment.
        $comment->delete();

        return back();
    }

}
