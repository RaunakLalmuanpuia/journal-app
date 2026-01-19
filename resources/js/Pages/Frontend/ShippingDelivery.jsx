import React from "react";
import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/Ui/Card";
import {
    Truck,
    Clock,
    MapPin,
    Package,
    AlertCircle,
    CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ShippingDeliveryPage() {
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
    };

    return (
        <>
            <Head title="Shipping & Delivery Policy" />

            <GuestLayout>
                <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 font-sans">

                    {/* Hero Section */}
                    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            <motion.div {...fadeInUp}>
                                <div className="flex justify-center mb-6">
                                    <Truck className="w-16 h-16 text-blue-600" />
                                </div>
                                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
                                    Shipping & Delivery Policy
                                </h1>
                                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                    Shipping is not applicable for our business. We provide digital
                                    services only; there are no physical shipments or deliveries.
                                </p>
                                <div className="text-sm text-gray-500 bg-gray-100 rounded-lg px-4 py-2 inline-block">
                                    Last updated: August 8, 2025
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Digital Service Notice */}
                    <section className="pb-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <Card className="bg-blue-50 border-blue-200 hover:shadow-lg transition-shadow mb-8">
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-3 text-2xl text-gray-900">
                                            <Package className="w-6 h-6 text-blue-600" />
                                            <span>No Shipping — Digital Service</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <p className="text-gray-700 leading-relaxed">
                                                We do not ship physical products. All access and features
                                                are delivered digitally through your account.
                                            </p>

                                            <div className="flex items-start space-x-3">
                                                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">
                                                        Instant Access
                                                    </h4>
                                                    <p className="text-gray-700 text-sm">
                                                        Access is granted immediately after successful
                                                        registration and payment.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start space-x-3">
                                                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">
                                                        Global Availability
                                                    </h4>
                                                    <p className="text-gray-700 text-sm">
                                                        Use the service from anywhere with an internet
                                                        connection.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start space-x-3">
                                                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">
                                                        Cross-Platform
                                                    </h4>
                                                    <p className="text-gray-700 text-sm">
                                                        Works on modern web browsers and mobile devices with
                                                        real-time sync.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </section>

                    {/* Service Delivery Process */}
                    <section className="pb-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="mb-8"
                            >
                                <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
                                    How You Access Our Service
                                </h2>
                                <p className="text-gray-600 text-center mb-8">
                                    Simple steps to get started — no shipping required
                                </p>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                >
                                    <Card className="hover:shadow-lg transition-shadow h-full text-center bg-white">
                                        <CardHeader>
                                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-blue-600 font-bold text-2xl">
                          1
                        </span>
                                            </div>
                                            <CardTitle className="text-xl text-gray-900">
                                                Sign Up
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-600 text-sm">
                                                Create your account quickly and securely.
                                            </p>
                                        </CardContent>
                                    </Card>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                >
                                    <Card className="hover:shadow-lg transition-shadow h-full text-center bg-white">
                                        <CardHeader>
                                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-blue-600 font-bold text-2xl">
                          2
                        </span>
                                            </div>
                                            <CardTitle className="text-xl text-gray-900">
                                                Choose Plan
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-600 text-sm">
                                                Pick a plan that suits your needs; upgrade anytime.
                                            </p>
                                        </CardContent>
                                    </Card>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                >
                                    <Card className="hover:shadow-lg transition-shadow h-full text-center bg-white">
                                        <CardHeader>
                                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-blue-600 font-bold text-2xl">
                          3
                        </span>
                                            </div>
                                            <CardTitle className="text-xl text-gray-900">
                                                Start Using
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-600 text-sm">
                                                Get instant digital access to all features after payment.
                                            </p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* Access & Availability */}
                    <section className="pb-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                            >
                                <Card className="hover:shadow-lg transition-shadow bg-white">
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-3 text-2xl text-gray-900">
                                            <Clock className="w-6 h-6 text-blue-600" />
                                            <span>Service Availability</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-3">
                                                    What to Expect
                                                </h4>
                                                <ul className="space-y-2 text-gray-700 text-sm">
                                                    <li className="flex items-center space-x-2">
                                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                                        <span>24/7 access to your account</span>
                                                    </li>
                                                    <li className="flex items-center space-x-2">
                                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                                        <span>Automatic sync across devices</span>
                                                    </li>
                                                    <li className="flex items-center space-x-2">
                                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                                        <span>No physical delivery required</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-3">
                                                    Platform Access
                                                </h4>
                                                <ul className="space-y-2 text-gray-700 text-sm">
                                                    <li className="flex items-center space-x-2">
                                                        <MapPin className="w-4 h-4 text-blue-600" />
                                                        <span>Modern web browsers</span>
                                                    </li>
                                                    <li className="flex items-center space-x-2">
                                                        <MapPin className="w-4 h-4 text-blue-600" />
                                                        <span>Mobile-friendly experience</span>
                                                    </li>
                                                    <li className="flex items-center space-x-2">
                                                        <MapPin className="w-4 h-4 text-blue-600" />
                                                        <span>Optional PWA installation</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </section>

                    {/* Support & Assistance */}
                    <section className="pb-20 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.9 }}
                            >
                                <Card className="bg-amber-50 border-amber-200">
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-3 text-xl text-gray-900">
                                            <AlertCircle className="w-5 h-5 text-amber-600" />
                                            <span>Need Assistance?</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-amber-800 text-sm mb-4">
                                            If you have trouble accessing your account or features, our
                                            team can help.
                                        </p>
                                        <ul className="space-y-1 text-amber-800 text-sm">
                                            <li>• Login or activation issues</li>
                                            <li>• Payment verification</li>
                                            <li>• Feature access questions</li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Contact Information */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.0 }}
                            >
                                <Card className="bg-blue-50 border-blue-200">
                                    <CardHeader>
                                        <CardTitle className="text-2xl text-gray-900">
                                            Get Support
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-700 mb-4">
                                            For questions about access or usage, reach out to our support
                                            team:
                                        </p>
                                        <div className="space-y-2 text-gray-700">
                                            <p>
                                                <strong>Email:</strong> contact@eightsis.com
                                            </p>
                                            <p>
                                                <strong>Response Time:</strong> Within 24 hours
                                            </p>
                                            <p>
                                                <strong>Business Hours:</strong> Monday – Friday, 9 AM – 6
                                                PM IST
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </section>
                </div>
            </GuestLayout>
        </>
    );
}
