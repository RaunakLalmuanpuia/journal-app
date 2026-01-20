import React, { useState } from "react";
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from "@inertiajs/react";
import Hero from "./Partials/Hero";
import Features from "./Partials/Features";
import Video from "./Partials/Video";
import LatestBlogPosts from '@/Components/Commons/LatestBlogPosts';
export default function Demo() {
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    return (
        <GuestLayout>
            <Head title="Product Demo" />

            <div className="min-h-screen bg-gray-50">

                {/* Hero Section - Passing the open function */}
                <Hero onOpenVideo={() => setIsVideoModalOpen(true)} />

                <Features />

                <Video/>

                {/* Video Modal - Integrated directly to match reference design */}
                {isVideoModalOpen && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            {/* Backdrop */}
                            <div
                                className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
                                onClick={() => setIsVideoModalOpen(false)}
                            />

                            {/* Modal Content */}
                            <div className="relative w-full max-w-4xl mx-auto">
                                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                                    {/* Modal Header */}
                                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900">
                                                KeyTagJo Demo Video
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Watch how KeyTagJo transforms your productivity
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setIsVideoModalOpen(false)}
                                            className="text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Video Container */}
                                    <div className="relative">
                                        <div className="aspect-video">
                                            <iframe
                                                src="https://www.youtube.com/embed/1tjljmJ79FU?autoplay=1&rel=0"
                                                title="KeyTagJo Demo - Master Your Productivity"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen
                                                className="absolute inset-0 w-full h-full"
                                            />
                                        </div>
                                    </div>

                                    {/* Modal Footer */}
                                    <div className="p-6 bg-gray-50 border-t border-gray-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                <svg
                                                    className="w-4 h-4 text-red-500"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                                </svg>
                                                <span>Watch on YouTube</span>
                                            </div>
                                            <button
                                                onClick={() => setIsVideoModalOpen(false)}
                                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <LatestBlogPosts/>
        </GuestLayout>
    );
}
