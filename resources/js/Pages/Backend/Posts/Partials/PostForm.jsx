import React, { useState, useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import InputLabel from '@/Components/Ui/InputLabel';
import TextInput from '@/Components/Ui/TextInput';
import {
    X, Eye, EyeOff, Save, Loader2, Upload, Plus, Type, Code,
    ArrowLeft, User, Calendar, Clock, Heart, Share2, Search, Star
} from 'lucide-react';

// --- UI Helpers ---
const Card = ({ children, className = "" }) => (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
        {children}
    </div>
);
const CardHeader = ({ children, className = "" }) => (
    <div className={`px-6 py-4 border-b border-gray-100 ${className}`}>
        {children}
    </div>
);
const CardTitle = ({ children, className = "" }) => (
    <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
        {children}
    </h3>
);
const CardContent = ({ children, className = "" }) => (
    <div className={`p-6 ${className}`}>
        {children}
    </div>
);
const Badge = ({ children, onRemove }) => (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mr-2 mb-2">
        {children}
        {onRemove && (
            <button type="button" onClick={onRemove} className="ml-1.5 inline-flex items-center justify-center text-indigo-400 hover:text-indigo-600 focus:outline-none">
                <X className="w-3 h-3" />
            </button>
        )}
    </span>
);

// --- Typography Classes for Preview ---
const TYPOGRAPHY_CLASSES = "text-gray-800 leading-relaxed [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:text-gray-900 [&>h1]:mb-6 [&>h1]:mt-8 [&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:text-gray-900 [&>h2]:mb-5 [&>h2]:mt-7 [&>h3]:text-2xl [&>h3]:font-semibold [&>h3]:text-gray-900 [&>h3]:mb-4 [&>h3]:mt-6 [&>h4]:text-xl [&>h4]:font-medium [&>h4]:text-gray-900 [&>h4]:mb-3 [&>h4]:mt-5 [&>h5]:text-lg [&>h5]:font-medium [&>h5]:text-gray-900 [&>h5]:mb-3 [&>h5]:mt-4 [&>h6]:text-base [&>h6]:font-medium [&>h6]:text-gray-900 [&>h6]:mb-2 [&>h6]:mt-3 [&>p]:mb-4 [&>p]:leading-relaxed [&>ul]:mb-4 [&>ul]:ml-6 [&>ul]:list-disc [&>ol]:mb-4 [&>ol]:ml-6 [&>ol]:list-decimal [&>li]:mb-2 [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:bg-blue-50 [&>blockquote]:py-4 [&>blockquote]:px-6 [&>blockquote]:my-6 [&>blockquote]:italic [&>code]:bg-gray-100 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm [&>code]:font-mono [&>pre]:bg-gray-900 [&>pre]:text-gray-100 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:my-6 [&>strong]:font-semibold [&>em]:italic [&>u]:underline";

const categories = ["Technology", "Business", "Design", "Marketing", "Development", "Tutorials", "News", "Opinion", "Case Study", "Research"];

export default function PostForm({ data, setData, errors, processing, onClose, onSubmit }) {
    const [imageInputType, setImageInputType] = useState('file');
    const [tagInput, setTagInput] = useState('');
    const [seoKeywordInput, setSeoKeywordInput] = useState('');

    const [previewMode, setPreviewMode] = useState(false);
    const [showSourceCode, setShowSourceCode] = useState(false);

    const readTime = useMemo(() => {
        const text = data.content?.replace(/<[^>]*>/g, '') || '';
        const words = text.trim().split(/\s+/).length;
        return Math.ceil(words / 200);
    }, [data.content]);

    const modules = useMemo(() => ({
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['link', 'image', 'video'],
            ['clean']
        ],
    }), []);

    // --- Handlers ---
    const addTag = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            const newTags = [...(data.tags || []), tagInput.trim()];
            setData('tags', newTags);
            setTagInput('');
        }
    };
    const removeTag = (tag) => setData('tags', data.tags.filter(t => t !== tag));

    const addSeo = (e) => {
        if(e.key === 'Enter' && seoKeywordInput.trim()){
            e.preventDefault();
            setData('seo_keywords', [...(data.seo_keywords||[]), seoKeywordInput.trim()]);
            setSeoKeywordInput('');
        }
    };
    const removeSeo = (k) => setData('seo_keywords', data.seo_keywords.filter(i=>i!==k));

    // Create a ref for the hidden file input
    const fileInputRef = useRef(null);

    // Helper to handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('featured_image', file);
        }
    };

    const handleSubmit = (status) => {
        setData('status', status);
        setTimeout(() => { if (onSubmit) onSubmit(); }, 100);
    };

    return (
        <div className="flex flex-col h-full bg-white sm:rounded-lg overflow-hidden">
            {/* --- HEADER --- */}
            <div className="px-6 py-4 border-b bg-gray-50/60 flex-none">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{data.id ? "Edit Post" : "Create Post"}</h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition"><X className="w-5 h-5 text-gray-500" /></button>
                </div>
            </div>

            {/* --- BODY --- */}
            <div className="flex-1 overflow-y-auto bg-gray-50/30">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">

                    {/* LEFT COLUMN (Main Content) */}
                    <div className="lg:col-span-8 space-y-6">

                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-800">Post Content</h3>
                            <button
                                type="button"
                                onClick={() => setPreviewMode(!previewMode)}
                                className={`flex items-center text-sm font-medium transition px-3 py-1.5 rounded-md ${previewMode ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-100'}`}
                            >
                                {previewMode ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                                {previewMode ? "Exit Preview" : "Preview"}
                            </button>
                        </div>

                        {!previewMode ? (
                            <>
                                <Card>
                                    <CardHeader><CardTitle>Basic Details</CardTitle></CardHeader>
                                    <CardContent className="space-y-6">
                                        <div>
                                            <InputLabel value="Title *" className="mb-1" />
                                            <TextInput value={data.title} onChange={e => setData('title', e.target.value)} className="w-full text-lg font-medium" placeholder="Enter post title" />
                                            {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
                                        </div>
                                        <div>
                                            <InputLabel value="Subtitle" className="mb-1" />
                                            <TextInput value={data.subtitle || ''} onChange={e => setData('subtitle', e.target.value)} className="w-full" placeholder="Enter subtitle (optional)" />
                                        </div>
                                        <div>
                                            <InputLabel value="Description (Excerpt)" className="mb-1" />
                                            <textarea
                                                value={data.description || ''}
                                                onChange={e => setData('description', e.target.value)}
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm h-24"
                                                placeholder="Short description for lists and SEO..."
                                            />
                                        </div>
                                        <div>
                                            <InputLabel value="Featured Image" className="mb-1" />

                                            {/* Hidden File Input */}
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />

                                            <div className="flex gap-2">
                                                {/* Text Input for URL or File Name display */}
                                                <TextInput
                                                    value={
                                                        // If it's a File object, show the name. If string, show URL.
                                                        data.featured_image instanceof File
                                                            ? data.featured_image.name
                                                            : (data.featured_image || '')
                                                    }
                                                    onChange={e => setData('featured_image', e.target.value)}
                                                    className="flex-1"
                                                    placeholder="https://... or upload a file"
                                                    // Disable typing if a file is selected to avoid confusion
                                                    disabled={data.featured_image instanceof File}
                                                />

                                                {/* Upload Button triggers the hidden input */}
                                                <button
                                                    type="button" // Important so it doesn't submit form
                                                    onClick={() => fileInputRef.current.click()}
                                                    className="px-4 border rounded hover:bg-gray-50 flex items-center justify-center"
                                                >
                                                    <Upload className="w-4 h-4" />
                                                </button>

                                                {/* Optional: Clear button if an image is selected */}
                                                {data.featured_image && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setData('featured_image', null)}
                                                        className="px-3 border rounded border-red-200 hover:bg-red-50 text-red-500"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>

                                            {/* Preview Logic */}
                                            <div className="mt-2">
                                                {/* Preview if it's a URL String */}
                                                {typeof data.featured_image === 'string' && data.featured_image.startsWith('http') && (
                                                    <img src={data.featured_image} alt="Preview" className="h-32 rounded object-cover border" />
                                                )}

                                                {/* Preview if it's a newly uploaded File object */}
                                                {data.featured_image instanceof File && (
                                                    <img src={URL.createObjectURL(data.featured_image)} alt="New File Preview" className="h-32 rounded object-cover border" />
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex justify-between items-center">
                                        <CardTitle>Content Body</CardTitle>
                                        <button onClick={() => setShowSourceCode(!showSourceCode)} className="text-xs flex items-center bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition">
                                            {showSourceCode ? <><Type className="w-3 h-3 mr-1" /> Visual Editor</> : <><Code className="w-3 h-3 mr-1" /> Source Code</>}
                                        </button>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-[500px] mb-8">
                                            {showSourceCode ? (
                                                <textarea className="w-full h-[450px] p-4 bg-gray-900 text-gray-100 font-mono text-sm rounded" value={data.content || ''} onChange={e => setData('content', e.target.value)} />
                                            ) : (
                                                <ReactQuill theme="snow" value={data.content || ''} onChange={v => setData('content', v)} modules={modules} className="h-[450px]" />
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </>
                        ) : (
                            // === PREVIEW MODE ===
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden min-h-[80vh]">
                                <article className="relative max-w-3xl mx-auto px-6 py-12">
                                    {/* Mock Back Button */}
                                    <div className="mb-8 opacity-50 cursor-not-allowed">
                                        <span className="inline-flex items-center text-gray-500"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog</span>
                                    </div>
                                    {/* Header */}
                                    <header className="mb-10">
                                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">{data.title || "Untitled Post"}</h1>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                                            <div className="flex items-center"><User className="w-4 h-4 mr-1" /> <span>Admin</span></div>
                                            <div className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> <span>Today</span></div>
                                            <div className="flex items-center"><Clock className="w-4 h-4 mr-1" /> <span>{readTime} min read</span></div>
                                        </div>
                                        {data.subtitle && <p className="text-xl text-gray-700 leading-relaxed mb-4">{data.subtitle}</p>}
                                        {data.description && <p className="text-base text-gray-500 leading-relaxed">{data.description}</p>}
                                    </header>
                                    {/* Featured Image */}
                                    {typeof data.featured_image === 'string' && data.featured_image.startsWith('http') && (
                                        <div className="mb-10"><img src={data.featured_image} alt="Featured" className="object-cover w-full h-auto rounded-lg" /></div>
                                    )}
                                    {/* Content */}
                                    <div className={TYPOGRAPHY_CLASSES} dangerouslySetInnerHTML={{ __html: data.content }} />
                                    {/* Tags */}
                                    {data.tags && data.tags.length > 0 && (
                                        <div className="mt-14 pt-10 border-t border-gray-200">
                                            <div className="flex flex-wrap gap-2">{data.tags.map((tag, i) => (<span key={i} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">#{tag}</span>))}</div>
                                        </div>
                                    )}
                                </article>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN (Sidebar) */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* Publishing Settings */}
                        <Card>
                            <CardHeader><CardTitle>Publishing</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <InputLabel value="Status" className="mb-1"/>
                                    <select value={data.status} onChange={e => setData('status', e.target.value)} className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md text-sm">
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                </div>
                                {/* CHANGED: Category is now a TextInput instead of a select dropdown */}
                                <div>
                                    <InputLabel value="Category" className="mb-1"/>
                                    <TextInput
                                        value={data.category || ''}
                                        onChange={e => setData('category', e.target.value)}
                                        className="w-full text-sm"
                                        placeholder="e.g. Technology, Lifestyle..."
                                    />
                                    {errors.category && <p className="text-sm text-red-600 mt-1">{errors.category}</p>}
                                </div>
                                {/*<div>*/}
                                {/*    <InputLabel value="Category" className="mb-1"/>*/}
                                {/*    <select value={data.category} onChange={e => setData('category', e.target.value)} className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md text-sm">*/}
                                {/*        <option value="">Select Category...</option>*/}
                                {/*        {categories.map(c => <option key={c} value={c}>{c}</option>)}*/}
                                {/*    </select>*/}
                                {/*</div>*/}
                                <div className="flex items-center space-x-2 pt-2 border-t mt-2">
                                    <input
                                        type="checkbox"
                                        id="is_featured"
                                        checked={data.is_featured}
                                        onChange={e => setData('is_featured', e.target.checked)}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                    />
                                    <label htmlFor="is_featured" className="text-sm font-medium text-gray-700 flex items-center cursor-pointer">
                                        <Star className="w-4 h-4 mr-1 text-yellow-500" /> Mark as Featured
                                    </label>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tags */}
                        <Card>
                            <CardHeader><CardTitle>Tags</CardTitle></CardHeader>
                            <CardContent>
                                <div className="flex gap-2 mb-2">
                                    <TextInput value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={addTag} placeholder="Add tag + Enter" className="flex-1 text-sm h-9" />
                                    <button onClick={() => addTag({key:'Enter', preventDefault:()=>{}})} className="bg-gray-100 px-3 rounded hover:bg-gray-200"><Plus className="w-4 h-4"/></button>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {data.tags?.map(t => <Badge key={t} onRemove={() => removeTag(t)}>{t}</Badge>)}
                                    {(!data.tags || data.tags.length === 0) && <span className="text-xs text-gray-400 italic">No tags</span>}
                                </div>
                            </CardContent>
                        </Card>

                        {/* SEO Settings (New) */}
                        {/*<Card>*/}
                        {/*    <CardHeader className="flex items-center gap-2">*/}
                        {/*        <Search className="w-4 h-4 text-gray-500" />*/}
                        {/*        <CardTitle>SEO Settings</CardTitle>*/}
                        {/*    </CardHeader>*/}
                        {/*    <CardContent className="space-y-4">*/}
                        {/*        <div>*/}
                        {/*            <InputLabel value="SEO Title" className="mb-1 text-xs uppercase text-gray-500" />*/}
                        {/*            <TextInput value={data.seo_title || ''} onChange={e => setData('seo_title', e.target.value)} className="w-full text-sm" placeholder="Meta Title" />*/}
                        {/*        </div>*/}
                        {/*        <div>*/}
                        {/*            <InputLabel value="SEO Description" className="mb-1 text-xs uppercase text-gray-500" />*/}
                        {/*            <textarea*/}
                        {/*                value={data.seo_description || ''}*/}
                        {/*                onChange={e => setData('seo_description', e.target.value)}*/}
                        {/*                className="w-full border-gray-300 rounded-md text-sm h-20"*/}
                        {/*                placeholder="Meta Description"*/}
                        {/*            />*/}
                        {/*        </div>*/}
                        {/*        <div>*/}
                        {/*            <InputLabel value="SEO Keywords" className="mb-1 text-xs uppercase text-gray-500" />*/}
                        {/*            <div className="flex gap-2 mb-2">*/}
                        {/*                <TextInput value={seoKeywordInput} onChange={e => setSeoKeywordInput(e.target.value)} onKeyDown={addSeo} placeholder="Add keyword..." className="flex-1 text-sm h-9" />*/}
                        {/*                <button onClick={() => addSeo({key:'Enter', preventDefault:()=>{}})} className="bg-gray-100 px-3 rounded hover:bg-gray-200"><Plus className="w-4 h-4"/></button>*/}
                        {/*            </div>*/}
                        {/*            <div className="flex flex-wrap gap-1">*/}
                        {/*                {data.seo_keywords?.map(k => <Badge key={k} onRemove={() => removeSeo(k)}>{k}</Badge>)}*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </CardContent>*/}
                        {/*</Card>*/}
                    </div>
                </div>
            </div>

            {/* --- FOOTER --- */}
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-between items-center flex-none">
                <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition">Cancel</button>
                <div className="flex gap-2">
                    <button onClick={() => handleSubmit('draft')} disabled={processing} className="px-4 py-2 border bg-white rounded flex items-center hover:bg-gray-50 transition shadow-sm">
                        {processing ? <Loader2 className="w-4 h-4 mr-2 animate-spin"/> : <Save className="w-4 h-4 mr-2"/>} Save Draft
                    </button>
                    <button onClick={() => handleSubmit('published')} disabled={processing} className="px-4 py-2 bg-blue-600 text-white rounded flex items-center hover:bg-blue-700 transition shadow-sm">
                        {processing ? <Loader2 className="w-4 h-4 mr-2 animate-spin"/> : null} {data.id ? 'Update' : 'Publish'}
                    </button>
                </div>
            </div>
        </div>
    );
}
