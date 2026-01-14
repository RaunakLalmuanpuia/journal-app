import React from 'react';

// --- Icon Components ---

const FreeIcon = () => (
    <div className="text-2xl font-bold text-white bg-cyan-500 px-3 py-1 rounded-lg transform -rotate-12">
        FREE
    </div>
);

const ShieldIcon = () => (
    <svg
        className="w-12 h-12 text-cyan-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
    </svg>
);

const CalendarIcon = () => (
    <svg
        className="w-12 h-12 text-cyan-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
    </svg>
);

const ChartIcon = () => (
    <svg
        className="w-12 h-12 text-cyan-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
    </svg>
);

const CheckIcon = () => (
    <svg
        className="w-6 h-6 text-cyan-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
        />
    </svg>
);

// --- Data ---

const featuresData = [
    {
        icon: FreeIcon,
        title: "Free Platform For All",
        description: "Using Google Sheets, easy available for everyone",
    },
    {
        icon: ShieldIcon,
        title: "Privacy-First Journaling",
        description: "Full control and ownership of your data",
    },
    {
        icon: CalendarIcon,
        title: "Intuitive Daily Tracking",
        description: "Daily sheets to capture tasks and hours easily",
    },
    {
        icon: ChartIcon,
        title: "Coded Activity Summary",
        description: "Monthly dashboard with color-coded data",
    },
];

// --- Main Component ---

export default function Features() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-5xl font-bold text-gray-900 mb-6">Features</h2>
                    <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                        Experience what you need to build and manage your daily life with
                        Confidence
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {featuresData.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <div
                                key={index}
                                className="group p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300"
                            >
                                <div className="flex items-center justify-center mb-6 h-16">
                                    <IconComponent />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-center text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <div className="p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center mb-4">
                            <CheckIcon />
                            <h3 className="text-lg font-bold text-gray-900 ml-3">
                                Building Consistency Habits
                            </h3>
                        </div>
                    </div>

                    <div className="p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center mb-4">
                            <CheckIcon />
                            <h3 className="text-lg font-bold text-gray-900 ml-3">
                                Creating Work-Life Balance
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
