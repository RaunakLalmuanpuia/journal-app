import React, { useState, useEffect } from "react";
import { Head, router, Link } from '@inertiajs/react'; // Inertia helpers
import BlogCard from '@/Components/Ui/BlogCard';
import { BookOpen, Search, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import GuestLayout from '@/Layouts/GuestLayout'; // Or your Navbar component

export default function BlogIndex({ posts, filters }) {
    const [searchTerm, setSearchTerm] = useState(filters.search || "");
    const [isLoading, setIsLoading] = useState(false);

    // Debounce search to avoid hitting server on every keystroke
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm !== (filters.search || "")) {
                setIsLoading(true);
                router.get(route('blog.index'),
                    { search: searchTerm },
                    {
                        preserveState: true,
                        preserveScroll: true,
                        onFinish: () => setIsLoading(false)
                    }
                );
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    return (
        <GuestLayout>
            <Head title="Blog" />

            <div className="min-h-screen bg-gray-50">

                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200 pt-24 pb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <h1 className="text-4xl font-extrabold text-gray-900 flex items-center tracking-tight">
                                    <BookOpen className="w-10 h-10 text-blue-600 mr-4" />
                                    Our Blog
                                </h1>
                                <p className="text-lg text-gray-600 mt-3 max-w-2xl">
                                    Discover insights, tutorials, and updates from our team.
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Search Bar */}
                    <div className="mb-10 max-w-2xl">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search articles, topics..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 bg-white"
                            />
                            {isLoading && (
                                <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5 animate-spin" />
                            )}
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mb-8">
                        <p className="text-gray-600 font-medium">
                            {searchTerm ? (
                                <>Found {posts.data.length} results for "{searchTerm}"</>
                            ) : (
                                <>Latest Posts</>
                            )}
                        </p>
                    </div>

                    {/* Blog Grid */}
                    {posts.data.length > 0 ? (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
                            >
                                {posts.data.map((post, index) => (
                                    <motion.div
                                        key={post.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.05 * index }}
                                    >
                                        <BlogCard post={post} />
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Pagination */}
                            <div className="flex justify-center mt-12">
                                <div className="flex gap-2">
                                    {posts.links.map((link, key) => (
                                        link.url ? (
                                            <Link
                                                key={key}
                                                href={link.url}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                    link.active
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                                }`}
                                            />
                                        ) : (
                                            <span
                                                key={key}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 bg-gray-50 border border-gray-200 cursor-not-allowed"
                                            />
                                        )
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
                            <p className="text-gray-500">
                                {searchTerm
                                    ? "Try adjusting your search terms."
                                    : "Check back soon for new articles!"}
                            </p>
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="mt-6 text-blue-600 font-medium hover:underline"
                                >
                                    Clear Search
                                </button>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </GuestLayout>
    );
}
