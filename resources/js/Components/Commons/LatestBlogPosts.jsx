import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import axios from "axios";
import { ArrowRight, BookOpen, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import BlogCard from "@/Components/Ui/BlogCard"; // Import your custom component

// Helper for conditional classes
function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function LatestBlogPosts({
                                            title = "Latest from Our Blog",
                                            subtitle = "Discover insights, tutorials, and updates.",
                                            limit = 3,
                                            className = "",
                                            showBackground = true,
                                            showViewAllBtn = true,
                                            viewAllLink = "/blog",
                                        }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Fetch data from your internal API
                const response = await axios.get(`/internal/latest-posts?limit=${limit}`);

                if (response.data.success) {
                    setPosts(response.data.data);
                }
            } catch (error) {
                console.error("Failed to fetch blog posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [limit]);

    // Loading State
    if (loading) {
        return (
            <section className={cn("py-20", showBackground ? "bg-gray-50" : "bg-white", className)}>
                <div className="flex items-center justify-center space-x-2 text-gray-500">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Loading latest posts...</span>
                </div>
            </section>
        );
    }

    // Hide section if no posts found
    if (posts.length === 0) return null;

    return (
        <section
            className={cn(
                "py-16 md:py-20",
                showBackground ? "bg-gray-50" : "bg-transparent",
                className
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                {title && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {title}
                        </h2>
                        {subtitle && (
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                {subtitle}
                            </p>
                        )}
                    </motion.div>
                )}

                {/* Grid - Using your BlogCard Component */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 * index }}
                            className="flex h-full" // Ensure card stretches full height
                        >
                            <BlogCard post={post} />
                        </motion.div>
                    ))}
                </div>

                {/* Footer Button */}
                {showViewAllBtn && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-center"
                    >
                        <Link
                            href={viewAllLink}
                            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-[#12b5e2] rounded-md hover:bg-[#0fa4cc] transition-colors group"
                        >
                            <span>View All Posts</span>
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
