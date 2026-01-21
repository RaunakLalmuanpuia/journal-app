import React, { useState, useEffect } from 'react';
import {
    ArrowRight,
    CheckCircle2,
    Star,
    Users,
    Loader2,
    ExternalLink,
    FolderCheck,
    Check,
    X,
    // --- NEW IMPORTS START ---
    BookOpen,
    Maximize2,
    Minimize2,
    FileText,
    Sheet,
    Presentation,
    FileQuestion,
    LayoutDashboard,
    File as FileGeneric
    // --- NEW IMPORTS END ---
} from 'lucide-react';
import UserLayout from '@/Layouts/UserLayout';
import { usePage, router, useForm } from "@inertiajs/react";
import { motion, AnimatePresence } from 'framer-motion';
import ProvisioningModal from '@/Components/ProvisioningModal';

// --- NEW HELPER: Google Doc URL ---
const GOOGLE_DOC_URL = "https://docs.google.com/document/d/1IwUGpIbV9tf0gmAX5urAP2Jb8S2f55dJ-CivHKLzCeI/edit";

// --- NEW HELPER: Convert Drive URL to Embed URL ---
const getEmbedUrl = (url, type) => {
    if (!url) return '';

    // Force preview for Guide
    if (type === 'guide') {
        return url.replace(/\/edit.*$/, '/preview').replace(/\/view.*$/, '/preview');
    }

    let embedUrl = url;
    if (url.includes('/view')) embedUrl = url.replace(/\/view.*$/, '/edit');
    else if (url.includes('/preview')) embedUrl = url.replace(/\/preview.*$/, '/edit');
    else if (!url.includes('/edit')) embedUrl = `${url}/edit`;

    return embedUrl;
};

// --- NEW HELPER: Get Icon/Colors ---
const getFileConfig = (file) => {
    const type = (file.type || '').toLowerCase();

    // Custom case for the Guide we are opening
    if (type === 'guide' || type.includes('doc')) {
        return {
            Icon: FileText,
            color: 'text-[#4285f4]',
            bg: 'bg-blue-50',
            hoverBg: 'group-hover:bg-blue-100',
            gradient: 'from-blue-50 to-blue-200'
        };
    }

    // Fallback
    return {
        Icon: FileGeneric,
        color: 'text-gray-600',
        bg: 'bg-gray-50',
        hoverBg: 'group-hover:bg-gray-100',
        gradient: 'from-gray-50 to-gray-200'
    };
};

export default function User() {
    const { props } = usePage();
    const { auth } = props;
    const user = auth.user;

    // --- EXISTING STATE ---
    const [isEnterpriseModalOpen, setEnterpriseModalOpen] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    // --- NEW STATE FOR FILE PREVIEW ---
    const [selectedFile, setSelectedFile] = useState(null);
    const [isFullScreen, setIsFullScreen] = useState(false);

    // --- EXISTING LOGIC ---
    const hasPro = user.plans.some(p => p.type === 'pro' && p.pivot.status === 'active');
    const driveResources = user.drive_resources || user.driveResources || [];
    const proFolder = driveResources.find(r => r.type === 'folder' && r.plan_id !== null);
    const isProvisioning = hasPro && !proFolder;

    useEffect(() => {
        let interval;
        if (isProvisioning) {
            interval = setInterval(() => { router.reload({ only: ['auth'] }); }, 3000);
        }
        return () => clearInterval(interval);
    }, [isProvisioning]);

    const handleClick = () => { router.get('/my-products'); };
    const handleEnterpriseClick = () => { setEnterpriseModalOpen(true); };
    const handleInquirySuccess = () => {
        setEnterpriseModalOpen(false);
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 4000);
    };

    // --- NEW HANDLER FOR CLOSING MODAL ---
    const handleCloseModal = () => {
        setSelectedFile(null);
        setIsFullScreen(false);
    };

    // Calculate config for Modal Header
    const modalFileConfig = selectedFile ? getFileConfig(selectedFile) : null;
    const ModalIcon = modalFileConfig ? modalFileConfig.Icon : null;

    return (
        <UserLayout>
            <div className="min-h-screen bg-gray-50 font-sans text-gray-900 relative">

                {/* --- TOAST & ENTERPRISE MODALS (Existing) --- */}
                <AnimatePresence>
                    {showSuccessToast && <SuccessToast onClose={() => setShowSuccessToast(false)} />}
                </AnimatePresence>
                <EnterpriseModal isOpen={isEnterpriseModalOpen} onClose={() => setEnterpriseModalOpen(false)} onSuccessAction={handleInquirySuccess} user={user} />
                {isProvisioning && <ProvisioningModal />}


                {/* --- NEW FILE PREVIEW MODAL --- */}
                {selectedFile && modalFileConfig && (
                    <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 ${isFullScreen ? 'p-0' : 'p-4 sm:p-6'}`}>
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                            onClick={handleCloseModal}
                        />

                        <div className={`relative bg-white shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 ${isFullScreen ? 'w-full h-full rounded-none' : 'w-full max-w-6xl h-[85vh] rounded-xl'}`}>
                            {/* Modal Header */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                                <div className="flex items-center space-x-3 overflow-hidden">
                                    <ModalIcon className={`w-5 h-5 flex-shrink-0 ${modalFileConfig.color}`} />
                                    <h3 className="text-sm font-semibold text-gray-900 truncate max-w-[200px] sm:max-w-md">
                                        {selectedFile.name}
                                    </h3>
                                </div>

                                <div className="flex items-center space-x-2 pl-4">
                                    <a
                                        href={selectedFile.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hidden sm:inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                    >
                                        <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                                        New Tab
                                    </a>
                                    <div className="w-px h-4 bg-gray-300 mx-1 hidden sm:block" />
                                    <button
                                        onClick={() => setIsFullScreen(!isFullScreen)}
                                        className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                                        title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
                                    >
                                        {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                                    </button>
                                    <button
                                        onClick={handleCloseModal}
                                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Modal Iframe Content */}
                            <div className="flex-1 bg-gray-100 relative">
                                <iframe
                                    src={getEmbedUrl(selectedFile.link, selectedFile.type)}
                                    title={selectedFile.name}
                                    className="w-full h-full border-0"
                                    allow="autoplay; clipboard-write; encrypted-media"
                                />
                            </div>
                        </div>
                    </div>
                )}


                {/* Header */}
                <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="text-center sm:text-left">
                                <h1 className="text-2xl font-light text-gray-900">Welcome, {user?.name}</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="space-y-12">
                        <section className="space-y-6">
                            <div className="flex items-start justify-between mb-6">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Available Plans</h2>
                                <button onClick={handleClick} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-9 px-3 bg-[#12b5e2] hover:bg-[#0ea5d3] text-white transition-colors">
                                    My Products <ArrowRight className="w-4 h-4 ml-2" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

                                {/* --- Free Plan --- */}
                                <div className="bg-white text-gray-950 flex flex-col gap-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 py-6">
                                    <div className="flex flex-col space-y-1.5 px-4 sm:px-6 pt-0 pb-3">
                                        <div className="flex items-start space-x-2 sm:space-x-3">
                                            <div className="p-1.5 sm:p-2 rounded-lg bg-[#12b5e2] bg-opacity-10 flex-shrink-0">
                                                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#12b5e2]" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-medium text-gray-900 text-sm sm:text-base">Free Plan</h3>
                                                <p className="text-xs text-gray-600 leading-relaxed mt-0.5">For individuals who want a simple start.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-4 sm:px-6 pt-0 pb-4 sm:pb-6 flex-1 flex flex-col justify-between">
                                        <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-gray-700 mb-4">
                                            <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#12b5e2] mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" /><span>Log activities with customizable KeyTags</span></li>
                                            <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#12b5e2] mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" /><span>Weekly sheets with automatic charts</span></li>
                                            <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#12b5e2] mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" /><span>Monthly dashboard with color-coded summaries</span></li>
                                            <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#12b5e2] mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" /><span>Yearly heatmap to track long-term patterns</span></li>
                                        </ul>

                                        {/* --- UPDATED BUTTON FOR OPEN GUIDE --- */}
                                        <button
                                            onClick={() => setSelectedFile({ name: "Getting Started Guide", link: GOOGLE_DOC_URL, type: "guide" })}
                                            className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-[#12b5e2] hover:bg-[#0ea5d3] text-white"
                                        >
                                            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                                            Open Guide
                                        </button>
                                    </div>
                                </div>

                                {/* --- Pro Plan --- */}
                                <div className="bg-white text-gray-950 flex flex-col gap-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 py-6 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-bl-lg">Popular</div>
                                    <div className="flex flex-col space-y-1.5 px-4 sm:px-6 pt-0 pb-3">
                                        <div className="flex items-start space-x-2 sm:space-x-3">
                                            <div className="p-1.5 sm:p-2 rounded-lg bg-[#12b5e2] bg-opacity-10 flex-shrink-0">
                                                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-[#12b5e2]" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-medium text-gray-900 text-sm sm:text-base">Pro Plan</h3>
                                                <p className="text-xs text-gray-600 leading-relaxed mt-0.5">For power users who want 24/7 tracking.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-4 sm:px-6 pt-0 pb-4 sm:pb-6 flex-1 flex flex-col justify-between">
                                        <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-gray-700 mb-4">
                                            <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#12b5e2] mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" /><span>Everything in Basic, plus advanced features</span></li>
                                            <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#12b5e2] mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" /><span>Track every minute with flexible, color-coded cells</span></li>
                                            <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#12b5e2] mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" /><span>Merge cells for uninterrupted activity logging</span></li>
                                            <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#12b5e2] mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" /><span>Automatic color scoring for quick performance feedback</span></li>
                                            <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#12b5e2] mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" /><span>Advanced dashboards with richer weekly, monthly, and yearly insights</span></li>
                                        </ul>
                                        {!hasPro && (
                                            <button className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-[#12b5e2] hover:bg-[#0ea5d3] text-white transition-colors" onClick={() => window.location.href = route('pro.connect.drive')}>
                                                Activate Pro
                                            </button>
                                        )}
                                        {hasPro && proFolder && (
                                            <div className="space-y-3">
                                                <div className="text-green-600 text-xs font-medium flex items-center bg-green-50 p-2 rounded">
                                                    <FolderCheck className="w-4 h-4 mr-2" /> Drive Folder Connected
                                                </div>
                                                <a href={proFolder.link} target="_blank" rel="noreferrer" className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-900 transition-colors">
                                                    Open Dashboard <ExternalLink className="w-4 h-4 ml-2" />
                                                </a>
                                            </div>
                                        )}
                                        {hasPro && !proFolder && (
                                            <div className="text-blue-600 text-xs font-medium flex items-center bg-blue-50 p-2 rounded animate-pulse">
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Provisioning Drive...
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* --- Enterprise Plan --- */}
                                <div className="bg-white text-gray-950 flex flex-col gap-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 py-6">
                                    <div className="flex flex-col space-y-1.5 px-4 sm:px-6 pt-0 pb-3">
                                        <div className="flex items-start space-x-2 sm:space-x-3">
                                            <div className="p-1.5 sm:p-2 rounded-lg bg-[#12b5e2] bg-opacity-10 flex-shrink-0">
                                                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#12b5e2]" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-medium text-gray-900 text-sm sm:text-base">Enterprise</h3>
                                                <p className="text-xs text-gray-600 leading-relaxed mt-0.5">For custom solutions.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-4 sm:px-6 pt-0 pb-4 sm:pb-6 flex-1 flex flex-col justify-between">
                                        <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-gray-700 mb-4">
                                            <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#12b5e2] mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" /><span>Everything in Pro, plus exclusive features</span></li>
                                            <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#12b5e2] mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" /><span>One-on-one consultation with the founding team</span></li>
                                            <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#12b5e2] mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" /><span>Personalized KeyTags and tailored setup</span></li>
                                            <li className="flex items-start"><CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#12b5e2] mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" /><span>Custom dashboard design on request</span></li>
                                        </ul>
                                        <button onClick={handleEnterpriseClick} className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 border border-[#12b5e2] hover:bg-[#12b5e2]/5 text-[#12b5e2] transition-colors">
                                            Claim Enterprise Plan
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <style>{`
                    @keyframes progress {
                        0% { transform: translateX(-100%); }
                        50% { transform: translateX(-20%); }
                        100% { transform: translateX(0%); }
                    }
                    .animate-progress {
                        animation: progress 30s ease-out forwards;
                    }
                `}</style>
            </div>
        </UserLayout>
    );
}

// --- HELPER COMPONENTS (Keep your existing helpers here) ---
function SuccessToast({ onClose }) {
    return (
        <motion.div initial={{ opacity: 0, y: -20, x: 20 }} animate={{ opacity: 1, y: 0, x: 0 }} exit={{ opacity: 0, y: -20, x: 20 }} transition={{ duration: 0.3 }} className="fixed top-24 right-6 z-[60] flex items-center w-full max-w-sm p-4 bg-white rounded-lg shadow-2xl border-l-4 border-[#12b5e2]" role="alert">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-[#12b5e2] bg-[#12b5e2]/10 rounded-lg">
                <Check className="w-5 h-5" />
            </div>
            <div className="ml-3 text-sm font-normal text-gray-700">
                <span className="font-semibold block text-gray-900">Request Sent!</span>
                We'll get back to you shortly.
            </div>
            <button type="button" onClick={onClose} className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 items-center justify-center">
                <span className="sr-only">Close</span>
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
}

function EnterpriseModal({ isOpen, onClose, onSuccessAction, user }) {
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        company: '', contact_name: user?.name || '', email: user?.email || '', team_size: '', requirements: '', budget: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/enterprise-inquiry', { onSuccess: () => { reset(); onSuccessAction(); } });
    };

    const handleCancel = () => { clearErrors(); onClose(); };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto">
                    <div className="p-6 sm:p-8">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">Enterprise Inquiry</h3>
                            <p className="text-gray-500 mt-1 text-sm">Tell us about your team. We'll set you up with a custom plan.</p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-1">Company *</label>
                                    <input type="text" value={data.company} onChange={e => setData('company', e.target.value)} placeholder="Acme Inc." className={`w-full rounded-md shadow-sm sm:text-sm px-3 py-2 border ${errors.company ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-[#12b5e2] focus:ring-[#12b5e2]'}`} />
                                    {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-1">Contact Name *</label>
                                    <input type="text" value={data.contact_name} onChange={e => setData('contact_name', e.target.value)} placeholder="Jane Doe" className={`w-full rounded-md shadow-sm sm:text-sm px-3 py-2 border ${errors.contact_name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-[#12b5e2] focus:ring-[#12b5e2]'}`} />
                                    {errors.contact_name && <p className="text-red-500 text-xs mt-1">{errors.contact_name}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-1">Email *</label>
                                    <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} placeholder="jane@acme.com" className={`w-full rounded-md shadow-sm sm:text-sm px-3 py-2 border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-[#12b5e2] focus:ring-[#12b5e2]'}`} />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-1">Team Size *</label>
                                    <input type="text" value={data.team_size} onChange={e => setData('team_size', e.target.value)} placeholder="e.g. 25" className={`w-full rounded-md shadow-sm sm:text-sm px-3 py-2 border ${errors.team_size ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-[#12b5e2] focus:ring-[#12b5e2]'}`} />
                                    {errors.team_size && <p className="text-red-500 text-xs mt-1">{errors.team_size}</p>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-1">Requirements *</label>
                                <textarea rows={3} value={data.requirements} onChange={e => setData('requirements', e.target.value)} placeholder="Describe your use case..." className={`w-full rounded-md shadow-sm sm:text-sm px-3 py-2 border resize-none ${errors.requirements ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-[#12b5e2] focus:ring-[#12b5e2]'}`} />
                                {errors.requirements && <p className="text-red-500 text-xs mt-1">{errors.requirements}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-1">Budget (optional)</label>
                                <input type="text" value={data.budget} onChange={e => setData('budget', e.target.value)} placeholder="Approximate budget" className={`w-full rounded-md shadow-sm sm:text-sm px-3 py-2 border ${errors.budget ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-[#12b5e2] focus:ring-[#12b5e2]'}`} />
                                {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget}</p>}
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={handleCancel} className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#12b5e2]">Cancel</button>
                                <button type="submit" disabled={processing} className="px-4 py-2 text-sm font-semibold text-white bg-[#12b5e2] border border-transparent rounded-md hover:bg-[#0ea5d3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#12b5e2] disabled:opacity-50 disabled:cursor-not-allowed">{processing ? 'Submitting...' : 'Submit Inquiry'}</button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
