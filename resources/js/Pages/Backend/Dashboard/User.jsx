import React, { useState, useEffect } from 'react';
import {
    ArrowRight,
    CheckCircle2,
    Star,
    Users,
    Loader2, // Added for the spinner
    ExternalLink,
    FolderCheck
} from 'lucide-react';
import UserLayout from '@/Layouts/UserLayout';
import { usePage, router } from "@inertiajs/react";
import ProvisioningModal from '@/Components/ProvisioningModal'; // Save the code above to this file

export default function User() {
    const { props } = usePage();
    const { auth } = props;
    const user = auth.user;

    // 1. Check Plan Status
    const hasPro = user.plans.some(
        p => p.type === 'pro' && p.pivot.status === 'active'
    );

    // 2. Check if Drive Resource Exists
    // We assume your User model loads 'driveResources' (e.g., user.drive_resources)
    // If you haven't loaded this relationship in HandleInertiaRequests or the Controller,
    // you might need to check "user.drive_resources" vs "user.driveResources" depending on your casing.
    const driveResources = user.drive_resources || user.driveResources || [];
    const proFolder = driveResources.find(r => r.type === 'folder' && r.plan_id !== null);

    // 3. Determine if we are in "Provisioning Mode"
    // User has paid (Pro) BUT no folder exists yet.
    const isProvisioning = hasPro && !proFolder;

    // 4. Polling Logic
    useEffect(() => {
        let interval;
        if (isProvisioning) {
            // Poll every 3 seconds to see if the job finished
            interval = setInterval(() => {
                router.reload({ only: ['auth'] }); // Only reload user data to save bandwidth
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isProvisioning]);


    return (
        <UserLayout>
            <div className="min-h-screen bg-gray-50 font-sans text-gray-900 relative">

                {/* --- PROVISIONING MODAL --- */}
                {isProvisioning && (
                    <ProvisioningModal />
                )}

                {/* Header */}
                <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="text-center sm:text-left">
                                <h1 className="text-2xl font-light text-gray-900">
                                    Welcome, {user?.name}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Container */}
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="space-y-12">

                        {/* Plans & Tools Section */}
                        <section className="space-y-6">

                            <div className="flex items-start justify-between mb-6">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                                    Available Plans
                                </h2>

                                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-9 px-3 bg-[#12b5e2] hover:bg-[#0ea5d3] text-white transition-colors">
                                    My Products
                                    <ArrowRight className="w-4 h-4 ml-2" />
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
                                                <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                                                    Free Plan
                                                </h3>
                                                <p className="text-xs text-gray-600 leading-relaxed mt-0.5">
                                                    For individuals who want a simple start.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-4 sm:px-6 pt-0 pb-4 sm:pb-6 flex-1 flex flex-col justify-between">
                                        <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-gray-700 mb-4">
                                            <li className="flex items-start">
                                                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#12b5e2] mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" />
                                                <span>Log activities with customizable KeyTags</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#12b5e2] mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" />
                                                <span>Weekly sheets with automatic charts</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#12b5e2] mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" />
                                                <span>Monthly dashboard with color-coded summaries</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#12b5e2] mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" />
                                                <span>Yearly heatmap to track long-term patterns</span>
                                            </li>
                                        </ul>


                                        {/* Button Placeholder for Free Plan */}
                                        <button className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-[#12b5e2] hover:bg-[#0ea5d3] text-white">
                                            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                                            Open Guide
                                        </button>
                                    </div>
                                </div>
                                {/* --- Pro Plan --- */}
                                <div className="bg-white text-gray-950 flex flex-col gap-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 py-6 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-bl-lg">
                                        Popular
                                    </div>

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
                                            <li className="flex items-start">
                                                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#12b5e2] mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" />
                                                <span>Everything in Basic, plus advanced features</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#12b5e2] mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" />
                                                <span>Track every minute with flexible, color-coded cells</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#12b5e2] mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" />
                                                <span>Merge cells for uninterrupted activity logging</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#12b5e2] mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" />
                                                <span>Automatic color scoring for quick performance feedback</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#12b5e2] mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" />
                                                <span>Advanced dashboards with richer weekly, monthly, and yearly insights</span>
                                            </li>
                                        </ul>
                                        {/* STATE: NOT PRO */}
                                        {!hasPro && (
                                            <button
                                                className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-[#12b5e2] hover:bg-[#0ea5d3] text-white transition-colors"
                                                onClick={() => window.location.href = route('pro.connect.drive')}
                                            >
                                                Activate Pro
                                            </button>
                                        )}

                                        {/* STATE: PRO ACTIVE + FOLDER READY */}
                                        {hasPro && proFolder && (
                                            <div className="space-y-3">
                                                <div className="text-green-600 text-xs font-medium flex items-center bg-green-50 p-2 rounded">
                                                    <FolderCheck className="w-4 h-4 mr-2" />
                                                    Drive Folder Connected
                                                </div>
                                                <a
                                                    href={proFolder.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-900 transition-colors"
                                                >
                                                    Open Dashboard <ExternalLink className="w-4 h-4 ml-2" />
                                                </a>
                                            </div>
                                        )}

                                        {/* STATE: PRO ACTIVE + PROVISIONING (Handled by Modal usually, but fallback here) */}
                                        {hasPro && !proFolder && (
                                            <div className="text-blue-600 text-xs font-medium flex items-center bg-blue-50 p-2 rounded animate-pulse">
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Provisioning Drive...
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
                                        <div>
                                            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-gray-700 mb-4">
                                                <li className="flex items-start">
                                                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#12b5e2] mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" />
                                                    <span>Everything in Pro, plus exclusive features</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#12b5e2] mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" />
                                                    <span>One-on-one consultation with the founding team</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#12b5e2] mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" />
                                                    <span>Personalized KeyTags and tailored setup</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#12b5e2] mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5" />
                                                    <span>Custom dashboard design on request</span>
                                                </li>
                                            </ul>

                                            {/*<div className="mb-3 text-xs sm:text-sm text-gray-500 flex items-center justify-between">*/}
                                            {/*  <span className="flex items-center">*/}
                                            {/*    <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-[#12b5e2]" />*/}
                                            {/*    Inactive*/}
                                            {/*  </span>*/}
                                            {/*    <span className="text-[11px] sm:text-xs text-gray-400">*/}
                                            {/*    Manual review by admin*/}
                                            {/*  </span>*/}
                                            {/*</div>*/}
                                        </div>

                                        {/* Button Placeholder for Enterprise Plan */}
                                        <button className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 border border-[#12b5e2]  transition-colors">
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
