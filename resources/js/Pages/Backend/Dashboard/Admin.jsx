import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import {
    Users,
    BookOpen,
    TrendingUp,
    DollarSign,
    Plus,
    UserPlus,
    Settings
} from 'lucide-react';

// 1. Accept 'stats' as a prop
export default function AdminDashboard({ auth, stats }) {

    // 2. Map the incoming props to your UI configuration
    const statCards = [
        {
            label: 'Total Users',
            value: stats.total_users, // Use prop data
            subtext: 'All registered users',
            icon: Users,
        },
        {
            label: 'Blog Posts',
            value: stats.blog_posts, // Use prop data
            subtext: 'Published posts',
            icon: BookOpen,
        },
        {
            label: 'Active Users',
            value: stats.active_users, // Use prop data
            subtext: 'Active in last 30 days',
            icon: TrendingUp,
        },
        {
            label: 'Revenue',
            value: stats.revenue, // Use prop data
            subtext: 'Monthly recurring revenue',
            icon: DollarSign,
        },
    ];

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            {/* --- Stats Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-sm font-semibold text-gray-900">{stat.label}</h3>
                                <Icon className="w-5 h-5 text-gray-400" />
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                                <p className="text-xs text-gray-500 font-medium">{stat.subtext}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* --- Quick Actions Section (Unchanged) --- */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
                    <p className="text-sm text-gray-500">Common administrative tasks</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link href="/admin/posts/create" className="flex items-center p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group cursor-pointer">
                        <div className="mr-4 p-2 bg-transparent rounded-full">
                            <Plus className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-sm font-semibold text-blue-700">Create New Blog Post</span>
                    </Link>

                    <Link href="/admin/users" className="flex items-center p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors group cursor-pointer">
                        <div className="mr-4 p-2 bg-transparent rounded-full">
                            <UserPlus className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-sm font-semibold text-green-800">Manage Users</span>
                    </Link>

                    <Link href="/admin/settings" className="flex items-center p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors group cursor-pointer">
                        <div className="mr-4 p-2 bg-transparent rounded-full">
                            <Settings className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="text-sm font-semibold text-purple-800">System Settings</span>
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
}
