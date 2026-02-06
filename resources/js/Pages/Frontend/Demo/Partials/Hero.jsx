import React from 'react';
import { Link } from '@inertiajs/react';

const ExternalLinkIcon = () => (
    <svg
        className="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
    </svg>
);

const PlayIcon = () => (
    <svg
        className="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l.707.707a1 1 0 001.414 0l.707-.707A1 1 0 0115.414 10H17M13 16h-2a2 2 0 01-2-2V6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2z"
        />
    </svg>
);

export default function Hero({ onOpenVideo }) {
    const handleViewDemo = () => {
        window.open(
            "https://drive.google.com/drive/folders/13sF8KclZYTzlYc3v5SbcOyMsRDwV7RM_?usp=drive_link",
            "_blank"
        );
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
                        Experience your
                        <br />
                        <span className="text-[#12b5e2]">KeyTag Journal</span>
                    </h1>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
                        <button
                            onClick={handleViewDemo}
                            className="inline-flex items-center justify-center px-8 py-4 bg-[#12b5e2] text-white font-medium rounded-full hover:bg-[#0ea5d3] transition-colors"
                        >
                            <ExternalLinkIcon />
                            View Sample
                        </button>
                        <button
                            onClick={onOpenVideo}
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 font-medium rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                            <PlayIcon />
                            Watch Demo
                        </button>
                    </div>
                </div>

                {/* Hero Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                    {/* Free Plan Card */}
                    <div className="bg-gray-50 rounded-3xl p-8 relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Free Plan
                            </h3>
                            <div className="text-sm text-gray-500 mb-6 space-y-2">
                                <div className="flex items-center">
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                                    Self made KeyTag Journal template
                                </div>
                                <div className="flex items-center">
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                                    Exposure to complex sheet formulas
                                </div>
                                <div className="flex items-center">
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                                    Deeper understanding of the system
                                </div>
                            </div>
                            <Link
                                href="/free-guide"
                                className="inline-flex items-center px-4 py-2 bg-sky-100 text-[#12b5e2] text-sm font-medium rounded-lg hover:bg-sky-100 transition-colors"
                            >
                                {/* Crown Icon */}
                                <svg
                                    className="w-4 h-4 mr-2"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 0l-11 6v12.131l11 5.869 11-5.869v-12.131l-11-6zm7.91 6.646l-7.905 4.218-7.872-4.294 7.862-4.289 7.915 4.365zm-6.91 14.554v-8.6l8-4.269v8.6l-8 4.269z" />
                                </svg>
                                View Free Resources
                            </Link>
                        </div>


                    </div>

                    {/* Pro Plan Card */}
                    <div className="bg-gray-50 rounded-3xl p-8 relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Pro Plan
                            </h3>
                            <div className="text-sm text-gray-500 mb-6 space-y-2">
                                <div className="flex items-center">
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                                    Hassle Free, Ready made system, just for you
                                </div>
                                <div className="flex items-center">
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                                    24/7 Support from KeyTagJo team
                                </div>
                                <div className="flex items-center">
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                                    Make you reach your Goals faster
                                </div>
                            </div>
                            <Link
                                href="/paid-plan"
                                className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-400 text-sm font-medium rounded-lg hover:bg-yellow-200 transition-colors"
                            >
                                {/* Crown Icon */}
                                <svg
                                    className="w-4 h-4 mr-2"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 0l-11 6v12.131l11 5.869 11-5.869v-12.131l-11-6zm7.91 6.646l-7.905 4.218-7.872-4.294 7.862-4.289 7.915 4.365zm-6.91 14.554v-8.6l8-4.269v8.6l-8 4.269z" />
                                </svg>
                                Go Pro
                            </Link>
                        </div>


                    </div>
                </div>
            </div>
        </section>
    );
}
