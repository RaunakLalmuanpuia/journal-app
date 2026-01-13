import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
// Import the new component
import Boxes from '@/Components/Ui/Boxes.jsx';

export default function Intro() {
    return (
        <section
            className="relative overflow-hidden bg-gradient-to-br from-[#12b5e2]/10 via-white to-[#12b5e2]/10 min-h-[85vh] flex flex-col items-center justify-center pt-20 pb-16"
            aria-labelledby="hero-heading"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 w-full h-full bg-white/60 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

            {/* The Boxes Component */}
            <Boxes />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
                {/* ... The rest of your content (Heading, Buttons, Stats) remains exactly the same ... */}
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1
                            id="hero-heading"
                            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight"
                        >
                            Introducing{" "}
                            <span className="bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent">
                                KeyTag Journal
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Your Life, Chaos to Clarity.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                href={route('register')}
                                className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-lg font-medium rounded-lg text-white bg-[#12b5e2] hover:bg-[#0ea5d3] transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                            >
                                Get Started
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16"
                    >
                        <StatCard value="99.9%" label="Productivity Increase" color="text-[#12b5e2]" />
                        <StatCard value="∞" label="Unlimited Tracking" color="text-[#ff9900]" isLarge />
                        <StatCard value="24/7" label="Time Visibility" color="text-green-600" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function StatCard({ value, label, color, isLarge = false }) {
    return (
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-gray-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className={`${isLarge ? 'text-5xl sm:text-6xl' : 'text-3xl sm:text-4xl'} font-bold ${color} mb-2`}>
                {value}
            </div>
            <div className="text-sm sm:text-base font-medium text-gray-600">
                {label}
            </div>
        </div>
    );
}
