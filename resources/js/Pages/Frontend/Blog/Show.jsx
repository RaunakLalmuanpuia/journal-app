import React from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import {
    ArrowLeft,
    Calendar,
    Clock,
    User,
    Share2,
    Heart,
    MessageCircle,
    Send,
    ThumbsUp,   // Added for Comment Item design
    MessageSquare // Added for Comment Item design
} from "lucide-react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import GuestLayout from "@/Layouts/GuestLayout";

// --- 1. Helper: Sanitization ---
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

// --- 2. Sub-Component: Comment Item ---
// This fills the role of the <CommentItem /> from your reference
const CommentItem = ({ comment }) => {
    // Fallback logic: Try to get user relation, then raw name, then 'Anonymous'
    const authorName = comment.user ? comment.user.name : (comment.name || 'Anonymous');
    const initial = authorName.charAt(0).toUpperCase();
    // 1. Get the avatar URL (Adjust 'avatar' to match your database column)
    const avatarUrl = comment.user ? comment.user.avatar : null;
    return (
        <div className="flex gap-4 p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            {/* Avatar */}
            {/* 2. Modified Avatar Section */}
            <div className="shrink-0">
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt={authorName}
                        className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm"
                    />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm border-2 border-white shadow-sm">
                        {initial}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-gray-900 text-sm">{authorName}</h4>
                    <span className="text-xs text-gray-500">
                        {comment.created_at ? formatDistanceToNow(new Date(comment.created_at)) + ' ago' : 'Just now'}
                    </span>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    {comment.comment}
                </p>

                {/* Interaction Buttons (Visual placeholders based on typical design) */}
                <div className="flex items-center gap-4 text-gray-500 text-xs">
                    <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                        <ThumbsUp className="w-3 h-3" />
                        <span>Like</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                        <MessageSquare className="w-3 h-3" />
                        <span>Reply</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- 3. Main Component ---
export default function BlogShow({ post, readTime }) {
    const { auth } = usePage().props;

    // Inertia Form Setup
    const { data, setData, post: submitComment, processing, reset } = useForm({
        comment: '',
    });

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
                    title: post.title, text: post.description, url: window.location.href,
                });
            } catch (err) { console.log("Error sharing:", err); }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    const contentBody = Array.isArray(post.body) ? post.body : [];

    // Typography classes
    const typographyClasses = `blog-content text-gray-800 leading-relaxed [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:text-gray-900 [&>h1]:mb-6 [&>h1]:mt-8 [&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:text-gray-900 [&>h2]:mb-5 [&>h2]:mt-7 [&>h3]:text-2xl [&>h3]:font-semibold [&>h3]:text-gray-900 [&>h3]:mb-4 [&>h3]:mt-6 [&>p]:mb-4 [&>p]:leading-relaxed [&>ul]:mb-4 [&>ul]:ml-6 [&>ul]:list-disc [&>ol]:mb-4 [&>ol]:ml-6 [&>ol]:list-decimal [&>li]:mb-2 [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:bg-blue-50 [&>blockquote]:py-4 [&>blockquote]:px-6 [&>blockquote]:my-6 [&>blockquote]:italic [&>code]:bg-gray-100 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm [&>code]:font-mono [&>pre]:bg-gray-900 [&>pre]:text-gray-100 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:my-6 [&>strong]:font-semibold [&>em]:italic [&>u]:underline`;

    return (
        <GuestLayout>
            <Head title={post.title}>
                <meta name="description" content={post.description || post.subtitle} />
            </Head>

            <div className="min-h-screen bg-gray-50">
                <article className="relative max-w-3xl md:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-20">

                    {/* Back Button */}
                    <motion.div initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} className="mb-8 md:mb-10">
                        <Link href={route("blog.index")} className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2"/> Back to Blog
                        </Link>
                    </motion.div>

                    {/* Header */}
                    <motion.header initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className="mb-10 md:mb-12">
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">{post.title}</h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                            <div className="flex items-center"><User className="w-4 h-4 mr-1"/><span>{post.author?.name || "Admin"}</span></div>
                            <div className="flex items-center"><Calendar className="w-4 h-4 mr-1"/><span>{post.published_at ? formatDistanceToNow(new Date(post.published_at)) + " ago" : "Just now"}</span></div>
                            <div className="flex items-center"><Clock className="w-4 h-4 mr-1"/><span>{readTime} min read</span></div>
                        </div>
                    </motion.header>

                    {/* Featured Image */}
                    {post.featured_image && (
                        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.15}} className="mb-10">
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-sm">
                                <img src={post.featured_image} alt={post.title} className="object-cover w-full h-full" />
                            </div>
                        </motion.div>
                    )}

                    {/* Post Body */}
                    <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.3}} className="max-w-none mb-16">
                        {(!contentBody || contentBody.length === 0) && post.content ? (
                            <div className={typographyClasses} dangerouslySetInnerHTML={{ __html: sanitizeParagraph(post.content) }} />
                        ) : (
                            contentBody.map((block, index) => (
                                <div key={index} className="mb-6">
                                    {block.type === "text" ? (
                                        <div className={typographyClasses} dangerouslySetInnerHTML={{ __html: sanitizeParagraph(block.content) }} />
                                    ) : block.type === "image" ? (
                                        <div className="my-8">
                                            <div className="relative w-full overflow-hidden rounded-lg">
                                                <img src={block.content} alt={block.alt || `Image ${index + 1}`} className="object-cover w-full h-auto" />
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            ))
                        )}

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="mt-8 pt-4">
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag, index) => (
                                        <span key={index} className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">#{tag}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* ========================================================= */}
                    {/* NEW COMMENT SECTION DESIGN */}
                    {/* ========================================================= */}

                    <div className="border-t border-gray-200 pt-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            <MessageCircle className="w-5 h-5 mr-2" />
                            Comments ({post.comments ? post.comments.length : 0})
                        </h3>

                        {/* Add Comment Area */}
                        {/* Add Comment Area */}
                        {auth.user ? (
                            <div className="mb-8 bg-gray-50 rounded-lg p-4 flex gap-4">

                                {/* 1. CURRENT USER AVATAR */}
                                <div className="shrink-0">
                                    {auth.user.avatar ? (
                                        <img
                                            src={auth.user.avatar}
                                            alt={auth.user.name}
                                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm border-2 border-white">
                                            {auth.user.name.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>

                                {/* 2. TEXT AREA & BUTTON WRAPPER */}
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
                                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <Send className="w-4 h-4 mr-2" />
                                            {processing ? 'Posting...' : 'Post Comment'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="mb-8 bg-gray-50 rounded-lg p-6 text-center border border-gray-100">
                                <p className="text-gray-600">
                                    Please <Link href={route('login')} className="text-blue-600 hover:underline font-medium">log in</Link> to join the discussion.
                                </p>
                            </div>
                        )}

                        {/* Comments List */}
                        <div className="space-y-4">
                            {post.comments && post.comments.map((comment) => (
                                <CommentItem
                                    key={comment.id}
                                    comment={comment}
                                />
                            ))}

                            {(!post.comments || post.comments.length === 0) && (
                                <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                    No comments yet. Be the first to share your thoughts!
                                </div>
                            )}
                        </div>
                    </div>
                    {/* ========================================================= */}
                    {/* END NEW COMMENT SECTION DESIGN */}
                    {/* ========================================================= */}

                </article>
            </div>
        </GuestLayout>
    );
}
