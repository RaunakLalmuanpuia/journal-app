import React, { useState, useCallback } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { debounce } from 'lodash';

// Note: Prop is now 'subscriptions' instead of 'users'
export default function Index({ auth, subscriptions, filters, plan_types }) {
    const [params, setParams] = useState({
        search: filters.search || '',
        type: filters.type || ''
    });

    const debouncedSearch = useCallback(
        debounce((searchQuery, filterType) => {
            router.get(route('admin.plans.index'),
                { search: searchQuery, type: filterType },
                { preserveState: true, preserveScroll: true, replace: true }
            );
        }, 300),
        []
    );

    const onSearchChange = (e) => {
        const newValue = e.target.value;
        setParams(prev => ({ ...prev, search: newValue }));
        debouncedSearch(newValue, params.type);
    };

    const onTypeChange = (e) => {
        const newValue = e.target.value;
        setParams(prev => ({ ...prev, type: newValue }));
        router.get(route('admin.plans.index'),
            { search: params.search, type: newValue },
            { preserveState: true, preserveScroll: true, replace: true }
        );
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">All Subscriptions</h2>}
        >
            <Head title="User Plans" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            {/* Filters */}
                            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                                <h3 className="text-lg font-medium">Subscription List</h3>
                                <div className="flex gap-2 w-full md:w-auto">
                                    <select
                                        className="border-gray-300 rounded-md shadow-sm capitalize"
                                        value={params.type}
                                        onChange={onTypeChange}
                                    >
                                        <option value="">All Plans</option>
                                        {plan_types.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="text"
                                        placeholder="Search user..."
                                        className="border-gray-300 rounded-md shadow-sm w-full md:w-64"
                                        value={params.search}
                                        onChange={onSearchChange}
                                    />
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expires</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {subscriptions.data.map((sub) => (
                                        <tr key={sub.id} className={sub.is_active ? 'bg-indigo-50/50' : ''}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {sub.user_avatar ? (
                                                        <img className="h-8 w-8 rounded-full mr-3" src={sub.user_avatar} />
                                                    ) : (
                                                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3 text-gray-500 text-xs">
                                                            {sub.user_name.charAt(0)}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{sub.user_name}</div>
                                                        <div className="text-sm text-gray-500">{sub.user_email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                                                {sub.plan_name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                                                {sub.plan_type}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    sub.is_active
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {sub.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {sub.ends_at ? new Date(sub.ends_at).toLocaleDateString() : 'Lifetime'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                {/* Link to User Profile/History */}
                                                <Link
                                                    href={route('admin.plans.show', sub.user_id)}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    History
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                    {subscriptions.data.length === 0 && (
                                        <tr><td colSpan="6" className="px-6 py-4 text-center text-gray-500">No subscriptions found.</td></tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="mt-4 flex flex-wrap gap-1">
                                {subscriptions.links.map((link, index) => {
                                    const baseClasses = "px-3 py-1 border rounded text-sm transition-colors duration-150";
                                    const activeClasses = "bg-indigo-600 text-white border-indigo-600";
                                    const inactiveClasses = "bg-white text-gray-700 border-gray-300 hover:bg-gray-50";
                                    const disabledClasses = "text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed";

                                    if (link.url) {
                                        return (
                                            <Link key={index} href={link.url} className={`${baseClasses} ${link.active ? activeClasses : inactiveClasses}`} dangerouslySetInnerHTML={{ __html: link.label }} preserveState preserveScroll />
                                        );
                                    }
                                    return <span key={index} className={`${baseClasses} ${disabledClasses}`} dangerouslySetInnerHTML={{ __html: link.label }} />;
                                })}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
