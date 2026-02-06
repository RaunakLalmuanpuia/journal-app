import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { router } from '@inertiajs/react';

const FEATURES = [
    "Everything in Free, plus:",
    "Precision tracking with color-coded cells",
    "Cell merging for deep work logging",
    "Automated performance color scoring",
    "Detailed weekly and monthly dashboards",
    "Priority support & early feature access",
];

export const Plan = () => {
    return (
        <section className="pt-32 pb-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
                        KeyTagJo
                        <span className="text-[#12b5e2]"> Pro</span>
                    </h1>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="max-w-5xl mx-auto"
                    >
                        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-[#12b5e2]/40 hover:border-[#12b5e2]/60 transition-all duration-300 group">
                            {/* Decorative Elements */}
                            <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-cyan-50" />
                            <div className="absolute inset-0 bg-[#12b5e2]/5 animate-pulse" />

                            <div className="relative z-10 p-8 lg:p-12">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

                                    {/* Plan Info */}
                                    <div className="text-center lg:text-left">
                                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pro</h3>
                                        <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                            For power users requiring granular tracking and visual data analysis.
                                        </p>

                                        <div className="mb-8">
                                            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                                                <span className="text-3xl lg:text-4xl font-bold text-gray-400 line-through decoration-gray-400/50">$50</span>
                                            </div>

                                            <div className="text-5xl lg:text-6xl font-black text-[#12b5e2] mb-3">
                                                Free for 2026
                                            </div>

                                            <div className="space-y-1">
                                                <p className="text-[#12b5e2] text-sm font-bold uppercase tracking-wider">Early Adopter Offer</p>
                                                <p className="text-red-500 text-xs font-semibold uppercase tracking-tighter">Limited time • Zero cost activation</p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => router.get('/dashboard')}
                                            className="w-full lg:w-auto flex items-center justify-center bg-[#12b5e2] text-white px-10 py-4 text-xl font-bold rounded-full shadow-lg hover:bg-[#0ea5d3] transition-all active:scale-95 group"
                                        >
                                            <span className="mr-2">Get Pro Now</span>
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </button>

                                        <div className="mt-6 text-xs text-gray-400 space-y-1 font-medium">
                                            <p>Full 2025 access • No card required</p>
                                            <p>Instant activation upon dashboard entry</p>
                                        </div>
                                    </div>

                                    {/* Features List */}
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 text-center lg:text-left">
                                            Features & Capabilities
                                        </h4>

                                        <div className="space-y-3">
                                            {FEATURES.map((feature, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-start space-x-3 bg-[#12b5e2]/5 rounded-xl p-3 border border-transparent hover:border-[#12b5e2]/20 transition-colors"
                                                >
                                                    <CheckCircle className="w-5 h-5 text-[#12b5e2] shrink-0 mt-0.5" />
                                                    <span className="text-gray-700 text-sm font-medium leading-snug">
                                                        {feature}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-8 bg-slate-900 rounded-2xl p-6 text-white shadow-xl">
                                            <div className="flex items-center mb-3">
                                                <div className="bg-[#12b5e2] rounded-full p-1.5 mr-3">
                                                    <CheckCircle className="w-4 h-4 text-white" />
                                                </div>
                                                <h5 className="text-md font-bold">Productivity Ready</h5>
                                            </div>
                                            <p className="text-gray-300 text-xs leading-relaxed">
                                                Stop manual setup. Pro provides a battle-tested architecture so you can focus on your output, not your tools.
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
