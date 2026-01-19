import React from "react";
import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/Ui/Card";
import {
    RotateCcw,
    DollarSign,
    Clock,
    AlertCircle,
    CheckCircle,
    XCircle,
} from "lucide-react";
import { motion } from "framer-motion";

export default function CancellationRefundPage() {
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
    };

    const refundScenarios = [
        {
            title: "All Sales Final",
            icon: AlertCircle,
            eligible: false,
            description:
                "No cancellations or refunds are offered for any purchases or subscriptions. All sales are final.",
            timeframe: "Not applicable",
        },
        {
            title: "Change of Mind",
            icon: XCircle,
            eligible: false,
            description:
                "Deciding not to use the service after purchase is not eligible for cancellation or refund.",
            timeframe: "No refund available",
        },
        {
            title: "Subscription Cancellation",
            icon: RotateCcw,
            eligible: false,
            description:
                "Subscriptions cannot be canceled once activated and billed.",
            timeframe: "No cancellation accepted",
        },
        {
            title: "Billing & Service Issues",
            icon: DollarSign,
            eligible: false,
            description:
                "Payments already processed are non-refundable. For any concerns, contact support for assistance.",
            timeframe: "No refund available",
        },
    ];

    return (
        <>
            <Head title="Cancellation & Refund Policy" />

            {/* NOTE: Ensure your GuestLayout allows full width.
         If GuestLayout restricts width, this gradient might look boxed.
      */}
            <GuestLayout>
                <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 font-sans">

                    {/* Hero Section */}
                    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            <motion.div {...fadeInUp}>
                                <div className="flex justify-center mb-6">
                                    <RotateCcw className="w-16 h-16 text-blue-600" />
                                </div>
                                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
                                    Cancellation & Refund Policy
                                </h1>
                                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                    No cancellations & refunds are entertained for purchases or
                                    subscriptions.
                                </p>
                                <div className="text-sm text-gray-500 bg-gray-100 rounded-lg px-4 py-2 inline-block">
                                    Last updated: August 8, 2025
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Cancellation Process */}
                    <section className="pb-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <Card className="hover:shadow-lg transition-shadow mb-8">
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-3 text-2xl text-gray-900">
                                            <Clock className="w-6 h-6 text-blue-600" />
                                            <span>Before You Subscribe</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <div className="text-center">
                                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-blue-600 font-bold text-lg">
                              1
                            </span>
                                                    </div>
                                                    <h3 className="font-semibold text-gray-900 mb-2">
                                                        Review Plan Details
                                                    </h3>
                                                    <p className="text-gray-600 text-sm">
                                                        Please verify features and pricing before purchase.
                                                    </p>
                                                </div>
                                                <div className="text-center">
                                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-blue-600 font-bold text-lg">
                              2
                            </span>
                                                    </div>
                                                    <h3 className="font-semibold text-gray-900 mb-2">
                                                        Confirm Purchase
                                                    </h3>
                                                    <p className="text-gray-600 text-sm">
                                                        Completing payment indicates acceptance of this
                                                        policy.
                                                    </p>
                                                </div>
                                                <div className="text-center">
                                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-blue-600 font-bold text-lg">
                              3
                            </span>
                                                    </div>
                                                    <h3 className="font-semibold text-gray-900 mb-2">
                                                        All Sales Are Final
                                                    </h3>
                                                    <p className="text-gray-600 text-sm">
                                                        Cancellations and refunds are not available
                                                        post-purchase.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                                <p className="text-blue-800 text-sm">
                                                    <strong>Note:</strong> If you have questions before
                                                    subscribing, please contact support for clarification.
                                                    After payment, no cancellations or refunds are provided.
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </section>

                    {/* Refund Scenarios */}
                    <section className="pb-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="mb-8"
                            >
                                <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
                                    Refund Eligibility
                                </h2>
                                <p className="text-gray-600 text-center mb-8">
                                    The following scenarios are not eligible for cancellation or
                                    refund.
                                </p>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {refundScenarios.map((scenario, index) => (
                                    <motion.div
                                        key={scenario.title}
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                                        className="h-full"
                                    >
                                        <Card
                                            className={`hover:shadow-lg transition-shadow h-full ${
                                                scenario.eligible
                                                    ? "border-green-200 bg-green-50"
                                                    : "border-red-200 bg-red-50"
                                            }`}
                                        >
                                            <CardHeader>
                                                <CardTitle className="flex items-center justify-between text-lg">
                                                    <div className="flex items-center space-x-3">
                                                        <scenario.icon
                                                            className={`w-5 h-5 ${
                                                                scenario.eligible
                                                                    ? "text-green-600"
                                                                    : "text-red-600"
                                                            }`}
                                                        />
                                                        <span className="text-gray-900">
                              {scenario.title}
                            </span>
                                                    </div>
                                                    {scenario.eligible ? (
                                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                                    ) : (
                                                        <XCircle className="w-5 h-5 text-red-600" />
                                                    )}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-gray-700 mb-4 text-sm">
                                                    {scenario.description}
                                                </p>
                                                <div
                                                    className={`text-xs font-medium px-3 py-2 rounded-full inline-block ${
                                                        scenario.eligible
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-red-100 text-red-800"
                                                    }`}
                                                >
                                                    {scenario.timeframe}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Refund Process (clarification) */}
                    <section className="pb-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <Card className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-3 text-2xl text-gray-900">
                                            <DollarSign className="w-6 h-6 text-blue-600" />
                                            <span>Refund Process</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex items-start space-x-3">
                                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">
                                                        Policy
                                                    </h4>
                                                    <p className="text-gray-700 text-sm">
                                                        We do not process cancellations or refunds. All
                                                        payments are final.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start space-x-3">
                                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">
                                                        Need Assistance?
                                                    </h4>
                                                    <p className="text-gray-700 text-sm">
                                                        If you believe there&apos;s an issue with your
                                                        account, contact support for guidance.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start space-x-3">
                                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">
                                                        Payment Provider
                                                    </h4>
                                                    <p className="text-gray-700 text-sm">
                                                        For payment concerns, you may also reach out to your
                                                        payment provider for assistance.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </section>

                    {/* Important Notes */}
                    <section className="pb-20 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                            >
                                <Card className="bg-amber-50 border-amber-200">
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-3 text-xl text-gray-900">
                                            <AlertCircle className="w-5 h-5 text-amber-600" />
                                            <span>Important Notes</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2 text-amber-800 text-sm">
                                            <li>• All sales are final. No cancellations or refunds.</li>
                                            <li>
                                                • Subscriptions cannot be terminated mid-cycle for a
                                                refund.
                                            </li>
                                            <li>
                                                • Free trials (if any) do not involve refunds as no
                                                payment is taken.
                                            </li>
                                            <li>
                                                • For account or access issues, please contact support.
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Contact Information */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                <Card className="bg-blue-50 border-blue-200">
                                    <CardHeader>
                                        <CardTitle className="text-2xl text-gray-900">
                                            Need Help?
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-700 mb-4">
                                            If you have questions about this policy, please contact our
                                            support team:
                                        </p>
                                        <div className="space-y-2 text-gray-700">
                                            <p>
                                                <strong>Email:</strong> contact@keytagjo.com
                                            </p>
                                            <p>
                                                <strong>Response Time:</strong> Within 24 hours
                                            </p>
                                            <p>
                                                <strong>Business Hours:</strong> Monday - Friday, 9 AM -
                                                6 PM PST
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
