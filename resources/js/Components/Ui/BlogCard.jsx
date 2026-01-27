"use client";

import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import {
    Share2,
    Clock,
    Calendar,
    User,
    ExternalLink,
    ImageOff,
    Badge
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow, format } from "date-fns";


// Helper: Sanitize and truncate HTML for preview
function sanitizeHtml(html) {
    if (!html) return "";
    const clean = html
        .replace(/<(script|style)[^>]*>[\s\S]*?<\/(script|style)>/gi, "")
        .replace(/<([^>]+)>/g, (match, tag) => {
            const tagName = tag.split(" ")[0].replace(/\//g, "").toLowerCase();
            return ["b", "strong", "i", "em", "u", "p", "br", "span"].includes(tagName) ? match : "";
        });
    const textOnly = clean.replace(/<[^>]*>/g, "");
    return textOnly.length > 160 ? `<p>${textOnly.slice(0, 160)}...</p>` : clean;
}

export default function BlogCard({ post }) {
    const [imageError, setImageError] = useState(false);
    const [authorImageError, setAuthorImageError] = useState(false);
    const [showShareDropdown, setShowShareDropdown] = useState(false);
    const [shareMessage, setShareMessage] = useState(null);

    const readTime = Math.ceil((post.content?.length || 0) / 1000) || 1;

    const handleShare = async (platform) => {
        const postUrl = window.location.origin + route('blog.show', post);
        if (platform === "copy-link") {
            await navigator.clipboard.writeText(postUrl);
            setShareMessage("Link copied to clipboard!");
            setTimeout(() => setShareMessage(null), 3000);
        } else {
            const shareUrl = platform === "facebook"
                ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`
                : `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`;
            window.open(shareUrl, "_blank", "width=600,height=400");
        }
        setShowShareDropdown(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full"
        >
            <div
                className="h-full bg-white rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden group cursor-pointer flex flex-col"
                onClick={() => (window.location.href = route("blog.show", post))}
            >
                {/* Featured Image */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                    {!imageError && post.featured_image ? (
                        <img
                            src={post.featured_image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <ImageOff className="w-10 h-10 text-gray-400 opacity-50" />
                        </div>
                    )}

                    {post.is_featured && (
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-500 text-white">
              Featured
            </span>
                    )}
                </div>

                {/* Card Header Section */}
                <div className="p-6 pb-3">
                    <div className="flex items-center justify-between mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-transparent">
                          {post.category || 'General'}
                        </span>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            <span>
                                {post.published_at
                                    ? format(new Date(post.published_at), 'MMM d, yyyy')
                                    : 'Recently'
                                }
                            </span>
                        </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-[#12b5e2] transition-colors">
                        {post.title}
                    </h3>

                    {post.subtitle && (
                        <p className="text-sm text-gray-600 line-clamp-1 font-medium mt-1">
                            {post.subtitle}
                        </p>
                    )}
                </div>

                {/* Card Content Section */}
                <div className="px-6 pt-0 pb-6 flex flex-col flex-1">
                    <div
                        className="text-gray-600 text-sm line-clamp-3 mb-4 prose prose-sm max-w-none flex-1"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.description || post.content) }}
                    />

                    {/* Author Info */}
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border border-gray-100 shadow-sm">
                            {post.author?.avatar && !authorImageError ? (
                                <img
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    className="w-full h-full object-cover"
                                    onError={() => setAuthorImageError(true)}
                                />
                            ) : (
                                <User className="w-4 h-4 text-gray-600" />
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900 leading-none">
                                {post.author?.name || 'Admin'}
                            </p>
                            <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                                <Clock className="w-3 h-3" />
                                <span>{readTime} min read</span>
                            </div>
                        </div>
                    </div>


                    {/* Tags Section */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                            {post.tags.slice(0, 3).map((tag, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-gray-100 text-gray-800"
                                >
                                    {tag}
                                </span>
                            ))}
                            {post.tags.length > 3 && (
                                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-gray-100 text-gray-800">
                                +{post.tags.length - 3}
                            </span>
                            )}
                        </div>
                    )}

                    {/* Action Buttons Row */}
                    <div className="flex items-center pt-3 justify-between border-t border-gray-50">
                        <div className="relative">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowShareDropdown(!showShareDropdown);
                                }}
                                className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-blue-500 rounded-md transition-colors"
                            >
                                <Share2 className="w-4 h-4" />
                            </button>

                            {/* Share Dropdown */}
                            <AnimatePresence>
                                {showShareDropdown && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setShowShareDropdown(false); }} />
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="absolute bottom-full left-0 mb-2 z-20 bg-white border border-gray-200 rounded-lg shadow-lg p-2 min-w-[140px]"
                                        >
                                            {['facebook', 'twitter', 'copy-link'].map((platform) => (
                                                <button
                                                    key={platform}
                                                    onClick={(e) => { e.stopPropagation(); handleShare(platform); }}
                                                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded capitalize transition-colors"
                                                >
                                                    {platform.replace('-', ' ')}
                                                </button>
                                            ))}
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link
                            href={route('blog.show', post)}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center space-x-1 bg-[#12b5e2] hover:bg-[#0ea5cd] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
                        >
                            <span>Read More</span>
                            <ExternalLink className="w-3 h-3" />
                        </Link>
                    </div>

                    {/* Toast-style Share Message */}
                    {shareMessage && (
                        <div className="mt-2 p-2 bg-green-50 text-green-700 text-xs rounded border border-green-100 text-center animate-pulse">
                            {shareMessage}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
