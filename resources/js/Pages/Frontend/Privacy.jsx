import React from "react";
import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/Ui/Card";
import {
    Shield,
    Eye,
    Lock,
    Database,
    UserCheck,
    AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
    };

    const sections = [
        {
            title: "Information We Collect",
            icon: Database,
            content: [
                "Name and contact details such as email address and phone number.",
                "Demographic information including postcode, preferences, and interests (if required).",
                "Other details relevant to customer surveys, offers, and service improvements.",
            ],
        },
        {
            title: "How We Use the Information",
            icon: UserCheck,
            content: [
                "To maintain internal records and improve our products and services.",
                "To send periodic promotional emails about new products, special offers, or updates using the email you provide.",
                "To contact you for market research purposes via email, phone, or mail.",
                "To customize our website and services according to your interests.",
            ],
        },
        {
            title: "Information Sharing and Disclosure",
            icon: Eye,
            content: [
                "We do not sell, distribute, or lease your personal information to third parties unless required by law or with your permission.",
                "We may share promotional information about third parties if you have agreed to receive such communications.",
                "Your information may be disclosed to comply with legal obligations or to protect our rights and security.",
            ],
        },
        {
            title: "Data Security",
            icon: Lock,
            content: [
                "We are committed to keeping your information secure.",
                "Appropriate technical and organizational measures are in place to prevent unauthorized access or disclosure.",
                "We regularly review and update our security practices to safeguard your data.",
            ],
        },
        {
            title: "Your Rights and Choices",
            icon: Shield,
            content: [
                "You can choose to restrict the collection or use of your personal information at any time.",
                "If you previously agreed to direct marketing, you can withdraw consent by contacting us at contact@eightsis.com.",
                "You have the right to request corrections if any of your personal data is incorrect or incomplete.",
                "We will promptly update or delete information at your request in line with applicable laws.",
            ],
        },
        {
            title: "Cookies and Tracking",
            icon: AlertCircle,
            content: [
                "We use cookies to enhance your browsing experience and maintain session functionality.",
                "Traffic log cookies help us analyze which pages are most useful for improving our website.",
                "Cookies do not give us access to your computer or any information other than what you choose to share.",
                "You can accept or decline cookies in your browser settings, but some features may not work properly if disabled.",
            ],
        },
    ];

    return (
        <>
            <Head title="Privacy Policy" />

            <GuestLayout>
                <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 font-sans">

                    {/* Hero Section */}
                    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            <motion.div {...fadeInUp}>
                                <div className="flex justify-center mb-6">
                                    <Shield className="w-16 h-16 text-blue-600" />
                                </div>
                                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
                                    Privacy Policy
                                </h1>
                                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                    This Privacy Policy explains how EIGHTSIS TECH PRIVATE LIMITED
                                    collects, uses, and protects your information when you use our
                                    website or services.
                                </p>
                                <div className="text-sm text-gray-500 bg-gray-100 rounded-lg px-4 py-2 inline-block">
                                    Last updated: August 8, 2025
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Content Sections */}
                    <section className="pb-20 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto space-y-8">
                            {sections.map((section, index) => (
                                <motion.div
                                    key={section.title}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                >
                                    <Card className="hover:shadow-lg transition-shadow bg-white">
                                        <CardHeader>
                                            <CardTitle className="flex items-center space-x-3 text-2xl text-gray-900">
                                                <section.icon className="w-6 h-6 text-blue-600" />
                                                <span>{section.title}</span>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-3">
                                                {section.content.map((item, itemIndex) => (
                                                    <li
                                                        key={itemIndex}
                                                        className="flex items-start space-x-3"
                                                    >
                                                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                                                        <span className="text-gray-700 leading-relaxed">
                              {item}
                            </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}

                            {/* Contact Information */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                            >
                                <Card className="bg-blue-50 border-blue-200">
                                    <CardHeader>
                                        <CardTitle className="text-2xl text-gray-900">
                                            Contact Us
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-700 mb-4">
                                            If you have any questions about this Privacy Policy or our
                                            data practices, please contact us:
                                        </p>
                                        <div className="space-y-2 text-gray-700">
                                            <p>
                                                <strong>Email:</strong> contact@eightsis.com
                                            </p>
                                            <p>
                                                <strong>Address:</strong> 2nd Floor, JL Building, Mission
                                                Veng, Aizawl, Mizoram 796005
                                            </p>
                                            <p>
                                                <strong>Phone:</strong> +91 9748864995
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Updates Notice */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                <Card className="bg-amber-50 border-amber-200">
                                    <CardContent className="pt-6">
                                        <div className="flex items-start space-x-3">
                                            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <h3 className="font-semibold text-amber-900 mb-2">
                                                    Policy Updates
                                                </h3>
                                                <p className="text-amber-800 text-sm">
                                                    EIGHTSIS TECH PRIVATE LIMITED may update this Privacy
                                                    Policy from time to time. We recommend reviewing this page
                                                    periodically to ensure you are aware of any changes. Your
                                                    continued use of our services will be considered as
                                                    acceptance of the updated Privacy Policy.
                                                </p>
                                            </div>
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
