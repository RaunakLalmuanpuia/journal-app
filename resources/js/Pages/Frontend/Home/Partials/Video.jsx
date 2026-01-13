import React from 'react';
import { motion } from 'framer-motion';

export default function Video() {
    return (
        <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 via-white to-[#12b5e2]/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        See <span className="text-cyan-500">KeyTagJo</span> in Action
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
                        Watch how our productivity tracking system transforms your daily
                        routine into actionable insights.
                    </p>
                </motion.div>

                {/* Video Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full mb-12"
                >
                    <div className="relative w-full max-w-6xl mx-auto bg-gradient-to-r from-sky-400 via-sky-400 to-cyan-500 shadow-2xl overflow-hidden rounded-2xl">

                        {/* YouTube Video Embed */}
                        <div className="aspect-video w-full bg-black relative">
                            <iframe
                                src="https://www.youtube.com/embed/1tjljmJ79FU"
                                title="KeyTagJo productivity tracking system demo video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                loading="lazy"
                                className="absolute inset-0 w-full h-full rounded-lg"
                            />
                        </div>

                        {/* Subtle Overlay Gradients for depth/blending */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none rounded-2xl"></div>
                        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-gray-50/10 to-transparent pointer-events-none rounded-l-2xl"></div>
                        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#12b5e2]/10 to-transparent pointer-events-none rounded-r-2xl"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
