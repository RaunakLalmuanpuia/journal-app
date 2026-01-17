import React, { useState, useEffect } from 'react';
import {
    Star,
    AlertTriangle,
    Loader2
} from 'lucide-react';

export default function ProvisioningModal() {
    // Local state to simulate progress animation
    const [progress, setProgress] = useState(0);

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

            {/* Main Card Container
               - max-h-[90vh]: Ensures modal fits within viewport height
               - flex flex-col: Allows us to split Header/Body/Footer
            */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">

                {/* --- Header Section (Fixed) --- */}
                {/* flex-shrink-0 prevents this section from getting squished */}
                <div className="p-4 sm:p-6 pb-2 flex-shrink-0">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="bg-[#12b5e2] rounded-md p-1">
                            <Star className="w-4 h-4 text-white fill-white" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-900">
                            Pro Workspace Creation in Progress
                        </h2>
                    </div>

                    {/* Blue Status Box */}
                    <div className="bg-sky-50 border border-sky-100 rounded-xl p-4 sm:p-5 mb-2">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                {/* Circle Icon */}
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#12b5e2] flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0">
                                    C
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Creating Your Workspace</h3>
                                    <p className="text-xs sm:text-sm text-gray-600">Processing... Please keep dialog open</p>
                                </div>
                            </div>
                            <span className="text-xl sm:text-2xl font-bold text-[#12b5e2]">
                                {Math.round(progress)}%
                            </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-white rounded-full h-2.5 overflow-hidden">
                            <div
                                className="h-full bg-[#12b5e2] transition-all duration-500 ease-out"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>

                        <p className="text-xs text-gray-500 mt-3 hidden sm:block">
                            Your Pro workspace is being created. Please keep this dialog open until completion.
                        </p>
                    </div>
                </div>

                {/* --- Yellow/Cream Scrollable Content Area (Scrollable) --- */}
                {/* flex-1: Takes up all remaining vertical space
                    overflow-y-auto: Enables scrolling strictly within this area
                */}
                <div className="bg-[#FFFBEB] p-4 sm:p-6 space-y-6 border-t border-gray-100 flex-1 overflow-y-auto">

                    {/* Warning Header */}
                    <div className="flex items-center gap-2 text-yellow-800 font-semibold text-lg">
                        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                        <h3>Important: Keep Dialog Open</h3>
                    </div>

                    {/* Card 1: Duplication Info */}
                    <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-orange-100">
                        <h4 className="text-yellow-900 font-medium mb-2">Duplication in Progress:</h4>
                        <p className="text-sm text-gray-700 leading-relaxed mb-4">
                            <span className="font-bold text-yellow-900">This dialog cannot be closed</span> until your workspace duplication is complete. This ensures your Pro workspace is properly configured with all features and file permissions.
                        </p>
                        <div className="bg-yellow-100/50 rounded-lg p-3 text-sm text-yellow-800 border border-yellow-100">
                            <span className="font-semibold">Tip:</span> You can open another tab to browse other parts of the dashboard while waiting.
                        </div>
                    </div>

                    <h3 className="text-yellow-900 font-bold text-lg pt-2">Setup Instructions</h3>

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

                {/* --- Footer (Fixed) --- */}
                <div className="p-4 sm:p-6 border-t border-gray-200 bg-white flex-shrink-0">
                    <button
                        disabled
                        className="w-full bg-gray-300 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed"
                    >
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Please Wait - Duplication in Progress
                    </button>
                    <p className="text-center text-xs text-gray-500 mt-3">
                        Please keep this dialog open until duplication completes.
                    </p>
                </div>

            </div>
        </div>
    );
}
