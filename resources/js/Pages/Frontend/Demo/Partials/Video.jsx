import React from 'react';

// Video Grid Icons
const CheckCircleIcon = () => (<svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);

export default function Video({ isOpen, onClose }) {
    return (
        <>
            <section className="py-24 bg-gradient-to-br from-sky-50 via-white to-cyan-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">Watch & Learn</div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Master KeyTagJo in <span className="text-[#12b5e2]"> Minutes</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            See our productivity tracking system in action. Watch how KeyTagJo transforms daily chaos into organized clarity.
                        </p>
                    </div>

                    <div className="mb-16 relative max-w-5xl mx-auto">
                        <div className="absolute -top-4 -left-4 w-20 h-20 bg-sky-200 rounded-full opacity-20 animate-pulse"></div>
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-cyan-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
                        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
                            <div className="aspect-video relative">
                                <iframe src="https://www.youtube.com/embed/1tjljmJ79FU" title="KeyTagJo Demo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full" />
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Feature Grid Items */}
                        <VideoFeatureCard icon={<div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mb-4"><CheckCircleIcon /></div>} title="Quick Setup" desc="Complete setup in under 15 minutes with our step-by-step guide" />
                        <VideoFeatureCard icon={<div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mb-4"><svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" /></svg></div>} title="Advanced Features" desc="Discover powerful customization and automation techniques" />
                        <VideoFeatureCard icon={<div className="w-12 h-12 bg-[#12b5e2]/10 rounded-full flex items-center justify-center mb-4"><svg className="w-6 h-6 text-[#12b5e2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg></div>} title="Pro Tips" desc="Learn insider secrets from productivity experts and power users" />
                        <VideoFeatureCard icon={<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4"><svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg></div>} title="Team Workflow" desc="Best practices for collaboration and team productivity tracking" />
                    </div>
                </div>
            </section>

            {/* Video Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" onClick={onClose} />
                        <div className="relative w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">KeyTagJo Demo Video</h3>
                                    <p className="text-sm text-gray-500 mt-1">Watch how KeyTagJo transforms your productivity</p>
                                </div>
                                <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                            </div>
                            <div className="aspect-video relative">
                                <iframe src="https://www.youtube.com/embed/1tjljmJ79FU?autoplay=1&rel=0" title="KeyTagJo Demo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full" />
                            </div>
                            <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end">
                                <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

const VideoFeatureCard = ({ icon, title, desc }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {icon}
        <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{desc}</p>
    </div>
);
