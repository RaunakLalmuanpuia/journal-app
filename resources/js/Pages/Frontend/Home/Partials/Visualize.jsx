import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, BarChart3, Grid3X3, X } from 'lucide-react';

export default function Visualize() {
    const [activeTab, setActiveTab] = useState("spreadsheet");
    const [selectedElement, setSelectedElement] = useState(null);

    // Data Configuration
    const elements = {
        p: {
            name: "Productive",
            description: "Periods considered productive for yourself. Mostly to do with work related, but not necesarily when one is working for purely as a job task, but when one may enjoy and be productive",
            color: "#12b5e2",
            example: "Office work, writing a book, meeting with clients etc.",
        },
        i: {
            name: "Improvement",
            description: "Periods spending for improving oneself, mostly one may consider learning, improving skills etc.",
            color: "#ffff00",
            example: "Reading a book, studying, learning guitar etc.",
        },
        x: {
            name: "Exercise",
            description: "Mostly to do with building up related to physical fitness and at times mental fitness as well depending on the user's preference",
            color: "#ff9900",
            example: "Gym, sports, meditation etc.",
        },
        n: {
            name: "Necessity",
            description: "Periods for life's essential actions which we cannot live without",
            color: "#ffffff",
            example: "eating, toilet etc.",
        },
        t: {
            name: "Timepass",
            description: "Periods where you just go about passing your time but sometimes such period are a required. Ideally to be avoided but as mentioned at times they need to be there",
            color: "#b7b7b7",
            example: "Social media browsing, dreaming away uselessly, watching your favourite sports club play etc.",
        },
        w: {
            name: "Waste",
            description: "Periods when you time is just wasted uselessly. Not a neccesity and to be avoided. Many times it will be a prolonged timepass",
            color: "#666666",
            example: "Instagram browsing for 1 hour straight, just sitting doing nothing etc.",
        },
        e: {
            name: "Essential",
            description: "Periods for life's necessary items, but which we can live without even if we don't do it but necessary because of our lifestyle or societal norms",
            color: "#00ff00",
            example: "dressing up, commuting to office etc",
        },
        s: {
            name: "Sleep",
            description: "Periods where you have sleep",
            color: "#efefef",
            example: "(self explanatory)",
        },
        y: {
            name: "Family",
            description: "Periods where you spend your time with your family",
            color: "#12b5e2",
            example: "(self explanatory)",
        },
        f: {
            name: "Friends",
            description: "Periods where you spend your time with friends",
            color: "#12b5e2",
            example: "(self explanatory)",
        },
        r: {
            name: "Relationship",
            description: "Periods where you spend time with your relationship partner",
            color: "#ec57a7",
            example: "(self explanatory)",
        },
        k: {
            name: "Sick",
            description: "Periods when you are not well or sick and cannot do anything else much",
            color: "#ff0000",
            example: "(self explanatory)",
        },
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                        KeyTagJo <span className="text-sky-400">Dashboard</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Visualize your weekly productivity patterns with our interactive
                        dashboard. Switch between Pictorial View, Analytics View, and Grid
                        View to explore your time data.
                    </p>
                </motion.div>

                {/* Tab Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center mb-8"
                >
                    <div className="bg-gray-100 p-1 rounded-lg inline-flex">
                        <button
                            onClick={() => setActiveTab("spreadsheet")}
                            aria-pressed={activeTab === "spreadsheet"}
                            aria-label="Switch to Pictorial View"
                            className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${activeTab === "spreadsheet"
                                ? "bg-white text-[#12b5e2] shadow-sm"
                                : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            <Calendar className="w-4 h-4" aria-hidden="true" />
                            <span>Pictorial View</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("analytics")}
                            aria-pressed={activeTab === "analytics"}
                            aria-label="Switch to Analytics View"
                            className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${activeTab === "analytics"
                                ? "bg-white text-[#12b5e2] shadow-sm"
                                : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            <BarChart3 className="w-4 h-4" aria-hidden="true" />
                            <span>Analytics View</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("heatmap")}
                            aria-pressed={activeTab === "heatmap"}
                            aria-label="Switch to Grid View"
                            className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${activeTab === "heatmap"
                                ? "bg-white text-[#12b5e2] shadow-sm"
                                : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            <Grid3X3 className="w-4 h-4" aria-hidden="true" />
                            <span>Grid View</span>
                        </button>
                    </div>
                </motion.div>

                {/* Tab Content */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white border-2 border-gray-300 rounded-lg p-6 max-w-full mx-auto shadow-lg overflow-hidden"
                >
                    {activeTab === "spreadsheet" ? (
                        <div className="text-center">
                            <div className="mb-6">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                                    Pictorial View
                                </h3>
                                <p className="text-lg text-gray-600">
                                    Interactive time tracking spreadsheet in action
                                </p>
                            </div>

                            {/* GIF/Image Container for Spreadsheet */}
                            <div className="relative w-full max-w-5xl mx-auto bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-inner overflow-hidden">
                                <img
                                    src="/assets/BirdsEyeView.gif"
                                    alt="KeyTagJo Pictorial View Demo - Interactive spreadsheet showing time tracking in action"
                                    width={800}
                                    height={600}
                                    loading="lazy"
                                    className="w-full h-auto object-contain rounded-lg border border-gray-200"
                                    style={{ maxHeight: "600px" }}
                                />

                                {/* Overlay with play button effect */}
                                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center group cursor-pointer">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                                            <svg
                                                className="w-6 h-6 text-[#12b5e2] ml-1"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : activeTab === "analytics" ? (
                        <div className="text-center">
                            <div className="mb-6">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                                    Analytics Dashboard
                                </h3>
                                <p className="text-lg text-gray-600">
                                    Advanced analytics and insights from your time data
                                </p>
                            </div>

                            {/* GIF/Image Container for Analytics */}
                            <div className="relative w-full max-w-5xl mx-auto bg-gradient-to-br from-[#12b5e2]/10 to-[#12b5e2]/20 rounded-xl shadow-inner overflow-hidden">
                                <img
                                    src="/assets/AnalyticalView.png"
                                    alt="KeyTagJo Analytics Dashboard Demo - Advanced analytics showing productivity patterns and insights"
                                    width={800}
                                    height={600}
                                    loading="lazy"
                                    className="w-full h-auto object-contain rounded-lg border border-gray-200"
                                    style={{ maxHeight: "600px" }}
                                />

                                {/* Overlay with play button effect */}
                                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center group cursor-pointer">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                                            <svg
                                                className="w-6 h-6 text-[#12b5e2] ml-1"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : activeTab === "heatmap" ? (
                        <div className="text-center">
                            <div className="mb-6">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                                    Heatmap Visualization
                                </h3>
                                <p className="text-lg text-gray-600">
                                    Visual patterns of your daily and weekly activity
                                </p>
                            </div>

                            {/* GIF/Image Container for Heatmap */}
                            <div className="relative w-full max-w-5xl mx-auto bg-gradient-to-br from-green-50 to-cyan-50 rounded-xl shadow-inner overflow-hidden">
                                <img
                                    src="/assets/GridView.gif"
                                    alt="KeyTagJo Grid View Demo - Heatmap visualization showing daily and weekly activity patterns"
                                    width={800}
                                    height={600}
                                    loading="lazy"
                                    className="w-full h-auto object-contain rounded-lg border border-gray-200"
                                    style={{ maxHeight: "600px" }}
                                />
                                {/* Overlay with play button effect */}
                                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center group cursor-pointer">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                                            <svg
                                                className="w-6 h-6 text-green-600 ml-1"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </motion.div>

                {/* Legend (shown for both tabs) */}
                <div className="mt-8">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="text-sm text-gray-600 mb-6 text-center"
                    >
                        💡{" "}
                        {activeTab === "spreadsheet"
                            ? "Birds Eye View of your daily life"
                            : activeTab === "analytics"
                                ? "Visual representation of your time tracking data with insights and trends"
                                : "Interactive heatmap showing activity intensity patterns throughout your week"}
                    </motion.p>

                    {/* KeyTags Section Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="text-center mb-6"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">KeyTags</h3>
                        <p className="text-gray-600 text-sm">Click for more details</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto"
                    >
                        {Object.entries(elements).map(([symbol, element]) => (
                            <button
                                key={symbol}
                                onClick={() => setSelectedElement({ symbol, ...element })}
                                className="flex items-center space-x-3 p-4 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 text-left group hover:-translate-y-1 bg-white"
                            >
                                {/* Color Circle */}
                                <div
                                    className="w-6 h-6 rounded-full border-2 border-gray-300 flex-shrink-0 shadow-sm"
                                    style={{ backgroundColor: element.color }}
                                />

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-gray-900 text-sm mb-1">
                                        <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded mr-2">
                                            {symbol.toLowerCase()}#
                                        </span>
                                        {element.name}
                                    </div>
                                    <div className="text-xs text-gray-600 leading-relaxed truncate">
                                        {element.description}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Modal Implementation */}
                <AnimatePresence>
                    {selectedElement && (
                        <Modal
                            element={selectedElement}
                            onClose={() => setSelectedElement(null)}
                        />
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

// Modal Component
const Modal = ({ element, onClose }) => {
    if (!element) return null;

    const isColorDark = (hexColor) => {
        const color = hexColor.substring(1);
        const r = parseInt(color.substring(0, 2), 16);
        const g = parseInt(color.substring(2, 4), 16);
        const b = parseInt(color.substring(4, 6), 16);
        const uicolors = [r / 255, g / 255, b / 255];
        const c = uicolors.map((col) => {
            if (col <= 0.03928) {
                return col / 12.92;
            }
            return Math.pow((col + 0.055) / 1.055, 2.4);
        });
        const L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
        return L > 0.179;
    };

    const textColor = isColorDark(element.color) ? "text-black" : "text-white";

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl border border-gray-200"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 rounded-full p-1"
                >
                    <X size={20} />
                </button>

                <div className="text-center mb-6">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        style={{ backgroundColor: element.color }}
                        className={`w-20 h-20 mx-auto rounded-xl flex items-center justify-center ${textColor} mb-4 shadow-lg border-2 border-gray-200`}
                    >
                        <div className="text-2xl font-bold">{element.symbol}#</div>
                    </motion.div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {element.name}
                    </h2>
                    <div className="text-sm text-gray-500 bg-gray-100 rounded-full px-3 py-1 inline-block">
                        Category: {element.symbol.toLowerCase()}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-700 mb-2 text-base">
                            Description:
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            {element.description}
                        </p>
                    </div>
                    {element.example && (
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-700 mb-2 text-base">
                                Examples:
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                {element.example}
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-6 text-center">
                    <button
                        onClick={onClose}
                        className="bg-[#12b5e2] hover:bg-[#0ea5d3] text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm"
                    >
                        Got it!
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};
