import React, { useState, useEffect } from 'react';
import {
    Star,
    AlertTriangle,
    Loader2,
    Minimize2,
    Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProvisioningModal() {
    const [progress, setProgress] = useState(0);
    const [isMinimized, setIsMinimized] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress >= 90) return 90;
                const diff = Math.random() * 3;
                return Math.min(oldProgress + diff, 90);
            });
        }, 500);

        return () => clearInterval(timer);
    }, []);

    return (
        <AnimatePresence>
            {!isMinimized ? (
                /* --- FULL MODAL VIEW --- */
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh] overflow-hidden"
                    >
                        {/* Header Section */}
                        <div className="p-4 sm:p-6 pb-2 flex-shrink-0">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="bg-[#12b5e2] rounded-md p-1">
                                        <Star className="w-4 h-4 text-white fill-white" />
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-900">Pro Workspace Creation</h2>
                                </div>
                                {/* MINIMIZE BUTTON */}
                                <button
                                    onClick={() => setIsMinimized(true)}
                                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
                                    title="Minimize to background"
                                >
                                    <Minimize2 className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Status Box */}
                            <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 mb-2">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#12b5e2] flex items-center justify-center text-white font-bold animate-pulse">
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 text-sm">Processing Workspace</h3>
                                            <p className="text-xs text-gray-600">You can minimize this to keep browsing</p>
                                        </div>
                                    </div>
                                    <span className="text-xl font-bold text-[#12b5e2]">{Math.round(progress)}%</span>
                                </div>
                                <div className="w-full bg-white rounded-full h-2.5 overflow-hidden">
                                    <div className="h-full bg-[#12b5e2] transition-all duration-500" style={{ width: `${progress}%` }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Scrollable Content Area */}
                        <div className="bg-[#FFFBEB] p-4 sm:p-6 space-y-6 border-t border-gray-100 flex-1 overflow-y-auto">
                            <div className="flex items-center gap-2 text-yellow-800 font-semibold">
                                <AlertTriangle className="w-5 h-5" />
                                <h3>Setup Instructions</h3>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-100 text-sm text-gray-700">
                                <p><strong>Note:</strong> We are duplicating your Pro templates. Do not rename the folder until the setup is complete to avoid broken links.</p>
                            </div>
                            {/* ... Rest of your instructions (Card 2, 3, 4) ... */}

                            {/* Card 2: Folder Name Policy */}
                            <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm">
                                <h4 className="text-yellow-900 font-medium mb-2">Folder Name Policy:</h4>
                                <p className="text-sm text-gray-700 mb-3">
                                    <span className="font-bold text-yellow-900">Do not change your Folder name</span> as your whole KeyTag Journal sheet linking hinges on the name for reference.
                                </p>
                                <div className="bg-gray-100 p-3 rounded-md font-mono text-xs text-gray-600 border border-gray-200 overflow-x-auto whitespace-nowrap">
                                    KTJ Pro v1.0 - KTJ0001000 - User Test - KeyTagJo {new Date().getFullYear()}
                                </div>
                            </div>

                            {/* Card 3: Getting Started */}
                            <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm">
                                <h4 className="text-yellow-900 font-medium mb-3">Getting Started Steps:</h4>
                                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                                    <li>On first open, go to your KeyTagJo and open the <span className="font-bold text-yellow-900">Year Dashboard sheet</span>, tagged with serial "0."</li>
                                    <li>Perform the necessary actions given in the Master Sheet</li>
                                    <li>Follow the steps to get the folder link</li>
                                    <li>If you're setting up a new month, click the button again to update the links</li>
                                    <li>Once completed, you're ready to start KeyTagJo-ing!</li>
                                </ol>
                            </div>

                            {/* Card 4: Naming Rules */}
                            <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm">
                                <h4 className="text-yellow-900 font-medium mb-3">Sheet Naming Rules:</h4>
                                <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-gray-700">
                                    <li>You can rename month sheets, but they <span className="font-bold text-yellow-900">must include the month name</span>: Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec</li>
                                    <li>It's highly advised not to change names as inter-linking is optimized with current structure</li>
                                    <li><span className="font-bold text-yellow-900">Edit only Month Sheets</span> - Year Sheet is aggregated data only</li>
                                </ul>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 sm:p-6 border-t border-gray-200 bg-white flex-shrink-0">
                            <button disabled className="w-full bg-gray-100 text-gray-400 font-medium py-3 rounded-lg flex items-center justify-center gap-2">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Building Your Journal...
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            ) : (
                /* --- MINIMIZED FLOATING DOCK --- */
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-6 z-[60] w-80 bg-white border border-[#12b5e2]/30 shadow-2xl rounded-xl overflow-hidden cursor-pointer hover:shadow-sky-100 transition-shadow"
                    onClick={() => setIsMinimized(false)}
                >
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="bg-[#12b5e2]/10 p-2 rounded-lg">
                                    <Loader2 className="w-4 h-4 text-[#12b5e2] animate-spin" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-bold text-gray-900 truncate">Setting up Pro Workspace</p>
                                    <p className="text-[10px] text-gray-500">Running in background...</p>
                                </div>
                            </div>
                            <Maximize2 className="w-4 h-4 text-gray-400" />
                        </div>

                        {/* Progress bar in minimized state */}
                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                            <div
                                className="h-full bg-[#12b5e2] transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between mt-1">
                            <span className="text-[10px] text-[#12b5e2] font-bold">{Math.round(progress)}%</span>
                            <span className="text-[10px] text-gray-400">Click to expand</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

