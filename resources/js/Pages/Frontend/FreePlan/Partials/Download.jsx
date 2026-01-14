import React from 'react';
import { motion } from 'framer-motion';

// Icons
const CheckCircleIcon = () => (
    <svg className="w-6 h-6 text-[#12b5e2] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const DownloadIcon = () => (
    <svg className="w-6 h-6 mr-3 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
);
const BookOpenIcon = () => (
    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
);
const CalculatorIcon = () => (
    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
);
const LightbulbIcon = () => (
    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
);

export default function Download() {
    // Hardcoded Free Plan Data for Design consistency
    const freePlan = {
        title: "Free Guide",
        description: "For people who wants hands on experience",
        price: "$0",
        period: "Forever",
        buttonText: "Download Free Guide",
        features: [
            "Create your own KeyTag Journal using guide",
            "Get deeper understanding of the system",
            "Be a part of KTJ discord community (invite only)",
        ]
    };

    return (
        <section id="download-section" className="py-24 bg-gradient-to-br from-[#12b5e2]/5 via-white to-blue-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Get Your
                        <span className="text-[#12b5e2]"> Free Guide</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Start building your own KeyTag Journal with our comprehensive
                        tutorial guide - completely free, forever.
                    </p>
                </motion.div>

                {/* Single Free Plan Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-[#b6d7a8]/20 hover:border-[#b6d7a8]/40 transition-all duration-300 hover:shadow-3xl hover:-translate-y-2">
                        {/* Decorative gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#b6d7a8]/5 to-blue-50 opacity-50"></div>

                        {/* Animated glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#b6d7a8]/10 via-transparent to-[#b6d7a8]/10 animate-pulse"></div>

                        <div className="relative z-10 p-12 text-center">
                            {/* Plan Header */}
                            <div className="mb-8">
                                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    {freePlan.title}
                                </h3>
                                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                    {freePlan.description}
                                </p>

                                {/* Price Display */}
                                <div className="mb-8">
                                    <div className="text-6xl font-bold text-[#b6d7a8] mb-2 animate-pulse">
                                        {freePlan.price}
                                    </div>
                                    <div className="text-lg text-gray-500 font-medium">
                                        {freePlan.period}
                                    </div>
                                    <div className="mt-2 inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                                        No hidden costs • Always free
                                    </div>
                                </div>
                            </div>

                            {/* Features List */}
                            <div className="mb-10">
                                <h4 className="text-xl font-semibold text-gray-900 mb-6">
                                    What's Included:
                                </h4>
                                <div className="grid grid-cols-1 gap-4 text-left max-w-lg mx-auto">
                                    {freePlan.features.map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: 0.1 * index }}
                                            className="flex items-start space-x-3 bg-gray-50 rounded-lg p-3 hover:bg-blue-50 transition-colors"
                                        >
                                            <CheckCircleIcon />
                                            <span className="text-gray-700 leading-relaxed font-medium">
                                                {feature}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA Button */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <button
                                    onClick={() => alert("Redirecting to download...")}
                                    className=" inline-flex items-center justify-center bg-gradient-to-r from-[#12b5e2] to-blue-600 text-white px-12 py-4 text-xl font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:from-[#0ea5d3] hover:to-blue-700 relative overflow-hidden group"
                                >
                                    {/* Button animation overlay */}
                                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                    <DownloadIcon />
                                    <span className="relative z-10">
                                        {freePlan.buttonText}
                                    </span>
                                </button>
                            </motion.div>

                            {/* Additional Info */}
                            <div className="mt-8 text-sm text-gray-500">
                                <p>No credit card required • Instant access • Lifetime access</p>
                                <p className="mt-2 text-xs">Your privacy is protected • No spam ever</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Why Choose Free Guide Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-20"
                >
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            Why Choose Our Free Guide?
                        </h3>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Perfect for DIY enthusiasts who want to learn and build their
                            own system
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#12b5e2] to-blue-600 rounded-2xl flex items-center justify-center">
                                <BookOpenIcon />
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-3">
                                Comprehensive Tutorial
                            </h4>
                            <p className="text-gray-600">
                                Step-by-step instructions to build your own KeyTag Journal
                                from scratch
                            </p>
                        </div>

                        <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                                <CalculatorIcon />
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-3">
                                Learn Advanced Formulas
                            </h4>
                            <p className="text-gray-600">
                                Master complex Google Sheets formulas and automation
                                techniques
                            </p>
                        </div>

                        <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                                <LightbulbIcon />
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-3">
                                Deep Understanding
                            </h4>
                            <p className="text-gray-600">
                                Gain complete control and understanding of your productivity
                                system
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
