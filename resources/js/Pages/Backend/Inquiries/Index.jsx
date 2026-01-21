import React, { useState, useCallback } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout'; // Ensure this matches your layout path
import { debounce } from 'lodash';

export default function Index({ auth, inquiries, filters }) {
    // --- State: Filters & Search ---
    const [params, setParams] = useState({
        search: filters.search || '',
    });

    // --- State: Modal ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInquiry, setSelectedInquiry] = useState(null);

    // --- Logic: Debounced Search ---
    const debouncedSearch = useCallback(
        debounce((searchQuery) => {
            router.get(route('inquiries.index'),
                { search: searchQuery },
                { preserveState: true, preserveScroll: true, replace: true }
            );
        }, 300),
        []
    );

    const onSearchChange = (e) => {
        const newValue = e.target.value;
        setParams(prev => ({ ...prev, search: newValue }));
        debouncedSearch(newValue);
    };

    // --- Logic: Modal Actions ---
    const openModal = (inquiry) => {
        setSelectedInquiry(inquiry);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedInquiry(null), 200);
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Enterprise Inquiries</h2>}
        >
            <Head title="Inquiries" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            {/* --- Filters Section (Matched Design) --- */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                <h3 className="text-lg font-medium">Inquiry List</h3>

                                {/* Wrapper for Inputs + Clear Link */}
                                <div className="flex flex-col items-end w-full md:w-auto gap-2">

                                    {/* Inputs Row */}
                                    <div className="flex gap-2 w-full md:w-auto">
                                        <input
                                            type="text"
                                            placeholder="Search company, name, email..."
                                            className="border-gray-300 rounded-md shadow-sm w-full md:w-64"
                                            value={params.search}
                                            onChange={onSearchChange}
                                        />
                                    </div>

                                    {/* Clear Filters Link */}
                                    {params.search && (
                                        <Link
                                            href={route('inquiries.index')}
                                            className="text-xs text-gray-500 hover:text-gray-800 underline"
                                            onClick={() => setParams({ search: '' })}
                                        >
                                            Clear Filters
                                        </Link>
                                    )}
                                </div>
                            </div>

                            {/* --- Table Section (Matched Design) --- */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {inquiries.data.map((inquiry) => (
                                        <tr key={inquiry.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {/* Avatar Placeholder using Company Initial */}
                                                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3 text-indigo-700 text-xs font-bold uppercase">
                                                        {inquiry.company.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{inquiry.company}</div>
                                                        <div className="text-sm text-gray-500">{inquiry.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{inquiry.contact_name}</div>
                                                <div className="text-sm text-gray-500">Size: {inquiry.team_size}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(inquiry.created_at).toLocaleDateString('en-GB')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => openModal(inquiry)}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {inquiries.data.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                                No inquiries found.
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>

                            {/* --- Pagination (Matched Design) --- */}
                            <div className="mt-4 flex flex-wrap gap-1">
                                {inquiries.links.map((link, index) => {
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

            {/* --- Details Modal (Functionality Preserved) --- */}
            {isModalOpen && selectedInquiry && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            aria-hidden="true"
                            onClick={closeModal}
                        ></div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            Inquiry from {selectedInquiry.company}
                                        </h3>
                                        <div className="mt-4 border-t border-gray-100 pt-4 space-y-3">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase font-bold">Contact Name</p>
                                                    <p className="text-sm text-gray-900">{selectedInquiry.contact_name}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase font-bold">Email</p>
                                                    <p className="text-sm text-gray-900">{selectedInquiry.email}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase font-bold">Team Size</p>
                                                    <p className="text-sm text-gray-900">{selectedInquiry.team_size}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase font-bold">Budget</p>
                                                    <p className="text-sm text-gray-900">{selectedInquiry.budget || 'Not specified'}</p>
                                                </div>
                                            </div>

                                            <div className="pt-2">
                                                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Requirements</p>
                                                <div className="bg-gray-50 p-3 rounded text-sm text-gray-800 whitespace-pre-wrap border border-gray-100">
                                                    {selectedInquiry.requirements}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
