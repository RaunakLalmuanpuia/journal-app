import React from "react";
import UserLayout from "@/Layouts/UserLayout.jsx";
import { Head, useForm, usePage } from "@inertiajs/react";
import InputError from "@/Components/Ui/InputError";
import InputLabel from "@/Components/Ui/InputLabel";
import PrimaryButton from "@/Components/Ui/PrimaryButton";
import TextInput from "@/Components/Ui/TextInput";
import { motion, AnimatePresence } from "framer-motion";
import {
    HelpCircle,
    MessageSquare,
    Mail,
    FileText,
    BookOpen,
    Users,
    Settings,
    Zap,
    Send,
    CheckCircle,
    X
} from "lucide-react";

export default function HelpSupportPage({ auth }) {
    // Inertia Form Helper
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        subject: "",
        category: "",
        priority: "",
        message: "",
        name: auth.user.name,
        email: auth.user.email,
    });

    const supportCategories = [
        { value: "technical", label: "Technical Issue", icon: Settings },
        { value: "billing", label: "Billing & Payments", icon: FileText },
        { value: "account", label: "Account Management", icon: Users },
        { value: "feature", label: "Feature Request", icon: Zap },
        { value: "general", label: "General Inquiry", icon: MessageSquare },
        { value: "tutorial", label: "Tutorial & Guide", icon: BookOpen },
    ];

    const priorityLevels = [
        { value: "low", label: "Low", color: "bg-gray-100 text-gray-700" },
        { value: "medium", label: "Medium", color: "bg-blue-100 text-blue-700" },
        { value: "high", label: "High", color: "bg-orange-100 text-orange-700" },
        { value: "urgent", label: "Urgent", color: "bg-red-100 text-red-700" },
    ];

    const commonQuestions = [
        {
            question: "How do I create my KeyTag Journal?",
            answer: "You can create your KeyTag Journal by following our step-by-step tutorial guide available in your dashboard.",
            category: "Tutorial",
        },
        {
            question: "How do I duplicate Google Sheets templates?",
            answer: "Use the 'Duplicate Template' feature in your products section to copy our pre-built templates to your Google Drive.",
            category: "Technical",
        },
        {
            question: "What's included in the Pro plan?",
            answer: "The Pro plan includes pre-built templates, advanced automation, priority support, and regular updates.",
            category: "Billing",
        },
        {
            question: "How do I update my profile information?",
            answer: "Go to your Profile page in the dashboard to update your personal information and preferences.",
            category: "Account",
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("support.store"), {
            preserveScroll: true,
            onSuccess: () => {
                reset("subject", "category", "priority", "message");
            },
        });
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
    };

    return (
        <UserLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Help & Support
                </h2>
            }
        >
            <Head title="Help & Support" />

            {/* Notification Toast - Fixed Position */}
            <AnimatePresence>
                {recentlySuccessful && (
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-24 right-4 z-50 w-full max-w-sm bg-white rounded-lg shadow-xl border-l-4 border-[#12b5e2] overflow-hidden"
                    >
                        <div className="p-4 flex items-start">
                            <div className="flex-shrink-0">
                                <CheckCircle className="w-5 h-5 text-[#12b5e2]" />
                            </div>
                            <div className="ml-3 w-0 flex-1 pt-0.5">
                                <p className="text-sm font-medium text-gray-900">
                                    Success
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    Support ticket submitted successfully! We'll get back to you soon.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="min-h-screen bg-gray-50 pb-12">
                {/* Header Section */}
                <div className="bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                                    Help Center
                                </h1>
                                <p className="text-gray-600">
                                    Get help with KeyTag Journal or submit a support request
                                </p>
                            </div>
                            <div className="hidden md:flex items-center gap-2">
                                <div className="px-4 py-2 bg-[#12b5e2] bg-opacity-5 border border-[#12b5e2] border-opacity-20 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#12b5e2] rounded-full animate-pulse"></div>
                                        <span className="text-sm font-medium text-[#12b5e2]">
                                            Support Available
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="space-y-8">
                        {/* Contact Info Banner */}
                        <motion.div {...fadeInUp}>
                            <div className="bg-[#12b5e2] rounded-lg shadow-lg overflow-hidden">
                                <div className="p-8">
                                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="text-white text-center md:text-left">
                                            <div className="flex items-center justify-center md:justify-start mb-2">
                                                <Mail className="w-6 h-6 mr-2" />
                                                <h3 className="text-xl font-bold">
                                                    Need Help? Contact Us
                                                </h3>
                                            </div>
                                            <p className="text-blue-100 text-sm">
                                                Our support team is ready to assist you
                                            </p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-center gap-4">
                                            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                                                <div className="text-white text-center">
                                                    <div className="text-xs text-blue-100 mb-1">
                                                        Email us at
                                                    </div>
                                                    <div className="font-semibold">
                                                        contact@keytagjo.com
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                                                <div className="text-white text-center">
                                                    <div className="text-xs text-blue-100 mb-1">
                                                        Response Time
                                                    </div>
                                                    <div className="font-semibold">Within 24 hours</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            {/* Support Form Card */}
                            <motion.div {...fadeInUp}>
                                <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg hover:shadow-xl transition-shadow h-full">
                                    <div className="bg-[#12b5e2] bg-opacity-5 border-b border-[#12b5e2] border-opacity-20 px-6 py-4">
                                        <div className="flex items-center text-gray-900">
                                            <div className="w-10 h-10 bg-[#12b5e2] rounded-lg flex items-center justify-center mr-3">
                                                <HelpCircle className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <div className="text-lg font-bold">
                                                    Submit Support Request
                                                </div>
                                                <p className="text-sm text-gray-600 font-normal mt-1">
                                                    Fill out the form below and we'll get back to you
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <form onSubmit={handleSubmit} className="space-y-5">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <InputLabel value="Full Name" />
                                                    <TextInput
                                                        value={data.name}
                                                        disabled
                                                        className="mt-1 block w-full bg-gray-50 text-gray-500 cursor-not-allowed"
                                                    />
                                                </div>
                                                <div>
                                                    <InputLabel value="Email Address" />
                                                    <TextInput
                                                        value={data.email}
                                                        disabled
                                                        className="mt-1 block w-full bg-gray-50 text-gray-500 cursor-not-allowed"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="subject" value="Subject *" />
                                                <TextInput
                                                    id="subject"
                                                    value={data.subject}
                                                    onChange={(e) => setData("subject", e.target.value)}
                                                    placeholder="Brief description of your issue"
                                                    className="mt-1 block w-full focus:border-[#12b5e2] focus:ring-[#12b5e2]"
                                                    isFocused={true}
                                                />
                                                <InputError message={errors.subject} className="mt-2" />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <InputLabel htmlFor="category" value="Category *" />
                                                    <select
                                                        id="category"
                                                        value={data.category}
                                                        onChange={(e) => setData("category", e.target.value)}
                                                        className="mt-1 block w-full border-gray-300 focus:border-[#12b5e2] focus:ring-[#12b5e2] rounded-md shadow-sm"
                                                    >
                                                        <option value="" disabled>Select category</option>
                                                        {supportCategories.map((category) => (
                                                            <option key={category.value} value={category.value}>
                                                                {category.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <InputError message={errors.category} className="mt-2" />
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="priority" value="Priority" />
                                                    <select
                                                        id="priority"
                                                        value={data.priority}
                                                        onChange={(e) => setData("priority", e.target.value)}
                                                        className="mt-1 block w-full border-gray-300 focus:border-[#12b5e2] focus:ring-[#12b5e2] rounded-md shadow-sm"
                                                    >
                                                        <option value="" disabled>Select priority</option>
                                                        {priorityLevels.map((priority) => (
                                                            <option key={priority.value} value={priority.value}>
                                                                {priority.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="message" value="Message *" />
                                                <textarea
                                                    id="message"
                                                    value={data.message}
                                                    onChange={(e) => setData("message", e.target.value)}
                                                    placeholder="Please describe your issue or question in detail..."
                                                    className="mt-1 block w-full border-gray-300 focus:border-[#12b5e2] focus:ring-[#12b5e2] rounded-md shadow-sm min-h-[140px] resize-none"
                                                />
                                                <InputError message={errors.message} className="mt-2" />
                                            </div>

                                            <PrimaryButton
                                                disabled={processing}
                                                className="w-full justify-center h-12 text-base bg-[#12b5e2] hover:bg-[#0ea5d3] focus:bg-[#0ea5d3] active:bg-[#0ea5d3]"
                                            >
                                                {processing ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="w-4 h-4 mr-2" />
                                                        Submit Support Request
                                                    </>
                                                )}
                                            </PrimaryButton>
                                        </form>
                                    </div>
                                </div>
                            </motion.div>

                            {/* FAQ Card */}
                            <motion.div {...fadeInUp}>
                                <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg hover:shadow-xl transition-shadow h-fit">
                                    <div className="bg-[#12b5e2] bg-opacity-5 border-b border-[#12b5e2] border-opacity-20 px-6 py-4">
                                        <div className="flex items-center text-gray-900">
                                            <div className="w-10 h-10 bg-[#12b5e2] rounded-lg flex items-center justify-center mr-3">
                                                <FileText className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <div className="text-lg font-bold">
                                                    Frequently Asked Questions
                                                </div>
                                                <p className="text-sm text-gray-600 font-normal mt-1">
                                                    Quick answers to common questions
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 space-y-3">
                                        {commonQuestions.map((faq, index) => (
                                            <div
                                                key={index}
                                                className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <h4 className="font-semibold text-gray-900 text-sm leading-relaxed pr-2">
                                                        {faq.question}
                                                    </h4>
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#12b5e2] bg-opacity-10 text-[#12b5e2] border border-[#12b5e2] border-opacity-20 whitespace-nowrap">
                                                        {faq.category}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 text-sm leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        ))}

                                        <div className="mt-6 p-4 bg-[#12b5e2] bg-opacity-5 rounded-lg border border-[#12b5e2] border-opacity-20">
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 bg-[#12b5e2] bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <HelpCircle className="w-4 h-4 text-[#12b5e2]" />
                                                </div>
                                                <div>
                                                    <h5 className="font-semibold text-gray-800 text-sm mb-1">
                                                        Can't find what you're looking for?
                                                    </h5>
                                                    <p className="text-gray-700 text-xs leading-relaxed">
                                                        Submit a support request using the form and our
                                                        team will assist you promptly.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
