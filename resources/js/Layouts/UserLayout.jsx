import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Package,
    User,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Home,
    HelpCircle,
} from 'lucide-react';

export default function UserLayout({ children }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    // FIX: Destructure 'url' directly from usePage(), not from props
    const { props, url } = usePage();
    const { auth, roles } = props;
    const user = auth.user;

    // Toggle sidebar function
    const toggleSidebar = () => setIsCollapsed(!isCollapsed);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar Component */}
            <Sidebar
                isCollapsed={isCollapsed}
                onToggleCollapse={toggleSidebar}
                user={user}
                roles={roles}
                currentUrl={url} // Now this will be defined (e.g., "/dashboard")
            />

            {/* Main Content Area */}
            <div
                className={`flex-1 flex flex-col transition-all duration-300 ${
                    isCollapsed ? 'ml-16' : 'ml-64'
                }`}
            >
                <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

// --- Internal Sidebar Component ---
function Sidebar({ isCollapsed, onToggleCollapse, user, roles, currentUrl }) {
    const [isHovered, setIsHovered] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    // Logic to determine badge color based on Spatie roles
    const getUserRoleDisplay = () => {
        if (roles.includes('Admin')) {
            return { label: 'Admin', color: 'bg-purple-100 text-purple-800 border-purple-200' };
        }
        if (roles.includes('Premium')) {
            return { label: 'Premium', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
        }
        return { label: 'User', color: 'bg-blue-100 text-blue-800 border-blue-200' };
    };

    const roleDisplay = getUserRoleDisplay();

    // Define your navigation items here
    const navigationItems = [
        {
            href: '/dashboard', // Updated as requested
            icon: LayoutDashboard,
            label: 'Dashboard',
            description: 'Overview & stats',
        },
        {
            href: '/my-products', // Changed to avoid duplicate keys, adjust as needed
            icon: Package,
            label: 'My Products',
            description: 'Tools & resources',
        },
        {
            href: '/profile',
            icon: User,
            label: 'Profile',
            description: 'Personal info',
        },
    ];

    const quickActions = [
        {
            href: '/',
            icon: Home,
            label: 'Home',
            description: 'Main website',
        },
        {
            href: '/help-support',
            icon: HelpCircle,
            label: 'Help & Support',
            description: 'Get assistance',
        },
    ];

    const shouldExpand = isCollapsed && isHovered;
    const showContent = !isCollapsed || shouldExpand;

    // Helper for active state (Safe check in case currentUrl is somehow null)
    const isActiveLink = (path) => {
        if (!currentUrl) return false;
        return currentUrl.startsWith(path) && path !== '/' ? true : currentUrl === path;
    };

    return (
        <motion.div
            className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 flex flex-col z-50 transition-all duration-300 ${
                isCollapsed ? (shouldExpand ? 'w-64 shadow-xl' : 'w-16') : 'w-64'
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Header / Logo */}
            <div className="p-4 border-b border-gray-200 h-16 flex items-center">
                <AnimatePresence mode="wait">
                    {showContent ? (
                        <motion.div
                            key="expanded"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="w-full"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-[#12b5e2] rounded-lg flex items-center justify-center overflow-hidden">
                                        <img
                                            src="/assets/logo.png"
                                            alt="KeyTag Journal Logo"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-gray-900 text-sm">KeyTag Journal</h2>
                                        <p className="text-xs text-gray-500">User Panel</p>
                                    </div>
                                </div>
                                <button onClick={onToggleCollapse} className="p-1 hover:bg-gray-100 rounded">
                                    <ChevronLeft className="w-4 h-4 text-gray-500" />
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="collapsed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="w-full flex justify-center relative"
                        >
                            <div className="w-8 h-8 bg-[#12b5e2] rounded-lg flex items-center justify-center text-white font-bold text-xs">
                                <img
                                    src="/assets/logo.png"
                                    alt="KeyTag Journal Logo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {!isHovered && (
                                <button
                                    onClick={onToggleCollapse}
                                    className="absolute -right-6 top-1 bg-white border border-gray-200 rounded-full p-1 shadow-sm"
                                >
                                    <ChevronRight className="w-3 h-3 text-gray-500" />
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* User Profile Snippet */}
            <div className="p-4 border-b border-gray-200">
                <AnimatePresence mode="wait">
                    {showContent ? (
                        <motion.div
                            key="user-expanded"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center space-x-3"
                        >
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                                {user.avatar ? (
                                    <img src={user.avatar} alt="User" className="w-full h-full object-cover"/>
                                ) : (
                                    <User className="w-5 h-5 text-gray-500" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                                {/*<span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${roleDisplay.color}`}>*/}
                                {/*    {roleDisplay.label}*/}
                                {/*</span>*/}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="user-collapsed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex justify-center"
                        >
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-gray-500" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
                <div className="space-y-1 px-3">
                    {navigationItems.map((item) => {
                        const active = isActiveLink(item.href);
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg border transition-all duration-200 mb-2 ${
                                    active
                                        ? 'bg-blue-50 border-blue-200 text-[#12b5e2]'
                                        : 'border-transparent text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            >
                                <Icon
                                    className={`flex-shrink-0 h-5 w-5 transition-colors ${
                                        active ? 'text-[#12b5e2]' : 'text-gray-400 group-hover:text-gray-600'
                                    } ${showContent ? 'mr-3' : ''}`}
                                />
                                <AnimatePresence>
                                    {showContent && (
                                        <motion.div
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: 'auto' }}
                                            exit={{ opacity: 0, width: 0 }}
                                            className="flex-1 min-w-0 overflow-hidden"
                                        >
                                            <p className="font-medium truncate">{item.label}</p>
                                            <p className="text-[10px] opacity-75 truncate">{item.description}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Link>
                        );
                    })}
                </div>

                {/* Quick Actions */}
                <div className="mt-6 px-3">
                    <AnimatePresence>
                        {showContent && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="mb-2 px-2"
                            >
                                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Quick Actions
                                </h3>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="space-y-1">
                        {quickActions.map((item) => {
                            const active = isActiveLink(item.href);
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`group flex items-center px-3 py-2 text-sm rounded-lg border border-transparent transition-colors ${
                                        active
                                            ? 'bg-blue-50 text-[#12b5e2]'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    <Icon className={`flex-shrink-0 h-4 w-4 ${showContent ? 'mr-3' : ''} ${active ? 'text-[#12b5e2]' : 'text-gray-400'}`} />
                                    <AnimatePresence>
                                        {showContent && (
                                            <motion.div
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: 'auto' }}
                                                exit={{ opacity: 0, width: 0 }}
                                                className="flex-1 min-w-0 overflow-hidden"
                                            >
                                                <p className="font-medium truncate">{item.label}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Footer / Logout */}
            <div className="border-t border-gray-200 p-4 bg-gray-50">
                <button
                    onClick={handleLogout}
                    className={`flex items-center w-full text-red-600 hover:text-red-700 hover:bg-red-100 rounded-md p-2 transition-colors ${
                        showContent ? 'justify-start' : 'justify-center'
                    }`}
                >
                    <LogOut className={`h-4 w-4 ${showContent ? 'mr-3' : ''}`} />
                    <AnimatePresence>
                        {showContent && (
                            <motion.span
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 'auto' }}
                                exit={{ opacity: 0, width: 0 }}
                                className="text-sm font-medium whitespace-nowrap"
                            >
                                Logout
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </div>
        </motion.div>
    );
}
