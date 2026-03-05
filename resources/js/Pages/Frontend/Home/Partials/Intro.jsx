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
                            Track Your Time in{" "}
                            <span className="bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent">
                                15-Minute
                            </span>
                            {" "}Blocks
                        </h1>

                        <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Watch your time turn into clear dashboards and long-term patterns
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                href={'dashboard'}
                                className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-lg font-medium rounded-lg text-white bg-[#12b5e2] hover:bg-[#0ea5d3] transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                            >
                                Get Tracking
                            </Link>
                            <Link
                                href={'demo'}
                                className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-lg font-medium rounded-lg text-white bg-[#12b5e2] hover:bg-[#0ea5d3] transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                            >
                                View Demo
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16"
                    >
                        <StatCard
                            label="Daily Logging"
                            color="border-[#12b5e2]"
                            icon={<img src="/assets/calender.png" alt="Daily Logging" className="h-full object-contain" />}
                        />

                        <StatCard
                            label="Clear Dashboards"
                            color="border-[#a800ff]"
                            icon={<img src="/assets/dashboard.png" alt="Clear Dashboards" className="h-full object-contain" />}
                        />

                        <StatCard
                            label="Visible Patterns"
                            color="border-[#008f39]"
                            icon={<img src="/assets/Chart.png" alt="Visible Patterns" className="h-full object-contain" />}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function StatCard({ icon, label, color }) {
    return (
        // Using p-6 to keep the exact same dimensional footprint as your previous code
        <div className={`bg-white rounded-xl p-6 border-2 flex flex-col items-center justify-center ${color} shadow-sm hover:shadow-md transition-shadow duration-300`}>

            {/* Icon Container - Fixed height to keep cards uniform */}
            <div className="h-14 sm:h-16 mb-3 flex items-center justify-center">
                {icon}
            </div>

            {/* Label */}
            <div className="text-xl font-bold text-black text-center whitespace-nowrap">
                {label}
            </div>
        </div>
    );
}
