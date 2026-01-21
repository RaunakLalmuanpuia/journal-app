import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
};

export default function Index({ auth, users, roles, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedRole, setSelectedRole] = useState(filters.role || '');
    const debouncedSearch = useDebounce(search, 300);

    useEffect(() => {
        if (debouncedSearch !== (filters.search || '') || selectedRole !== (filters.role || '')) {
            router.get(
                route('users.index'),
                { search: debouncedSearch, role: selectedRole },
                { preserveState: true, replace: true }
            );
        }
    }, [debouncedSearch, selectedRole]);

    const handleRoleChange = (user, newRole) => {
        if (!newRole) return;
        router.put(route('users.updateRole', user.id), { role: newRole }, { preserveScroll: true });
    };

    const toggleUserStatus = (user) => {
        const isActive = user.status === 'Active';
        const action = isActive ? 'deactivate' : 'activate';
        if (confirm(`Are you sure you want to ${action} this user?`)) {
            router.patch(route('users.toggleStatus', user.id), {}, { preserveScroll: true });
        }
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>}
        >
            <Head title="All Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            {/* Filter Bar */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                <h3 className="text-lg font-medium">User List</h3>

                                {/* Wrapper for Inputs + Clear Link */}
                                <div className="flex flex-col items-end w-full md:w-auto gap-2">

                                    {/* Inputs Row */}
                                    <div className="flex gap-2 w-full md:w-auto">
                                        <input
                                            type="text"
                                            placeholder="Search name or email..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full md:w-64"
                                        />
                                        <select
                                            value={selectedRole}
                                            onChange={(e) => setSelectedRole(e.target.value)}
                                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full md:w-48"
                                        >
                                            <option value="">All Roles</option>
                                            {roles.map((roleName) => (
                                                <option key={roleName} value={roleName}>{roleName}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Clear Filters Link - Placed Below */}

                                    <Link
                                        href={route('users.index')}
                                        className="text-xs text-gray-500 hover:text-gray-800 underline"
                                    >
                                        Clear Filters
                                    </Link>
                                </div>
                            </div>


                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        {/* Added Created Header */}
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {users.data.map((user) => {
                                        const isCurrentUser = user.id === auth.user.id;
                                        const isActive = user.status === 'Active';

                                        return (
                                            <tr key={user.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold overflow-hidden">
                                                                {user.avatar
                                                                    ? <img src={user.avatar} className="w-full h-full object-cover" />
                                                                    : user.name.charAt(0)}
                                                            </div>
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                            <div className="text-sm text-gray-500">{user.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {user.roles.length > 0 ? user.roles.map(r => (
                                                        <span key={r} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 mr-1">
                                                        {r}
                                                    </span>
                                                    )) : <span className="text-gray-400 text-xs italic">No Role</span>}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {user.status}
                                                </span>
                                                </td>

                                                {/* Added Created Date Data */}
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {user.created_at}
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <select
                                                            className="text-xs border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-1 cursor-pointer disabled:opacity-50"
                                                            value={user.roles[0] || ''}
                                                            onChange={(e) => handleRoleChange(user, e.target.value)}
                                                            disabled={isCurrentUser}
                                                        >
                                                            {user.roles.length === 0 && <option value="">Assign Role</option>}
                                                            {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                                                        </select>

                                                        <button
                                                            onClick={() => toggleUserStatus(user)}
                                                            disabled={isCurrentUser}
                                                            className={`px-3 py-1 rounded text-xs font-semibold text-white transition shadow-sm ${
                                                                isActive
                                                                    ? 'bg-red-500 hover:bg-red-600'
                                                                    : 'bg-green-500 hover:bg-green-600'
                                                            } ${isCurrentUser ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                        >
                                                            {isActive ? 'Deactivate' : 'Activate'}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )})}
                                    {users.data.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                                No users found.
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Logic ... */}
                            <div className="mt-4 flex flex-wrap">
                                {users.links.map((link, k) => (
                                    link.url ? (
                                        <Link
                                            key={k}
                                            href={link.url}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className={`px-3 py-1 border rounded mr-1 text-sm ${
                                                link.active
                                                    ? "bg-indigo-600 text-white border-indigo-600"
                                                    : "bg-white text-gray-700 hover:bg-gray-100"
                                            }`}
                                        />
                                    ) : (
                                        <span
                                            key={k}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className="px-3 py-1 border rounded mr-1 text-sm text-gray-400 cursor-not-allowed bg-gray-50"
                                        />
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
