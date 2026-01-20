import React from 'react';
import { Link } from '@inertiajs/react';
import { Calendar, Clock, ArrowRight } from 'lucide-react'; // Removed 'User' icon as we use img/initials
import { formatDistanceToNow } from 'date-fns';

export default function BlogCard({ post }) {
    // Calculate rough read time
    const readTime = Math.ceil((post.content?.length || 0) / 1000) || 1;

    // Helper: Get initials from name (e.g. "John Doe" -> "JD")
    const getInitials = (name) => {
        if (!name) return 'AD'; // Default for Admin
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();
    };

    // Determine the avatar URL (adjust property name if needed, e.g. post.author.profile_photo_path)
    const authorAvatar = post.author?.avatar || post.author?.profile_photo_path;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
            {/* Image */}
            {post.featured_image && (
                <div className="h-48 w-full overflow-hidden bg-gray-100 relative">
                    <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-blue-600 rounded-full shadow-sm">
                            {post.category || 'General'}
                        </span>
                    </div>
                </div>
            )}

            <div className="p-6 flex flex-col flex-1">
                {/* Meta */}
                <div className="flex items-center text-xs text-gray-500 mb-4 space-x-4">
                    <div className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1.5" />
                        {post.published_at ? formatDistanceToNow(new Date(post.published_at)) + ' ago' : 'Recently'}
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1.5" />
                        {readTime} min read
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                    <Link href={route('blog.show', post.id)}>
                        {post.title}
                    </Link>
                </h3>

                <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-1">
                    {post.description || post.subtitle || 'No description available.'}
                </p>

                {/* Footer with Avatar */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                    <div className="flex items-center">

                        {/* Avatar Circle */}
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-100 ring-2 ring-white shadow-sm">
                            {authorAvatar ? (
                                <img
                                    src={authorAvatar}
                                    alt={post.author?.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-[10px] font-bold text-gray-500 tracking-tighter">
                                    {getInitials(post.author?.name)}
                                </span>
                            )}
                        </div>

                        <span className="text-sm font-medium text-gray-700 ml-2">
                            {post.author?.name || 'Admin'}
                        </span>
                    </div>

                    <Link
                        href={route('blog.show', post.id)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center group"
                    >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
