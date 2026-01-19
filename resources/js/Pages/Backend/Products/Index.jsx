import React, { useState } from 'react';
import UserLayout from '@/Layouts/UserLayout.jsx';
import { Head } from '@inertiajs/react';
import {
    Star, Users, CheckCircle2, Loader2, BookOpen,
    MessageCircle, Clock, FolderOpen, ExternalLink, LayoutDashboard,
    Sheet, Eye, X, Maximize2, Minimize2,
    // --- NEW IMPORTS ---
    FileText,       // For Google Docs
    Presentation,   // For Google Slides
    FileQuestion,   // For Google Forms
    File as FileGeneric // Fallback
} from 'lucide-react';

// --- HELPER: Convert Drive URL to Embed URL ---
const getEmbedUrl = (url, type) => {
    if (!url) return '';

    // CASE 1: If it is a GUIDE, force "preview" mode
    if (type === 'guide') {
        return url.replace(/\/edit.*$/, '/preview').replace(/\/view.*$/, '/preview');
    }

    // CASE 2: Default, force "edit" mode
    let embedUrl = url;
    if (url.includes('/view')) embedUrl = url.replace(/\/view.*$/, '/edit');
    else if (url.includes('/preview')) embedUrl = url.replace(/\/preview.*$/, '/edit');
    else if (!url.includes('/edit')) embedUrl = `${url}/edit`;

    return embedUrl;
};

// --- NEW HELPER: Get Icon and Colors based on File Type ---
const getFileConfig = (file) => {
    // Normalize type string (handle 'application/vnd...' or simple 'sheet')
    const type = (file.type || file.mime_type || '').toLowerCase();

    // 1. DASHBOARDS
    if (type === 'dashboard') {
        return {
            Icon: LayoutDashboard,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
            hoverBg: 'group-hover:bg-indigo-100',
            gradient: 'from-indigo-50 to-indigo-200'
        };
    }

    // 2. GOOGLE SHEETS
    if (type.includes('sheet') || type.includes('spreadsheet')) {
        return {
            Icon: Sheet,
            color: 'text-[#0f9d58]', // Google Sheets Green
            bg: 'bg-green-50',
            hoverBg: 'group-hover:bg-green-100',
            gradient: 'from-green-50 to-green-200'
        };
    }

    // 3. GOOGLE DOCS
    if (type.includes('doc') || type.includes('document')) {
        return {
            Icon: FileText,
            color: 'text-[#4285f4]', // Google Docs Blue
            bg: 'bg-blue-50',
            hoverBg: 'group-hover:bg-blue-100',
            gradient: 'from-blue-50 to-blue-200'
        };
    }

    // 4. GOOGLE SLIDES
    if (type.includes('slide') || type.includes('presentation')) {
        return {
            Icon: Presentation,
            color: 'text-[#f4b400]', // Google Slides Yellow/Orange
            bg: 'bg-yellow-50',
            hoverBg: 'group-hover:bg-yellow-100',
            gradient: 'from-yellow-50 to-yellow-200'
        };
    }

    // 5. GOOGLE FORMS
    if (type.includes('form')) {
        return {
            Icon: FileQuestion,
            color: 'text-[#7248b9]', // Google Forms Purple
            bg: 'bg-purple-50',
            hoverBg: 'group-hover:bg-purple-100',
            gradient: 'from-purple-50 to-purple-200'
        };
    }

    // DEFAULT / FALLBACK
    return {
        Icon: FileGeneric,
        color: 'text-gray-600',
        bg: 'bg-gray-50',
        hoverBg: 'group-hover:bg-gray-100',
        gradient: 'from-gray-50 to-gray-200'
    };
};

export default function UserProducts({ auth, activeClaims, roles = [] }) {

    const [userGuideOpen, setUserGuideOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const getDisplayRole = () => {
        if (roles.includes('Admin')) return 'Admin';
        if (roles.includes('User')) return 'User';
        return 'User';
    };

    const currentRole = getDisplayRole();

    const getAccessLevelColor = (role) => {
        switch (role) {
            case 'Admin': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'User': return 'bg-amber-100 text-amber-800 border-amber-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const handleCloseModal = () => {
        setSelectedFile(null);
        setIsFullScreen(false);
    };

    // --- Prepare Modal Icon Logic ---
    // If a file is selected, get its config to render the correct icon in the Modal Header
    const modalFileConfig = selectedFile ? getFileConfig(selectedFile) : null;
    const ModalIcon = modalFileConfig ? modalFileConfig.Icon : null;

    return (
        <UserLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Products</h2>}
        >
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-light text-gray-900">My Products</h1>
                                <p className="text-gray-500 mt-1 font-light text-sm">
                                    Manage and access your available tools and resources
                                </p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize transition-colors focus:outline-none ${getAccessLevelColor(currentRole)}`}>
                                    {currentRole} Access
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <section className="space-y-6">
                        <div className="space-y-8">
                            <div>
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">My Claimed Plans</h2>
                                        <p className="text-gray-600 text-sm">
                                            Your active plan subscriptions with Google Drive resources
                                        </p>
                                    </div>
                                    <span className="inline-flex items-center rounded-full border border-green-200 bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                        {activeClaims.length} Active
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                    {activeClaims.map((claim) => (
                                        <PlanCard
                                            key={claim.id}
                                            claim={claim}
                                            setUserGuideOpen={setUserGuideOpen}
                                            onFileSelect={setSelectedFile}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* --- FILE PREVIEW / EDIT MODAL --- */}
            {selectedFile && modalFileConfig && (
                <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${isFullScreen ? 'p-0' : 'p-4 sm:p-6'}`}>
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                        onClick={handleCloseModal}
                    />

                    <div className={`relative bg-white shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 ${isFullScreen ? 'w-full h-full rounded-none' : 'w-full max-w-6xl h-[85vh] rounded-xl'}`}>

                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                            <div className="flex items-center space-x-3 overflow-hidden">
                                {/* DYNAMIC MODAL ICON */}
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
        </UserLayout>
    );
}

function PlanCard({ claim, setUserGuideOpen, onFileSelect }) {
    const isPro = claim.planType === 'pro';
    const isEnterprise = claim.planType === 'enterprise';
    const isFree = claim.planType === 'free';
    const GOOGLE_DOC_URL = "https://docs.google.com/document/d/1IwUGpIbV9tf0gmAX5urAP2Jb8S2f55dJ-CivHKLzCeI/edit";

    const getStatusStyles = (status) => {
        switch (status) {
            case 'claimed': return 'bg-blue-100 text-blue-800';
            case 'active': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'duplicating': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 bg-white flex flex-col h-full">
            <div className="p-4 sm:p-6 pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-1.5 sm:p-2 rounded-lg bg-[#12b5e2] bg-opacity-10">
                            {isPro && <Star className="w-5 h-5 text-[#12b5e2]" />}
                            {isEnterprise && <Users className="w-5 h-5 text-[#12b5e2]" />}
                            {isFree && <CheckCircle2 className="w-5 h-5 text-[#12b5e2]" />}
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900 capitalize">{claim.name}</h3>
                            <p className="text-xs text-gray-500">Claimed {claim.claimedAt}</p>
                        </div>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${getStatusStyles(claim.status)}`}>
                        {claim.status === "duplicating" ? (
                            <div className="flex items-center space-x-1">
                                <Loader2 className="w-3 h-3 animate-spin" />
                                <span>duplicating</span>
                            </div>
                        ) : (
                            <span className="capitalize">{claim.status}</span>
                        )}
                    </span>
                </div>
            </div>

            <div className="p-4 sm:p-6 pt-0 flex-1 flex flex-col">
                {isFree && (
                    <div className="space-y-4 flex-1 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center space-x-2 text-sm">
                                <BookOpen className="w-4 h-4 text-green-600" />
                                <span className="text-gray-700">Free Plan Resources Available</span>
                            </div>
                            <div className="text-center py-6">
                                <BookOpen className="w-12 h-12 text-green-600 mx-auto mb-3" />
                                <h4 className="text-sm font-medium text-gray-900 mb-1">Documentation & Guide</h4>
                                <p className="text-xs text-gray-500 mb-4">Access your free plan documentation and getting started guide</p>
                            </div>
                        </div>
                        <div className="flex space-x-2 mt-4 pt-3 border-t border-gray-100">
                            <button
                                onClick={() => onFileSelect({ name: "Getting Started Guide", link: GOOGLE_DOC_URL, type: "guide" })}
                                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-[#12b5e2] hover:bg-[#0ea5d3] text-white h-9 px-3 w-full"
                            >
                                <BookOpen className="w-3 h-3 mr-1" />
                                Open Guide
                            </button>
                        </div>
                    </div>
                )}

                {isEnterprise && (
                    <div className="space-y-4 flex-1 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center space-x-2 text-sm">
                                <MessageCircle className="w-4 h-4 text-[#12b5e2]" />
                                <span className="text-gray-700">Enterprise Inquiry Submitted</span>
                            </div>
                            <div className="text-center py-6">
                                <MessageCircle className="w-12 h-12 text-[#12b5e2] mx-auto mb-3" />
                                <h4 className="text-sm font-medium text-gray-900 mb-1">Waiting for Admin Response</h4>
                                <p className="text-xs text-gray-500 mb-4">KeytagJournal Admin will contact you soon with custom enterprise solution details</p>
                            </div>
                            <div className="bg-[#12b5e2] bg-opacity-5 border border-[#12b5e2] border-opacity-20 rounded-lg p-3">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Clock className="w-4 h-4 text-[#12b5e2]" />
                                    <span className="text-sm font-medium text-gray-800">What's Next?</span>
                                </div>
                                <ul className="space-y-1 text-xs text-gray-700">
                                    <li>• Admin review of your requirements</li>
                                    <li>• Custom solution preparation</li>
                                    <li>• Direct contact within 24-48 hours</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {isPro && (
                    <div className="flex-1 flex flex-col">
                        <div className="mb-4">
                            {claim.driveUrl ? (
                                <div className="flex items-center space-x-2 text-sm">
                                    <FolderOpen className="w-4 h-4 text-[#12b5e2]" />
                                    <span className="text-gray-700">Google Drive Created</span>
                                    <a
                                        href={claim.driveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-auto p-0 text-[#12b5e2] hover:text-[#0ea5d4]"
                                    >
                                        <ExternalLink className="w-3 h-3 ml-1" />
                                    </a>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Drive setup in progress...</span>
                                </div>
                            )}
                        </div>

                        {claim.files && claim.files.length > 0 ? (
                            <div className="space-y-3 flex-1">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-medium text-gray-900 flex items-center">
                                        <Sheet className="w-4 h-4 mr-1.5 text-[#0f9d58]" />
                                        Files
                                    </h4>
                                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                                        <Sheet className="w-3 h-3" />
                                        <span>{claim.files.length} items</span>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                    <div className="p-4">
                                        <div className="grid grid-cols-4 gap-3">
                                            {claim.files.slice(0, 8).map((file, index) => {
                                                // --- DYNAMIC VISUALS BASED ON TYPE ---
                                                const { Icon, color, bg, hoverBg, gradient } = getFileConfig(file);

                                                return (
                                                    <div
                                                        key={file.id || index}
                                                        onClick={() => onFileSelect(file)}
                                                        title={file.name}
                                                        className="relative bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#0f9d58] transition-all block group"
                                                    >
                                                        {/* Dynamic Background and Icon */}
                                                        <div className={`aspect-square relative flex items-center justify-center rounded-t-lg transition-colors ${bg} ${hoverBg}`}>
                                                            <div className={`absolute inset-0 opacity-50 bg-gradient-to-br ${gradient}`} />
                                                            <div className="relative z-10">
                                                                <Icon className={`w-8 h-8 drop-shadow-sm ${color}`} />
                                                            </div>
                                                        </div>

                                                        <div className="px-1 py-1 bg-white border-t border-gray-100">
                                                            <p className="text-[10px] font-medium text-gray-700 text-center leading-tight truncate">
                                                                {file.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        {claim.files.length > 8 && (
                                            <div className="mt-4 pt-4 border-t border-gray-100">
                                                <div className="w-full text-xs text-[#0f9d58] flex items-center justify-center py-2 rounded-lg bg-green-50">
                                                    <Sheet className="w-4 h-4 mr-2" />
                                                    +{claim.files.length - 8} more files
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            claim.driveUrl && (
                                <div className="space-y-3 flex-1 flex flex-col justify-center">
                                    <div className="text-center py-6">
                                        <FolderOpen className="w-12 h-12 text-[#12b5e2] mx-auto mb-3" />
                                        <h4 className="text-sm font-medium text-gray-900 mb-1">Google Drive Ready</h4>
                                        <p className="text-xs text-gray-500 mb-4">Your {claim.planType} plan resources are ready to access</p>
                                    </div>
                                </div>
                            )
                        )}

                        <div className="flex space-x-2 mt-4 pt-3 border-t border-gray-100">
                            {claim.driveUrl && (
                                <a
                                    href={claim.driveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-[#12b5e2] hover:bg-[#0ea5d4] text-white flex-1 h-9 px-3"
                                >
                                    <ExternalLink className="w-3 h-3 mr-1" />
                                    Open Drive
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
