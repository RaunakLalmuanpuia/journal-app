import AppLayout from '@/Layouts/AppLayout.jsx';

import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {
    return (
        // Use the wrapper here. It will automatically choose Admin vs User layout.
        <AppLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                            {/* Optional: Debug to see your role */}
                            <span className="block text-sm text-gray-500 mt-2">
                                (Current Role: {usePage().props.roles[0]})
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
