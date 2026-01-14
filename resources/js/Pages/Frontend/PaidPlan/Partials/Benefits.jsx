import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export const Benefits = () => {
    // Animation definitions
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <section className="pt-10 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Section Title */}
                <motion.div className="text-center mb-16" {...fadeInUp}>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
                        Benefits of
                        <span className="text-[#12b5e2]"> Pro Plan</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
                        Experience the full power of KeyTag Journal with our featured Pro plan
                    </p>
                </motion.div>

                {/* Benefits Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                    {/* Benefit 1: Time Tracking */}
                    <motion.div variants={fadeInUp}>
                        <div className="h-full bg-white text-center p-6 border-2 border-sky-100 rounded-2xl hover:border-sky-300 transition-all hover:shadow-lg">
                            <div className="pb-4">
                                <div className="w-20 h-20 mx-auto mb-4 bg-[#12b5e2] rounded-2xl flex items-center justify-center">
                                    <svg
                                        className="w-10 h-10 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    Hassle Free, Ready made system, just for you
                                </h3>
                            </div>
                            <div>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    While you can create your own KeyTag Journal, using paid, will fast
                                    track your experience
                                </p>
                                <div className="bg-sky-50 rounded-lg p-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Today&apos;s Productivity</span>
                                        <span className="font-semibold text-[#12b5e2]">8.5 hrs</span>
                                    </div>
                                    <div className="w-full bg-sky-200 rounded-full h-2 mt-2">
                                        <div
                                            className="bg-[#12b5e2] h-2 rounded-full"
                                            style={{ width: "75%" }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Benefit 2: Analytics & Insights */}
                    <motion.div variants={fadeInUp}>
                        <div className="h-full bg-white text-center p-6 border-2 border-amber-100 rounded-2xl hover:border-amber-300 transition-all hover:shadow-lg">
                            <div className="pb-4">
                                <div className="w-20 h-20 mx-auto mb-4 bg-[#ff9900] rounded-2xl flex items-center justify-center">
                                    <svg
                                        className="w-10 h-10 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    24/7 Support from KeyTagJo team
                                </h3>
                            </div>
                            <div>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    Reach out to us for guidance, motivation and understanding
                                    yourself better
                                </p>
                                <div className="bg-amber-50 rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-gray-600">Weekly Growth</span>
                                        <span className="text-sm font-semibold text-amber-600">
                                            ↗ +15%
                                        </span>
                                    </div>
                                    <div className="flex space-x-1 items-end h-8">
                                        {[40, 65, 45, 80, 70, 90, 75].map((height, i) => (
                                            <div
                                                key={i}
                                                className="bg-[#ff9900] rounded-sm flex-1"
                                                style={{ height: `${height}%` }}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Benefit 3: Goal Achievement */}
                    <motion.div variants={fadeInUp}>
                        <div className="h-full bg-white text-center p-6 border-2 border-green-100 rounded-2xl hover:border-green-300 transition-all hover:shadow-lg">
                            <div className="pb-4">
                                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                                    <svg
                                        className="w-10 h-10 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    Make you reach your Goals faster
                                </h3>
                            </div>
                            <div>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    Sometimes spending for our personal development helps us in return
                                </p>
                                <div className="bg-green-50 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-600">Monthly Goal</span>
                                        <span className="text-sm font-semibold text-green-600">
                                            180/200 hrs
                                        </span>
                                    </div>
                                    <div className="w-full bg-green-200 rounded-full h-2">
                                        <div
                                            className="bg-green-600 h-2 rounded-full"
                                            style={{ width: "90%" }}
                                        ></div>
                                    </div>
                                    <div className="flex items-center justify-center mt-2">
                                        <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                                        <span className="text-xs text-green-600 font-medium">
                                            90% Complete
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
