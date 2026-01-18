import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Show({ auth, user, plan_history, payments }) {

    const formatDate = (dateString) => {
        if (!dateString) return 'Lifetime / Active';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Plan Details: {user.name}</h2>}
        >
            <Head title={`Plans for ${user.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* User Profile Card */}
                    <div className="bg-white p-6 shadow sm:rounded-lg flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl font-bold mr-4">
                                {user.avatar ? <img src={user.avatar} className="h-16 w-16 rounded-full" /> : user.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                                <p className="text-gray-500">{user.email}</p>
                                <p className="text-xs text-gray-400 mt-1">Joined: {user.joined_at}</p>
                            </div>
                        </div>
                        <Link
                            href={route('admin.plans.index')}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 text-sm"
                        >
                            &larr; Back to List
                        </Link>
                    </div>

                    {/* Section 1: Subscription History */}
                    <div className="bg-white overflow-hidden shadow sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Subscription History</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {plan_history.map((plan) => (
                                        <tr key={plan.pivot_id} className={plan.is_active ? 'bg-indigo-50' : ''}>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                                {plan.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                                                {plan.type}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(plan.starts_at)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(plan.ends_at)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        plan.is_active
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                        {plan.status} {plan.is_active ? '(Active)' : ''}
                                                    </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {plan_history.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 text-center text-gray-500 text-sm">
                                                No subscription history found.
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Payments (Optional but useful) */}
                    <div className="bg-white overflow-hidden shadow sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Payment History</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {payments.map((payment) => (
                                        <tr key={payment.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{payment.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${payment.amount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.method || 'N/A'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(payment.created_at)}</td>
                                        </tr>
                                    ))}
                                    {payments.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-4 text-center text-gray-500 text-sm">
                                                No payments found.
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}
