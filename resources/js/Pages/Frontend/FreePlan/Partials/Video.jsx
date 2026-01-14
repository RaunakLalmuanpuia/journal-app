import React from 'react';

// Icons
const CheckCircleIcon = () => (
    <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const SettingsIcon = () => (
    <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" /></svg>
);
const BulbIcon = () => (
    <svg className="w-6 h-6 text-[#12b5e2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
);
const UsersIcon = () => (
    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);

export default function Video() {
    return (
        <section className="py-24 bg-gradient-to-br from-sky-50 via-white to-cyan-50">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                        Watch & Learn
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Master KeyTagJo in
                        <span className="text-[#12b5e2]"> Minutes</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        See our productivity tracking system in action. Watch how KeyTagJo
                        transforms daily chaos into organized clarity.
                    </p>
                </div>

                {/* Video Container */}
                <div className="mb-16">
                    <div className="relative max-w-5xl mx-auto">
                        {/* Background decorative elements */}
                        <div className="absolute -top-4 -left-4 w-20 h-20 bg-sky-200 rounded-full opacity-20 animate-pulse"></div>
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-cyan-200 rounded-full opacity-20 animate-pulse delay-1000"></div>

                        {/* Video embed container */}
                        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
                            <div className="aspect-video relative">
                                <iframe
                                    src="https://www.youtube.com/embed/1tjljmJ79FU"
                                    title="KeyTagJo Demo - Master Your Productivity"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    className="absolute inset-0 w-full h-full"
                                />
                            </div>

                            {/* Video overlay info */}
                            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-medium">LIVE DEMO</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mb-4">
                            <CheckCircleIcon />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Quick Setup</h3>
                        <p className="text-gray-600 text-sm">
                            Complete setup in under 15 minutes with our step-by-step guide
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
                            <SettingsIcon />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">
                            Advanced Features
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Discover powerful customization and automation techniques
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="w-12 h-12 bg-[#12b5e2]/10 rounded-full flex items-center justify-center mb-4">
                            <BulbIcon />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Pro Tips</h3>
                        <p className="text-gray-600 text-sm">
                            Learn insider secrets from productivity experts and power users
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <UsersIcon />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Team Workflow</h3>
                        <p className="text-gray-600 text-sm">
                            Best practices for collaboration and team productivity tracking
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
