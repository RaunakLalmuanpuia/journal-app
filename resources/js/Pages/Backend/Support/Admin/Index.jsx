import React, { useState, useCallback } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { debounce } from 'lodash';

export default function Index({ auth, tickets, filters, statuses }) {
    // --- State: Filters & Search ---
    const [params, setParams] = useState({
        search: filters.search || '',
        status: filters.status || ''
    });

    // --- State: Modal ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);

    // --- Logic: Debounced Search ---
    const debouncedSearch = useCallback(
        debounce((searchQuery, statusFilter) => {
            router.get(route('admin.support.index'),
                { search: searchQuery, status: statusFilter },
                { preserveState: true, preserveScroll: true, replace: true }
            );
        }, 300),
        []
    );

    const onSearchChange = (e) => {
        const newValue = e.target.value;
        setParams(prev => ({ ...prev, search: newValue }));
        debouncedSearch(newValue, params.status);
    };

    const onStatusChange = (e) => {
        const newValue = e.target.value;
        setParams(prev => ({ ...prev, status: newValue }));
        router.get(route('admin.support.index'),
            { search: params.search, status: newValue },
            { preserveState: true, preserveScroll: true, replace: true }
        );
    };

    // --- Logic: Update Status (New Feature) ---
    const handleTicketStatusChange = (ticket, newStatus) => {
        if (!newStatus || newStatus === ticket.status) return;

        // Optimistic UI update or wait for server (Inertia handles reload)
        router.patch(route('admin.support.updateStatus', ticket.id),
            { status: newStatus },
            { preserveScroll: true }
        );
    };

    // --- Logic: Modal Actions ---
    const openModal = (ticket) => {
        setSelectedTicket(ticket);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedTicket(null), 200);
    };

    // --- Helper: Badge Colors ---
    const getPriorityColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'high': return 'bg-red-100 text-red-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'open': return 'bg-blue-100 text-blue-800';
            case 'pending': return 'bg-orange-100 text-orange-800';
            case 'resolved': return 'bg-green-100 text-green-800';
            case 'closed': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Support Tickets</h2>}
        >
            <Head title="Support Tickets" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            {/* --- Filters Section --- */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                <h3 className="text-lg font-medium">All Tickets</h3>

                                {/* Wrapper for Inputs + Clear Link */}
                                <div className="flex flex-col items-end w-full md:w-auto gap-2">
                                    <div className="flex gap-2 w-full md:w-auto">
                                        <select
                                            className="border-gray-300 rounded-md shadow-sm capitalize w-32 focus:border-indigo-500 focus:ring-indigo-500"
                                            value={params.status}
                                            onChange={onStatusChange}
                                        >
                                            <option value="">All Status</option>
                                            {statuses.map((status) => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                        <input
                                            type="text"
                                            placeholder="Search subject, user..."
                                            className="border-gray-300 rounded-md shadow-sm w-full md:w-64 focus:border-indigo-500 focus:ring-indigo-500"
                                            value={params.search}
                                            onChange={onSearchChange}
                                        />
                                    </div>
                                    {(params.search || params.status) && (
                                        <Link
                                            href={route('admin.support.index')}
                                            className="text-xs text-gray-500 hover:text-gray-800 underline"
                                            onClick={() => setParams({ search: '', status: '' })}
                                        >
                                            Clear Filters
                                        </Link>
                                    )}
                                </div>
                            </div>

                            {/* --- Table Section --- */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {tickets.data.map((ticket) => (
                                        <tr key={ticket.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3 text-indigo-700 text-xs font-bold uppercase">
                                                        {ticket.user?.name.charAt(0) || '?'}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{ticket.user?.name || 'Unknown User'}</div>
                                                        <div className="text-sm text-gray-500">{ticket.user?.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 font-medium truncate w-48" title={ticket.subject}>
                                                    {ticket.subject}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-xs text-gray-500">Cat: {ticket.category}</span>
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium w-fit ${getPriorityColor(ticket.priority)}`}>
                                                            {ticket.priority}
                                                        </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                                                        {ticket.status}
                                                    </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(ticket.created_at).toLocaleDateString('en-GB')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-2">
                                                    {/* Status Update Dropdown (Copied style from your reference) */}
                                                    <select
                                                        className="text-xs border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-1 cursor-pointer"
                                                        value={ticket.status}
                                                        onChange={(e) => handleTicketStatusChange(ticket, e.target.value)}
                                                    >
                                                        {statuses.map((s) => (
                                                            <option key={s} value={s}>{s}</option>
                                                        ))}
                                                    </select>

                                                    <button
                                                        onClick={() => openModal(ticket)}
                                                        className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-semibold shadow-sm transition"
                                                    >
                                                        View
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {tickets.data.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                                No support tickets found.
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>

                            {/* --- Pagination --- */}
                            <div className="mt-4 flex flex-wrap gap-1">
                                {tickets.links.map((link, index) => {
                                    const baseClasses = "px-3 py-1 border rounded text-sm transition-colors duration-150";
                                    const activeClasses = "bg-indigo-600 text-white border-indigo-600";
                                    const inactiveClasses = "bg-white text-gray-700 border-gray-300 hover:bg-gray-50";
                                    const disabledClasses = "text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed";

                                    if (link.url) {
                                        return (
                                            <Link
                                                key={index}
                                                href={link.url}
                                                className={`${baseClasses} ${link.active ? activeClasses : inactiveClasses}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                                preserveState
                                                preserveScroll
                                            />
                                        );
                                    }
                                    return <span key={index} className={`${baseClasses} ${disabledClasses}`} dangerouslySetInnerHTML={{ __html: link.label }} />;
                                })}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* --- Details Modal --- */}
            {isModalOpen && selectedTicket && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeModal}></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                                Ticket #{selectedTicket.id}
                                            </h3>
                                            <div className="flex gap-2">
                                                <select
                                                    className="text-xs border-gray-300 rounded-md shadow-sm py-1"
                                                    value={selectedTicket.status}
                                                    onChange={(e) => {
                                                        const newStatus = e.target.value;
                                                        handleTicketStatusChange(selectedTicket, newStatus);
                                                        // Update local modal state immediately for visual feedback
                                                        setSelectedTicket(prev => ({ ...prev, status: newStatus }));
                                                    }}
                                                >
                                                    {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                                                </select>
                                                <span className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedTicket.status)}`}>
                                                    {selectedTicket.status}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Modal Content Details... */}
                                        <div className="mt-4 border-t border-gray-100 pt-4 space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase font-bold">User</p>
                                                    <p className="text-sm text-gray-900">{selectedTicket.user?.name}</p>
                                                    <p className="text-xs text-gray-400">{selectedTicket.user?.email}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase font-bold">Submitted</p>
                                                    <p className="text-sm text-gray-900">{new Date(selectedTicket.created_at).toLocaleString('en-GB')}</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase font-bold">Category</p>
                                                    <p className="text-sm text-gray-900">{selectedTicket.category}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase font-bold">Priority</p>
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1 ${getPriorityColor(selectedTicket.priority)}`}>
                                                        {selectedTicket.priority}
                                                    </span>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-500 uppercase font-bold">Subject</p>
                                                <p className="text-sm text-gray-900 font-medium">{selectedTicket.subject}</p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Message Description</p>
                                                <div className="bg-gray-50 p-4 rounded text-sm text-gray-800 whitespace-pre-wrap border border-gray-100 max-h-60 overflow-y-auto">
                                                    {selectedTicket.message}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button type="button" onClick={closeModal} className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
