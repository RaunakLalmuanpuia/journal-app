import React from "react";
import { Head, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputLabel from "@/Components/Ui/InputLabel";
import TextInput from "@/Components/Ui/TextInput";
import PrimaryButton from "@/Components/Ui/PrimaryButton";
import InputError from "@/Components/Ui/InputError";

// Icons & Animations
import {
    Mail,
    MapPin,
    Clock,
    Send,
    Headphones,
    FileText,
    Users,
    Settings,
    Zap,
    BookOpen,
    MessageSquare,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ContactUsPage() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        subject: "",
        message: "",
        category: "",
        priority: "medium",
    });

    const supportCategories = [
        { value: "technical", label: "Technical Issue" },
        { value: "billing", label: "Billing & Payments" },
        { value: "account", label: "Account Management" },
        { value: "feature", label: "Feature Request" },
        { value: "general", label: "General Inquiry" },
        { value: "tutorial", label: "Tutorial & Guide" },
    ];

    const priorityLevels = [
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" },
        { value: "urgent", label: "Urgent" },
    ];

    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("contact.store"), {
            onSuccess: () => reset(),
        });
    };

    const contactMethods = [
        {
            title: "Email",
            icon: Mail,
            description: "Write to us anytime",
            contact: "contact@eightsis.com",
            responseTime: "We reply within 24 hours",
            color: "bg-blue-50 border-blue-200 text-blue-800",
        },
    ];

    const officeLocations = [
        {
            title: "Registered Office",
            address: "2nd Floor, JL Building, Mission Veng, Aizawl, Mizoram 796005",
            hours: "Monday - Friday: 9 AM - 6 PM IST",
        },
    ];

    return (
        <>
            <Head title="Contact Us" />

            <GuestLayout>
                <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 font-sans">

                    {/* Hero Section */}
                    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            <motion.div {...fadeInUp}>
                                <div className="flex justify-center mb-6">
                                    <Headphones className="w-16 h-16 text-blue-600" />
                                </div>
                                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
                                    Contact Us
                                </h1>
                                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                    You may contact us using the information below. Our team will be
                                    happy to assist you.
                                </p>
                            </motion.div>
                        </div>
                    </section>

                    {/* Contact Methods */}
                    <section className="pb-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="mb-12"
                            >
                                <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
                                    Get in Touch
                                </h2>
                                <p className="text-gray-600 text-center mb-8">
                                    Reach us directly through the following methods:
                                </p>
                            </motion.div>

                            <div className="flex justify-center">
                                {contactMethods.map((method, index) => (
                                    <motion.div
                                        key={method.title}
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                        className="w-full max-w-lg"
                                    >
                                        {/* Custom Card Implementation */}
                                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow h-full w-full overflow-hidden">
                                            <div className="p-6 text-center">
                                                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                                    <method.icon className="w-8 h-8 text-blue-600" />
                                                </div>
                                                <h3 className="text-xl font-semibold text-gray-900">
                                                    {method.title}
                                                </h3>
                                            </div>
                                            <div className="p-6 pt-0 text-center">
                                                <p className="text-gray-600 mb-3">{method.description}</p>
                                                <p className="font-semibold text-gray-900 mb-2">
                                                    {method.contact}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {method.responseTime}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Contact Form */}
                    <section className="pb-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            >
                                {/* Custom Card Implementation */}
                                <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
                                    <div className="p-6 space-y-1.5">
                                        <h3 className="flex items-center space-x-3 text-2xl font-semibold text-gray-900">
                                            <Send className="w-6 h-6 text-blue-600" />
                                            <span>Send us a Message</span>
                                        </h3>
                                        <p className="text-gray-600 mt-2">
                                            Fill out the form below and we'll get back to you within 24 hours.
                                        </p>
                                    </div>
                                    <div className="p-6 pt-0">
                                        <form onSubmit={submit} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <InputLabel htmlFor="name" value="Full Name *" />
                                                    <TextInput
                                                        id="name"
                                                        name="name"
                                                        value={data.name}
                                                        onChange={(e) => setData("name", e.target.value)}
                                                        placeholder="Your full name"
                                                        className="mt-2 block w-full h-12"
                                                        isFocused
                                                    />
                                                    <InputError message={errors.name} className="mt-2" />
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="email" value="Email Address *" />
                                                    <TextInput
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        value={data.email}
                                                        onChange={(e) => setData("email", e.target.value)}
                                                        placeholder="your@email.com"
                                                        className="mt-2 block w-full h-12"
                                                    />
                                                    <InputError message={errors.email} className="mt-2" />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <InputLabel htmlFor="category" value="Category" />
                                                    <div className="mt-2">
                                                        {/* Standard Styled Select */}
                                                        <select
                                                            id="category"
                                                            value={data.category}
                                                            onChange={(e) => setData("category", e.target.value)}
                                                            className="h-12 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                        >
                                                            <option value="" disabled>Select a category</option>
                                                            {supportCategories.map((cat) => (
                                                                <option key={cat.value} value={cat.value}>
                                                                    {cat.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="priority" value="Priority" />
                                                    <div className="mt-2">
                                                        {/* Standard Styled Select */}
                                                        <select
                                                            id="priority"
                                                            value={data.priority}
                                                            onChange={(e) => setData("priority", e.target.value)}
                                                            className="h-12 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
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
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="subject" value="Subject *" />
                                                <TextInput
                                                    id="subject"
                                                    name="subject"
                                                    value={data.subject}
                                                    onChange={(e) => setData("subject", e.target.value)}
                                                    placeholder="Brief description of your inquiry"
                                                    className="mt-2 block w-full h-12"
                                                />
                                                <InputError message={errors.subject} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="message" value="Message *" />
                                                {/* Standard Styled Textarea */}
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    value={data.message}
                                                    onChange={(e) => setData("message", e.target.value)}
                                                    placeholder="Please provide details about your inquiry..."
                                                    rows={6}
                                                    className="mt-2 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                />
                                                <InputError message={errors.message} className="mt-2" />
                                            </div>

                                            <PrimaryButton
                                                className="w-full h-12 justify-center text-base font-semibold"
                                                disabled={processing}
                                            >
                                                {processing ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                                        Sending Message...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="w-5 h-5 mr-2" />
                                                        Send Message
                                                    </>
                                                )}
                                            </PrimaryButton>
                                        </form>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Office Locations */}
                    <section className="pb-20 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                                className="mb-8"
                            >
                                <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
                                    Our Office
                                </h2>
                                <p className="text-gray-600 text-center">
                                    Visit us at our registered office location
                                </p>
                            </motion.div>

                            <div className="flex justify-center">
                                {officeLocations.map((location, index) => (
                                    <motion.div
                                        key={location.title}
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                                        className="w-full max-w-lg"
                                    >
                                        {/* Custom Card Implementation */}
                                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
                                            <div className="p-6">
                                                <h3 className="flex items-center space-x-3 text-xl font-semibold text-gray-900">
                                                    <MapPin className="w-5 h-5 text-blue-600" />
                                                    <span>{location.title}</span>
                                                </h3>
                                            </div>
                                            <div className="p-6 pt-0">
                                                <p className="text-gray-700 mb-3">{location.address}</p>
                                                <div className="flex items-center space-x-2 text-gray-600">
                                                    <Clock className="w-4 h-4" />
                                                    <span className="text-sm">{location.hours}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </GuestLayout>
        </>
    );
}
