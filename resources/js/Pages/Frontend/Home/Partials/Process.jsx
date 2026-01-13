import React from 'react';
import { motion } from 'framer-motion';

export default function Process() {
    const steps = [
        {
            id: 1,
            title: "Track your Time",
            description: "Use key tagging system to categorize every moment on how you spend your daily time",
            points: [
                "Assign tags (p#, i#, x# etc.) to your daily activities",
                "Log activities in 15-minute block intervals",
                "Build the habit with consistent daily tracking"
            ]
        },
        {
            id: 2,
            title: "Analyze Patterns",
            description: "Transform your raw time data into meaningful insights with analytics dashboard",
            points: [
                "Identify productivity peaks and valleys",
                "Track progress with monthly comparisons",
                "Spot recurring time wasters automatically"
            ]
        },
        {
            id: 3,
            title: "Optimize & Improve",
            description: "Use insights to make data-driven decisions about your time allocation and utilisation",
            points: [
                "Set realistic productivity target bench",
                "Eliminate or reduce waste activities",
                "Create accountability with progress tracking"
            ]
        },
        {
            id: 4,
            title: "Build Systems",
            description: "Develop sustainable productivity systems based on your unique daily patterns",
            points: [
                "Build personalized work-life balance",
                "Establish time boundaries for different activities",
                "Create productive habits based on data"
            ]
        }
    ];

    return (
        <section
            id="process"
            className="py-12 sm:py-20 bg-white"
            aria-labelledby="features-heading"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <h2
                        id="features-heading"
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    >
                        The 4-Step <span className="text-cyan-500">KeyTagJo</span> Process
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
                        Our experienced-backed methodology that helps you gain complete
                        control over your time
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting lines - hidden on mobile */}
                    <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 z-0">
                        <div className="flex justify-between items-center h-full max-w-6xl mx-auto px-32">
                            <div className="w-full h-0.5 bg-cyan-200"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Card className="h-full hover:shadow-lg transition-shadow border-2 border-cyan-100 relative bg-white">
                                    <CardHeader className="pb-4 text-center">
                                        <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                            <span className="text-2xl font-bold text-white">{step.id}</span>
                                        </div>
                                        <CardTitle className="text-xl font-bold text-gray-900">
                                            {step.title}
                                        </CardTitle>
                                        <p className="text-sm text-gray-600 mt-2">
                                            {step.description}
                                        </p>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <ul className="text-left space-y-2 text-sm text-gray-600">
                                            {step.points.map((point, i) => (
                                                <li key={i} className="flex items-start">
                                                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
// ^^^ IMPORTANT: This brace MUST close the 'Process' function
// BEFORE the helper components are defined below.

/* -------------------------------------------------------------------------- */
/* Helper Components (Must be defined OUTSIDE the main component)             */
/* -------------------------------------------------------------------------- */

function Card({ className, ...props }) {
    return (
        <div
            className={`flex flex-col gap-6 rounded-xl border py-6 shadow-sm ${className || ""}`}
            {...props}
        />
    );
}

function CardHeader({ className, ...props }) {
    return (
        <div
            className={`flex flex-col gap-1.5 px-6 ${className || ""}`}
            {...props}
        />
    );
}

function CardTitle({ className, ...props }) {
    return (
        <div
            className={`leading-none font-semibold ${className || ""}`}
            {...props}
        />
    );
}

function CardContent({ className, ...props }) {
    return (
        <div
            className={`px-6 ${className || ""}`}
            {...props}
        />
    );
}
