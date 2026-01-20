import React from "react";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, Calendar, Clock, Eye, User, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import GuestLayout from "@/Layouts/GuestLayout";

// Helper to sanitize HTML for the Text Blocks
const sanitizeHtml = (html) => {
    // In a real app, use DOMPurify here.
    // Since this comes from your Admin panel (trusted source), this is acceptable.
    return { __html: html };
};

export default function BlogShow({ post, readTime }) {

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: post.title,
                    text: post.description,
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    // Parse the Body JSON if it's a string, or use directly if array
    // Laravel might cast it automatically based on model casts
    const contentBody = Array.isArray(post.body) ? post.body : [];

    return (
        <GuestLayout>
            <Head title={post.title} >
                <meta name="description" content={post.description || post.subtitle} />
            </Head>

            <div className="min-h-screen bg-white">
                <article className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">

                    {/* Back Button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-8"
                    >
                        <Link
                            href={route('blog.index')}
                            className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors font-medium"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Blog
                        </Link>
                    </motion.div>

                    {/* Header Section */}
                    <motion.header
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10 border-b border-gray-100 pb-10"
                    >
                        {post.category && (
                            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                                {post.category}
                            </span>
                        )}

                        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center">
                                <User className="w-4 h-4 mr-2 text-gray-400" />
                                <span className="font-medium text-gray-900">{post.author?.name || 'Admin'}</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                <span>
                                    {post.published_at
                                        ? formatDistanceToNow(new Date(post.published_at)) + ' ago'
                                        : 'Just now'}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                                <span>{readTime} min read</span>
                            </div>
                            <div className="flex items-center">
                                <Eye className="w-4 h-4 mr-2 text-gray-400" />
                                <span>{post.views} views</span>
                            </div>
                        </div>
                    </motion.header>

                    {/* Featured Image */}
                    {post.featured_image && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mb-12"
                        >
                            <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-lg">
                                <img
                                    src={post.featured_image}
                                    alt={post.title}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            {post.subtitle && (
                                <p className="mt-4 text-xl text-gray-600 leading-relaxed italic text-center">
                                    {post.subtitle}
                                </p>
                            )}
                        </motion.div>
                    )}

                    {/* Content Rendering Loop */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="prose prose-lg md:prose-xl max-w-none text-gray-800 prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-img:rounded-xl"
                    >
                        {/* Fallback for simple content string if Body JSON is empty */}
                        {(!contentBody || contentBody.length === 0) && post.content ? (
                            <div dangerouslySetInnerHTML={sanitizeHtml(post.content)} />
                        ) : (
                            // Render structured JSON Body
                            contentBody.map((block, index) => (
                                <div key={index} className="mb-6">
                                    {block.type === "text" && (
                                        <div dangerouslySetInnerHTML={sanitizeHtml(block.content)} />
                                    )}
                                    {/* Future extensibility: Add 'image' or 'video' blocks here */}
                                </div>
                            ))
                        )}
                    </motion.div>

                    {/* Footer / Tags / Share */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-16 pt-10 border-t border-gray-200"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {post.tags && post.tags.map((tag, i) => (
                                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            {/* Share Button */}
                            <button
                                onClick={handleShare}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <Share2 className="w-4 h-4 mr-2 text-gray-500" />
                                Share Article
                            </button>
                        </div>
                    </motion.div>
                </article>
            </div>
        </GuestLayout>
    );
}
