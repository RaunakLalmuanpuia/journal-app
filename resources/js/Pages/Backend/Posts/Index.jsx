import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout.jsx';
import { Head, useForm, router } from '@inertiajs/react';
import Modal from '@/Components/Ui/Modal';
import PrimaryButton from '@/Components/Ui/PrimaryButton';
import PostForm from './Partials/PostForm'; // Your Editor Component

export default function PostIndex({ auth, posts }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPostId, setCurrentPostId] = useState(null);

    // Initial State
    const initialState = {
        title: '',
        subtitle: '',
        category: '',
        status: 'draft',
        description: '',
        content: '', // Quill writes to this string
        featured_image: null,
        is_featured: false,
        tags: [],
        seo_title: '',
        seo_description: '',
        seo_keywords: [],
        _method: 'POST'
    };

    // 1. Added 'transform' to the hook destructuring
    const { data, setData, post, processing, errors, reset, clearErrors, transform } = useForm(initialState);

    const openCreateModal = () => {
        setIsEditing(false);
        setCurrentPostId(null);
        reset();
        clearErrors();
        setData(initialState);
        setIsModalOpen(true);
    };

    const openEditModal = (postData) => {
        setIsEditing(true);
        setCurrentPostId(postData.id);
        clearErrors();

        // 2. Setup Edit Data
        // If the post has a 'body' array from the DB, we must flatten it back to a single HTML string
        // so the Editor can display it.
        let existingContent = '';
        if (Array.isArray(postData.body)) {
            // Find the text block to populate the editor
            const textBlock = postData.body.find(b => b.type === 'text');
            existingContent = textBlock ? textBlock.content : '';
        } else if (typeof postData.content === 'string') {
            existingContent = postData.content;
        }

        setData({
            ...initialState,
            ...postData,
            content: existingContent, // Load the HTML string into Quill
            tags: postData.tags || [],
            seo_keywords: postData.seo_keywords || [],
            featured_image: typeof postData.featured_image === 'string' ? postData.featured_image : null,
            _method: 'PUT'
        });

        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const deletePost = (id) => {
        if (confirm('Are you sure you want to delete this post?')) {
            router.delete(route('posts.destroy', id));
        }
    };

    // 3. The Submit Handler
    const handleEditorSubmit = () => {
        transform((data) => {
            return {
                ...data,
                // 1. DO NOT change this to null. Send the File object or the URL string.
                featured_image: data.featured_image,

                // 2. IMPORTANT: If we are editing, we must spoof the method.
                // Browser file uploads ONLY work with POST. We simulate PUT for Laravel.
                _method: isEditing ? 'PUT' : undefined,

                // 3. Reconstruct the body for the JSON column
                body: [
                    {
                        id: 'section-main',
                        type: 'text',
                        content: data.content
                    }
                ]
            };
        });

        const options = {
            onSuccess: closeModal,
            forceFormData: true, // 4. CRITICAL: This forces the data to be sent as multipart/form-data
        };

        if (isEditing) {
            // 5. CRITICAL: Use post() even for updates, pointing to the update route
            // The _method: 'PUT' in the payload tells Laravel to treat it as an update.
            post(route('posts.update', currentPostId), options);
        } else {
            post(route('posts.store'), options);
        }
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Posts</h2>}
        >
            <Head title="Posts" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">

                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-medium text-gray-900">All Posts</h3>
                            <PrimaryButton onClick={openCreateModal}>
                                + Create New Post
                            </PrimaryButton>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {posts.data.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{item.title}</div>
                                            <div className="text-xs text-gray-500">{item.subtitle}</div>
                                            {item.is_featured && <span className="text-[10px] bg-yellow-100 text-yellow-800 px-2 rounded-full">Featured</span>}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                {item.category || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                item.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button onClick={() => openEditModal(item)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                            <button onClick={() => deletePost(item.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                                {posts.data.length === 0 && (
                                    <tr><td colSpan="4" className="px-6 py-4 text-center text-gray-500">No posts found.</td></tr>
                                )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="mt-4">
                            {posts.links.map((link, k) => (
                                <button
                                    key={k}
                                    onClick={() => link.url && router.get(link.url)}
                                    disabled={!link.url || link.active}
                                    className={`px-3 py-1 mr-1 border rounded text-sm ${
                                        link.active ? 'bg-gray-800 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="7xl">
                <div className="h-[90vh] w-full">
                    <PostForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        onClose={closeModal}
                        onSubmit={handleEditorSubmit} // Pass the handler that includes the transform logic
                    />
                </div>
            </Modal>
        </AdminLayout>
    );
}
