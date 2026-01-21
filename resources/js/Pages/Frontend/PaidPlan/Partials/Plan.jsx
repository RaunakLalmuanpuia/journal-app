import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { router } from '@inertiajs/react';
export const Plan = () => {
    // Animation definition
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
    };

    const features = [
        "Everything in Free, plus:",
        "Track every minute with flexible, color-coded cells",
        "Merge cells for uninterrupted activity logging",
        "Automatic color scoring for quick performance feedback",
        "Advanced dashboards with richer weekly, monthly, and yearly insights",
        "Priority support and regular updates",
    ];

    return (
        <section className="pt-32 pb-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Page Title Section */}
                <motion.div className="text-center mb-16" {...fadeInUp}>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
                        KeyTagJo
                        <span className="text-[#12b5e2]"> Pro Plan</span>
                    </h1>
                </motion.div>

                {/* Pricing Card Section */}
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-5xl mx-auto"
                    >
                        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-[#12b5e2] border-opacity-40 hover:border-opacity-60 transition-all duration-300 hover:shadow-3xl hover:-translate-y-1">
                            {/* Decorative gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-cyan-50"></div>

                            {/* Animated glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#12b5e2] via-transparent to-[#12b5e2] opacity-10 animate-pulse"></div>

                            <div className="relative z-10 p-8 lg:p-12">
                                {/* Wide Layout - Grid for larger screens */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                                    {/* Left Column - Plan Info & Pricing */}
                                    <div className="text-center lg:text-left">
                                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                            Pro
                                        </h3>
                                        <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                            For power users who want 24/7 tracking and deeper insights.
                                        </p>

                                        {/* Price Display */}
                                        <div className="mb-8">
                                            <div>
                                                {/* Original price with strikethrough */}
                                                <div className="flex items-center justify-center lg:justify-start gap-2 mb-3 flex-wrap">
                                                    <span className="text-3xl lg:text-4xl font-bold text-gray-400 line-through">
                                                        $50
                                                    </span>
                                                </div>

                                                {/* Free for 2025 - Always shown prominently */}
                                                <div className="text-6xl lg:text-6xl font-bold text-[#12b5e2] mb-3 animate-pulse">
                                                    Free for 2025
                                                </div>

                                                {/* Special offer message */}
                                                <div className="text-center lg:text-left mb-4">
                                                    <span className="text-[#12b5e2] text-sm font-bold">
                                                        Special Introductory Offer
                                                    </span>
                                                </div>

                                                {/* Limited time badge */}
                                                <div className="text-center lg:text-left">
                                                    <span className="text-red-600 text-xs font-semibold">
                                                        Limited Time Only - Claim Your Free Access Now!
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* CTA Button */}
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="mb-6"
                                        >
                                            <button
                                                onClick={() => router.get('/dashboard')}
                                                className="w-full lg:w-auto flex items-center justify-center bg-gradient-to-r from-[#12b5e2] to-[#0ea5d3] text-white px-12 py-4 text-xl font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:from-[#0ea5d3] hover:to-[#0aa0c7] relative overflow-hidden group">
                                                {/* Button animation overlay */}
                                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                                <ArrowRight className="w-6 h-6 mr-3 relative z-10" />
                                                <span className="relative z-10">Start Free Trial</span>
                                            </button>
                                        </motion.div>

                                        {/* Additional Info */}
                                        <div className="text-sm text-gray-500">
                                            <p>Free activation for 2025 • No credit card required</p>
                                            <p className="mt-2 text-xs">
                                                Cancel anytime • Full refund guarantee
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right Column - Features List */}
                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-900 mb-6 text-center lg:text-left">
                                            What&apos;s Included:
                                        </h4>
                                        <div className="space-y-4">
                                            {features.map((feature, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{
                                                        duration: 0.5,
                                                        delay: 0.1 * index,
                                                    }}
                                                    className="flex items-start space-x-3 bg-[#12b5e2] bg-opacity-5 rounded-lg p-3 hover:bg-[#12b5e2] hover:bg-opacity-10 transition-colors"
                                                >
                                                    <CheckCircle className="w-6 h-6 text-[#12b5e2] flex-shrink-0 mt-0.5" />
                                                    <span className="text-gray-700 leading-relaxed font-medium">
                                                        {feature}
                                                    </span>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Value Proposition */}
                                        <div className="mt-8 bg-gradient-to-r from-sky-100 to-cyan-100 rounded-2xl p-6">
                                            <div className="flex items-center mb-3">
                                                <div className="bg-[#12b5e2] text-white rounded-full p-2 mr-3">
                                                    <CheckCircle className="w-5 h-5" />
                                                </div>
                                                <h5 className="text-lg font-bold text-gray-900">
                                                    Why Choose Pro?
                                                </h5>
                                            </div>
                                            <p className="text-gray-700 text-sm leading-relaxed">
                                                Skip the learning curve and get a ready-made system that&apos;s
                                                been perfected by thousands of users. Save weeks of setup time
                                                and start tracking your productivity immediately.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
