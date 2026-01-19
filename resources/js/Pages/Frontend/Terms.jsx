import React from "react";
import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/Ui/Card";
import {
    FileText,
    Scale,
    Users,
    AlertTriangle,
    Shield,
    Gavel,
} from "lucide-react";
import { motion } from "framer-motion";

export default function TermsConditionsPage() {
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
    };

    // Updated sections reflecting EIGHTSIS TECH PRIVATE LIMITED T&C
    const sections = [
        {
            title: "Overview & Acceptance",
            icon: FileText,
            content: [
                `For the purposes of these Terms and Conditions, “we”, “us”, and “our” refer to EIGHTSIS TECH PRIVATE LIMITED, whose registered/operational office is 2nd Floor, JL Building, Mission Veng, Aizawl, Mizoram 796005.`,
                `“You”, “your”, “user”, and “visitor” refer to any person who visits our website and/or agrees to purchase from us.`,
                "By accessing our website and/or purchasing from us, you accept and agree to be bound by these Terms and Conditions.",
            ],
        },
        {
            title: "Website Use & Changes",
            icon: Scale,
            content: [
                "The content of the pages of this website is subject to change without notice.",
                "From time to time, our website may include links to other websites. These links are provided for your convenience to provide further information.",
            ],
        },
        {
            title: "Warranty Disclaimer & Liability",
            icon: AlertTriangle,
            content: [
                "Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness, or suitability of information and materials found on this website for any particular purpose.",
                "Such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.",
                "Your use of any information or materials on our website and/or product pages is entirely at your own risk. It is your responsibility to ensure that products, services, or information available meet your specific requirements.",
            ],
        },
        {
            title: "Intellectual Property & Trademarks",
            icon: Gavel,
            content: [
                "This website contains material which is owned by or licensed to us, including but not limited to the design, layout, look, appearance, and graphics.",
                "Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.",
                "All trademarks reproduced on this website which are not the property of, or licensed to, the operator are acknowledged on the website.",
            ],
        },
        {
            title: "Unauthorized Use & Security",
            icon: Shield,
            content: [
                "Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.",
                "You may not create a link to our website from another website or document without EIGHTSIS TECH PRIVATE LIMITED’s prior written consent.",
            ],
        },
        {
            title: "Your Responsibilities",
            icon: Users,
            content: [
                "You are responsible for ensuring that any products, services, or information available through our website and/or product pages meet your specific requirements.",
                "Any use of the website and purchases made are at your sole discretion and risk.",
            ],
        },
        {
            title: "Transactions & Authorization",
            icon: FileText,
            content: [
                "We shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any transaction, on account of the cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.",
            ],
        },
    ];

    return (
        <>
            <Head title="Terms & Conditions" />

            <GuestLayout>
                <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 font-sans">

                    {/* Hero Section */}
                    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            <motion.div {...fadeInUp}>
                                <div className="flex justify-center mb-6">
                                    <Scale className="w-16 h-16 text-blue-600" />
                                </div>
                                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
                                    Terms & Conditions
                                </h1>
                                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                    These Terms and Conditions govern your use of the EIGHTSIS TECH
                                    PRIVATE LIMITED website and any purchases you make from us.
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

                            {/* Governing Law */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                <Card className="bg-blue-50 border-blue-200">
                                    <CardHeader>
                                        <CardTitle className="text-2xl text-gray-900">
                                            Governing Law & Jurisdiction
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-700 mb-4">
                                            Any dispute arising out of your use of our website and/or
                                            purchases with us and/or any engagement with us is subject to
                                            the laws of India.
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Contact Information */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.9 }}
                            >
                                <Card className="bg-green-50 border-green-200">
                                    <CardHeader>
                                        <CardTitle className="text-2xl text-gray-900">
                                            Questions About These Terms?
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-700 mb-4">
                                            If you have any questions about these Terms and Conditions,
                                            please contact us:
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
                        </div>
                    </section>
                </div>
            </GuestLayout>
        </>
    );
}
