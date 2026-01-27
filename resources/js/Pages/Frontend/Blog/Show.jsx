import React, { useState } from "react";
import { Head, Link, useForm, usePage, router } from "@inertiajs/react";
import {
    ArrowLeft, Calendar, Clock, User, MessageCircle, Send, ThumbsUp, MessageSquare, Eye,Trash2, Heart, Share2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import GuestLayout from "@/Layouts/GuestLayout";
import DeleteConfirmationModal from '@/Components/DeleteConfirmationModal';
// --- Helper: Sanitization ---
function sanitizeParagraph(html) {
    try {
        if (!html) return "";
        html = html.replace(/<(script|style)[^>]*>[\s\S]*?<\/(script|style)>/gi,"");
        const allowed = ["p", "br", "b", "strong", "i", "em", "u", "ul", "ol", "li","span", "blockquote", "code", "pre", "h1", "h2", "h3", "h4", "h5", "h6",];
        return html.replace(/<([^>]+)>/g, (match, tag) => {
            const name = tag.split(" ")[0].replace(/\//g, "").toLowerCase();
            return allowed.includes(name) ? match : "";
        });
    } catch {
        return html;
    }
}

// --- Component: Comment Item (Now Recursive & Interactive) ---

const CommentItem = ({ comment, postId, depth = 0 }) => {
    const { auth } = usePage().props;
    const [isReplying, setIsReplying] = useState(false);
    const [showReplies, setShowReplies] = useState(true);

    // --- NEW STATES FOR MODAL ---
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const { data, setData, post: submitReply, processing, reset } = useForm({
        comment: '',
        parent_id: comment.id
    });

    const handleReplySubmit = (e) => {
        e.preventDefault();
        submitReply(route('comments.store', postId), {
            onSuccess: () => {
                setIsReplying(false);
                reset();
                setShowReplies(true);
            },
            preserveScroll: true
        });
    };

    const handleLike = () => {
        if (!auth.user) return;
        router.post(route('comments.like', comment.id), {}, { preserveScroll: true });
    };

    // 1. Just open the modal, don't delete yet
    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    // 2. The actual delete logic called by the modal
    const confirmDelete = () => {
        setIsDeleting(true);
        router.delete(route('comments.destroy', comment.id), {
            preserveScroll: true,
            onFinish: () => {
                setIsDeleting(false);
                setShowDeleteModal(false);
            }
        });
    };

    const authorName = comment.user ? comment.user.name : 'Anonymous';
    const avatarUrl = comment.user ? comment.user.avatar : null;
    const initial = authorName.charAt(0).toUpperCase();

    const isOwner = auth.user && comment.user && auth.user.id === comment.user.id;

    return (
        <div className="group relative">
            {/* Added 'relative' to group helps positioning context if needed,
                though Modal uses fixed positioning */}

            <div className="flex gap-3 items-start">
                {/* Avatar */}
                <div className="shrink-0">
                    {avatarUrl ? (
                        <img src={avatarUrl} alt={authorName} className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border border-gray-200" />
                    ) : (
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs md:text-sm border-2 border-white">
                            {initial}
                        </div>
                    )}
                </div>

                {/* Content Box */}
                <div className="flex-1 min-w-0">
                    <div className="bg-gray-50/50 p-3 rounded-2xl rounded-tl-none border border-gray-100 hover:border-gray-200 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                            <h4 className="font-bold text-gray-900 text-sm truncate">{authorName}</h4>
                            <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                                {comment.created_at ? formatDistanceToNow(new Date(comment.created_at)) : ''}
                            </span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap break-words">
                            {comment.comment}
                        </p>
                    </div>

                    {/* Actions Bar */}
                    <div className="flex items-center gap-4 mt-1 ml-2">
                        {/* Like Button */}
                        {auth.user ? (
                            <button
                                onClick={handleLike}
                                className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${comment.is_liked ? 'text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
                            >
                                <ThumbsUp className={`w-3.5 h-3.5 ${comment.is_liked ? 'fill-current' : ''}`} />
                                <span>{comment.likes_count > 0 ? comment.likes_count : 'Like'}</span>
                            </button>
                        ) : (
                            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400" title="Log in to like">
                                <ThumbsUp className="w-3.5 h-3.5" />
                                <span>{comment.likes_count > 0 ? comment.likes_count : '0'}</span>
                            </div>
                        )}

                        {/* Reply Button (Depth 0 Only) */}
                        {auth.user && depth === 0 && (
                            <button
                                onClick={() => setIsReplying(!isReplying)}
                                className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors"
                            >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>Reply</span>
                            </button>
                        )}

                        {/* Delete Button (Owner Only) - TRIGGERS MODAL */}
                        {isOwner && (
                            <button
                                onClick={handleDeleteClick}
                                className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-red-600 transition-colors ml-auto md:ml-0"
                                title="Delete comment"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                            </button>
                        )}
                    </div>

                    {/* Reply Input Form */}
                    <AnimatePresence>
                        {isReplying && (
                            <motion.form
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-3 overflow-hidden"
                                onSubmit={handleReplySubmit}
                            >
                                <div className="flex gap-2">
                                    <div className="w-0.5 bg-gray-200 mb-2 rounded-full"></div>
                                    <div className="flex-1">
                                        <textarea
                                            value={data.comment}
                                            onChange={(e) => setData('comment', e.target.value)}
                                            placeholder={`Replying to ${authorName}...`}
                                            className="w-full p-2 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 bg-white"
                                            rows={2}
                                            autoFocus
                                        />
                                        <div className="flex justify-end gap-2 mt-2">
                                            <button
                                                type="button"
                                                onClick={() => setIsReplying(false)}
                                                className="px-3 py-1 text-xs font-medium text-gray-500 hover:text-gray-700"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={processing || !data.comment.trim()}
                                                className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 disabled:opacity-50"
                                            >
                                                Post Reply
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Recursion for replies */}
            {comment.replies && comment.replies.length > 0 && (
                <div className="mt-3 pl-4 md:pl-6 relative">
                    <div className="absolute left-[20px] md:left-[28px] top-0 bottom-0 w-px bg-gray-200 -z-10"></div>
                    <div className="flex flex-col gap-4">
                        {comment.replies.map(reply => (
                            <CommentItem
                                key={reply.id}
                                comment={reply}
                                postId={postId}
                                depth={depth + 1}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* --- PLACE THE MODAL HERE --- */}
            {/* It uses 'fixed' positioning so it doesn't matter much where it sits in the DOM,
                as long as it's rendered conditionally */}
            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
                isDeleting={isDeleting}
                type={depth > 0 ? "reply" : "comment"}
            />
        </div>
    );
};

// --- Main Component ---
export default function BlogShow({ post,seo, readTime }) {


    const { auth } = usePage().props;

    // Main Comment Form (Root Level)
    const { data, setData, post: submitComment, processing, reset } = useForm({
        comment: '',
        parent_id: null
    });

    const handleToggleLike = () => {
        router.post(route('posts.like', post.id), {}, {
            preserveScroll: true,
        });
    };

    const handleAddComment = () => {
        submitComment(route('comments.store', post.id), {
            onSuccess: () => reset(),
            preserveScroll: true,
        });
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: post.title,
                    text: post.description,
                    url: window.location.href,
                });
            } catch (err) {
                console.log("Error sharing:", err);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    const contentBody = Array.isArray(post.body) ? post.body : [];
    const typographyClasses = `blog-content text-gray-800 leading-relaxed [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:text-gray-900 [&>h1]:mb-6 [&>h1]:mt-8 [&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:text-gray-900 [&>h2]:mb-5 [&>h2]:mt-7 [&>h3]:text-2xl [&>h3]:font-semibold [&>h3]:text-gray-900 [&>h3]:mb-4 [&>h3]:mt-6 [&>p]:mb-4 [&>p]:leading-relaxed [&>ul]:mb-4 [&>ul]:ml-6 [&>ul]:list-disc [&>ol]:mb-4 [&>ol]:ml-6 [&>ol]:list-decimal [&>li]:mb-2 [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:bg-blue-50 [&>blockquote]:py-4 [&>blockquote]:px-6 [&>blockquote]:my-6 [&>blockquote]:italic [&>code]:bg-gray-100 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm [&>code]:font-mono [&>pre]:bg-gray-900 [&>pre]:text-gray-100 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:my-6 [&>strong]:font-semibold [&>em]:italic [&>u]:underline`;

    return (
        <GuestLayout>
            <Head>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
                {post.tags && post.tags.length > 0 && (
                    <meta name="keywords" content={post.tags.join(', ')} />
                )}
                <link rel="canonical" href={seo.canonical} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="article" />
                <meta property="og:title" content={seo.title} />
                <meta property="og:description" content={seo.description} />
                <meta property="og:url" content={seo.canonical} />
                <meta property="og:site_name" content="Your Blog Name" />
                {seo.image && <meta property="og:image" content={seo.image} />}

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={seo.title} />
                <meta name="twitter:description" content={seo.description} />
                {seo.image && <meta name="twitter:image" content={seo.image} />}

                {/* Article Specific Metadata */}
                <meta property="article:published_time" content={post.published_at} />
                <meta property="article:author" content={post.author?.name} />
                {post.tags && post.tags.map(tag => (
                    <meta property="article:tag" content={tag} key={tag} />
                ))}
            </Head>

            <div className="min-h-screen bg-gray-50">
                <article className="relative max-w-3xl md:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-20">


                {/* Placeholder for content rendering to save space in this response */}
                    <motion.div initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} className="mb-8 md:mb-10">
                        <Link href={route("blog.index")} className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2"/> Back to Blog
                        </Link>
                    </motion.div>
                    {/* Header Section */}
                    <motion.header
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        className="mb-10 md:mb-12"
                    >
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                            <div className="flex items-center">
                                <User className="w-4 h-4 mr-1"/>
                                <span>{post.author?.name || "Admin"}</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1"/>
                                <span>
                                  {post.published_at
                                      ? formatDistanceToNow(new Date(post.published_at)) + " ago"
                                      : "Just now"}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1"/>
                                <span>{readTime} min read</span>
                            </div>
                            <div className="flex items-center">
                                <Eye className="w-4 h-4 mr-1"/>
                                <span>{post.views} views</span>
                            </div>
                        </div>

                        {post.subtitle && (
                            <p className="text-xl text-gray-700 leading-relaxed mb-4">
                                {post.subtitle}
                            </p>
                        )}

                        {post.description && (
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {post.description}
                            </p>
                        )}
                    </motion.header>

                    {/* Featured Image */}
                    {post.featured_image && (
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.15}}
                            className="mb-10"
                        >
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-sm">
                                <img
                                    src={post.featured_image}
                                    alt={post.title}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* Action Buttons (Like/Share placeholder) */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.25}}
                        className="flex flex-wrap gap-4 mb-12 pb-8 border-b border-gray-200"
                    >
                        {/* Note: Inertia requires a manual Like implementation via router.post if you want interactivity here */}
                        <button
                            onClick={handleToggleLike}
                            className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium transition-all ${
                                post.is_liked
                                    ? 'bg-green-50 border-green-200 text-green-600'
                                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            <Heart className={`w-4 h-4 mr-2 ${post.is_liked ? 'fill-current' : ''}`} />
                            {post.total_likes || 0} {post.total_likes === 1 ? 'Like' : 'Likes'}
                        </button>

                        <button
                            onClick={handleShare}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <Share2 className="w-4 h-4 mr-2"/>
                            Share
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.3}}
                        className="max-w-none"
                    >
                        {/* Fallback for simple string content */}
                        {(!contentBody || contentBody.length === 0) && post.content ? (
                            <div
                                className={typographyClasses}
                                dangerouslySetInnerHTML={{__html: sanitizeParagraph(post.content)}}
                            />
                        ) : (
                            // Structured JSON Body Rendering
                            contentBody.map((block, index) => (
                                <div key={index} className="mb-6">
                                    {block.type === "text" ? (
                                        <div
                                            className={typographyClasses}
                                            dangerouslySetInnerHTML={{
                                                __html: sanitizeParagraph(block.content),
                                            }}
                                        />
                                    ) : block.type === "image" ? (
                                        <div className="my-8">
                                            <div className="relative w-full overflow-hidden rounded-lg">
                                                <img
                                                    src={block.content}
                                                    alt={block.alt || `Image ${index + 1}`}
                                                    className="object-cover w-full h-auto"
                                                />
                                            </div>
                                            {block.caption && (
                                                <p className="text-sm text-gray-600 text-center mt-2 italic">
                                                    {block.caption}
                                                </p>
                                            )}
                                        </div>
                                    ) : null}
                                </div>
                            ))
                        )}
                    </motion.div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.35}}
                            className="mt-14 pt-10 border-t border-gray-200 mb-5"
                        >
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                                    >
                                    #{tag}
                                  </span>
                                ))}
                            </div>
                        </motion.div>
                    )}


                    {/* Render Post Content */}
                    {/*<div className="bg-white p-8 rounded-2xl shadow-sm mb-12">*/}
                    {/*    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">{post.title}</h1>*/}
                    {/*    {(!contentBody || contentBody.length === 0) && post.content ? (*/}
                    {/*        <div className={typographyClasses} dangerouslySetInnerHTML={{ __html: sanitizeParagraph(post.content) }} />*/}
                    {/*    ) : (*/}
                    {/*        contentBody.map((block, index) => (*/}
                    {/*            <div key={index} className="mb-6">*/}
                    {/*                {block.type === "text" ? <div className={typographyClasses} dangerouslySetInnerHTML={{ __html: sanitizeParagraph(block.content) }} />*/}
                    {/*                    : block.type === "image" ? <img src={block.content} className="w-full rounded-lg" /> : null}*/}
                    {/*            </div>*/}
                    {/*        ))*/}
                    {/*    )}*/}
                    {/*</div>*/}

                    {/* ========================================================= */}
                    {/* COMMENT SECTION */}
                    {/* ========================================================= */}

                    <div className="border-t border-gray-200 pt-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            <MessageCircle className="w-5 h-5 mr-2" />
                            Comments ({post.comments ? post.comments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0) : 0})
                        </h3>

                        {/* Root Comment Form */}
                        {auth.user ? (
                            <div className="mb-8 bg-gray-50 rounded-lg p-4 flex gap-4 border border-gray-100">
                                <div className="shrink-0">
                                    {auth.user.avatar ? (
                                        <img src={auth.user.avatar} alt={auth.user.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm border-2 border-white">
                                            {auth.user.name.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <textarea
                                        value={data.comment}
                                        onChange={(e) => setData('comment', e.target.value)}
                                        placeholder="Share your thoughts..."
                                        className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                        rows={3}
                                    />
                                    <div className="flex justify-end mt-3">
                                        <button
                                            onClick={handleAddComment}
                                            disabled={!data.comment.trim() || processing}
                                            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                                        >
                                            <Send className="w-4 h-4 mr-2" />
                                            {processing ? 'Posting...' : 'Post Comment'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="mb-8 bg-gray-50 rounded-lg p-6 text-center border border-gray-100">
                                <p className="text-gray-600">Please <Link href={route('login')} className="text-blue-600 hover:underline font-medium">log in</Link> to join the discussion.</p>
                            </div>
                        )}

                        {/* Recursive Comments List */}
                        <div className="space-y-4">
                            {post.comments && post.comments.map((comment) => (
                                <CommentItem
                                    key={comment.id}
                                    comment={comment}
                                    postId={post.id}
                                />
                            ))}
                            {(!post.comments || post.comments.length === 0) && (
                                <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                    No comments yet. Be the first to share your thoughts!
                                </div>
                            )}
                        </div>
                    </div>

                </article>
            </div>
        </GuestLayout>
    );
}
