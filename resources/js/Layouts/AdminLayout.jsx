import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { ChevronLeft, Crown } from 'lucide-react';

export default function AdminLayout({ children }) {
    // FIX: Destructure 'url' from the root of usePage(), and 'auth' from props
    const { props, url } = usePage();
    const { auth } = props;
    const user = auth.user;

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    // Navigation Tabs Configuration
    const navItems = [
        { label: 'Overview', href: '/dashboard' },
        { label: 'Plans', href: '/admin/plans' },
        { label: 'Users', href: '/admin/users' },
        { label: 'Inquiry', href: '/admin/inquiries' },
        { label: 'Support', href: '/admin/support' },
        { label: 'Blog Posts', href: '/posts' },
        { label: 'Settings', href: '/admin/settings' },
    ];

    // Helper to check if a tab is active (with safety check)
    // Universal helper to check if a tab is active
    const isTabActive = (currentUrl, tabUrl) => {
        if (!currentUrl) return false;

        // 1. Exact Match (Home/Dashboard usually require this)
        if (currentUrl === tabUrl) return true;
        if (tabUrl === '/') return currentUrl === '/'; // Strict for root

        // 2. Strip IDs (numbers, UUIDs) to compare structure
        // This effectively turns "/admin/123/plans" into "/admin//plans"
        // and "/admin/plans" into "/admin/plans"
        const cleanCurrent = currentUrl.replace(/\/[0-9a-fA-F-]{4,}/g, '').replace(/\/\d+/g, '');
        const cleanTab = tabUrl.replace(/\/[0-9a-fA-F-]{4,}/g, '').replace(/\/\d+/g, '');

        // 3. Check if the clean current URL starts with the clean tab URL
        // We use startsWith to allow sub-pages (e.g., /admin/plans/create)
        return cleanCurrent.startsWith(cleanTab);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* --- Top Header Section --- */}
            <nav className="bg-white border-b border-gray-100 px-4 py-3">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

                    {/* Left: Back Button & Title */}
                    <div className="flex items-center w-full md:w-auto justify-between md:justify-start space-x-6">
                        <Link
                            href="/"
                            className="flex items-center px-4 py-2 bg-[#b6e0cd] hover:bg-[#a1d6bf] text-white rounded-lg text-sm font-semibold transition-colors shadow-sm"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1 stroke-[3]" />
                            Back to Home
                        </Link>

                        <div className="flex items-center space-x-3 border-l border-gray-200 pl-6 h-10">
                            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center shadow-md">
                                <Crown className="w-6 h-6 text-white fill-current" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 leading-none">Admin Dashboard</h1>
                                <p className="text-xs text-gray-500 mt-1 font-medium">Manage users and system settings</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: User Info & Logout */}
                    <div className="flex items-center space-x-4 md:space-x-6">
                        <div className="hidden md:flex items-center space-x-2">
                            <span className="text-sm text-gray-500">Welcome,</span>
                            <span className="text-sm font-bold text-gray-900">{user?.name}</span>
                        </div>

                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider rounded-full">
                            Super Admin
                        </span>

                        <button
                            onClick={handleLogout}
                            className="px-6 py-2 bg-[#b6e0cd] hover:bg-[#a1d6bf] text-white rounded-lg text-sm font-semibold transition-colors shadow-sm"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* --- Main Content Area --- */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Navigation Tabs (Pill Style) */}
                {/* Navigation Tabs */}
                <div className="mb-8">
                    <div className="bg-gray-100 p-1 rounded-lg w-full grid grid-cols-2 md:grid-cols-5 gap-1">
                        {navItems.map((item) => {
                            const active = isTabActive(url, item.href);
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`
                        text-center px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200
                        ${active
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
                                    }
                    `}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Page Content Injection */}
                <div className="animate-in fade-in zoom-in-95 duration-300">
                    {children}
                </div>
            </main>
        </div>
    );
}
