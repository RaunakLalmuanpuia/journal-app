import React from "react";
import {Head, Link} from "@inertiajs/react";
import {
    ArrowLeft,
    Calendar,
    Clock,
    Eye,
    User,
    Share2,
    Heart
} from "lucide-react";
import {motion} from "framer-motion";
import {formatDistanceToNow} from "date-fns";
import GuestLayout from "@/Layouts/GuestLayout";

// 1. Robust Sanitization Logic from Source
function sanitizeParagraph(html) {
    try {
        if (!html) return "";
        // Remove scripts and styles
        html = html.replace(
            /<(script|style)[^>]*>[\s\S]*?<\/(script|style)>/gi,
            ""
        );
        // Allowed tags
        const allowed = [
            "p", "br", "b", "strong", "i", "em", "u", "ul", "ol", "li",
            "span", "blockquote", "code", "pre", "h1", "h2", "h3", "h4", "h5", "h6",
        ];
        // Strip unknown tags
        return html.replace(/<([^>]+)>/g, (match, tag) => {
            const name = tag.split(" ")[0].replace(/\//g, "").toLowerCase();
            return allowed.includes(name) ? match : "";
        });
    } catch {
        return html;
    }
}

export default function BlogShow({post, readTime}) {
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

    // 2. The specific typography classes from the source code
    const typographyClasses = `
    blog-content text-gray-800 leading-relaxed
    [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:text-gray-900 [&>h1]:mb-6 [&>h1]:mt-8
    [&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:text-gray-900 [&>h2]:mb-5 [&>h2]:mt-7
    [&>h3]:text-2xl [&>h3]:font-semibold [&>h3]:text-gray-900 [&>h3]:mb-4 [&>h3]:mt-6
    [&>h4]:text-xl [&>h4]:font-medium [&>h4]:text-gray-900 [&>h4]:mb-3 [&>h4]:mt-5
    [&>h5]:text-lg [&>h5]:font-medium [&>h5]:text-gray-900 [&>h5]:mb-3 [&>h5]:mt-4
    [&>h6]:text-base [&>h6]:font-medium [&>h6]:text-gray-900 [&>h6]:mb-2 [&>h6]:mt-3
    [&>p]:mb-4 [&>p]:leading-relaxed
    [&>ul]:mb-4 [&>ul]:ml-6 [&>ul]:list-disc
    [&>ol]:mb-4 [&>ol]:ml-6 [&>ol]:list-decimal
    [&>li]:mb-2
    [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:bg-blue-50
    [&>blockquote]:py-4 [&>blockquote]:px-6 [&>blockquote]:my-6 [&>blockquote]:italic
    [&>code]:bg-gray-100 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm [&>code]:font-mono
    [&>pre]:bg-gray-900 [&>pre]:text-gray-100 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:my-6
    [&>strong]:font-semibold [&>em]:italic [&>u]:underline
  `;

    return (
        <GuestLayout>
            <Head title={post.title}>
                <meta name="description" content={post.description || post.subtitle}/>
            </Head>

            <div className="min-h-screen bg-gray-50">
                <article className="relative max-w-3xl md:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-20">

                    {/* Back Button */}
                    <motion.div
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                        className="mb-8 md:mb-10"
                    >
                        <Link
                            href={route("blog.index")}
                            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2"/>
                            Back to Blog
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
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            <Heart className="w-4 h-4 mr-2"/>
                            {post.likes || 0} Likes
                        </button>

                        <button
                            onClick={handleShare}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <Share2 className="w-4 h-4 mr-2"/>
                            Share
                        </button>
                    </motion.div>

                    {/* Content Rendering Loop */}
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
                            className="mt-14 pt-10 border-t border-gray-200"
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
                </article>
            </div>
        </GuestLayout>
    );
}
