import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { router, useForm } from '@inertiajs/react';

export default function Plans() {
    const [isEnterpriseModalOpen, setEnterpriseModalOpen] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    // Handle button click logic
    const handlePlanSelect = (planTitle) => {
        if (planTitle === 'Enterprise') {
            setEnterpriseModalOpen(true);
        } else {
            // Redirect to dashboard using Inertia
            router.get('/dashboard');
        }
    };

    // Handler to show toast and auto-hide it
    const handleInquirySuccess = () => {
        setEnterpriseModalOpen(false); // Close Modal
        setShowSuccessToast(true); // Show Toast

        // Hide toast after 4 seconds
        setTimeout(() => {
            setShowSuccessToast(false);
        }, 4000);
    };

    const plans = [
        {
            title: "Free",
            description: "For people who wants hands on experience",
            priceType: "standard",
            price: "$0",
            priceSubtitle: "Free",
            priceSubtitleSuffix: "forever",
            subText: "No credit card required • Start immediately",
            buttonText: "Go Free",
            buttonColor: "bg-slate-600 hover:bg-slate-700",
            features: [
                "Create your own KeyTag Journal using guide",
                "Get deeper understanding of the system",
                "Be a part of KTJ discord community (invite only)"
            ]
        },
        {
            title: "Pro",
            description: "For power users who want 24/7 tracking and deeper insights.",
            isPopular: true,
            priceType: "promo",
            originalPrice: "$50",
            price: "Free for 2025",
            promoTag: "Special introductory offer",
            limitTag: "Limited Time: For this year",
            showStandardPricing: true,
            buttonText: "Go Pro",
            buttonColor: "bg-cyan-500 hover:bg-cyan-600",
            features: [
                "Everything in Free, plus:",
                "Track every minute with flexible, color-coded cells",
                "Merge cells for uninterrupted activity logging",
                "Automatic color scoring for quick performance feedback",
                "Advanced dashboards with richer weekly, monthly, and yearly insights"
            ]
        },
        {
            title: "Enterprise",
            description: "For super users who want customisation and personal support",
            priceType: "custom",
            price: "Custom Pricing",
            customSubText: "Tailored solutions for your business needs",
            subText: "Enterprise features • Personal consultation • Custom setup",
            buttonText: "Contact Sales",
            buttonColor: "bg-slate-600 hover:bg-slate-700",
            features: [
                "Everything in Pro, plus",
                "One-on-one consultation with the founding team",
                "Personalized KeyTags and tailored setup",
                "Tailored to personal or team requirements"
            ]
        }
    ];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 font-sans bg-slate-50 relative" id="pricing">
            {/* Success Toast Notification */}
            <AnimatePresence>
                {showSuccessToast && (
                    <SuccessToast onClose={() => setShowSuccessToast(false)} />
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
                        Choose Your Pro Plan
                    </h2>
                    <p className="text-lg text-slate-600">
                        Select the perfect plan for your needs. Upgrade or downgrade at any time.
                    </p>
                </motion.div>

                {/* Cards Container */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`
                                relative bg-white rounded-2xl p-8 flex flex-col h-full
                                ${plan.isPopular
                                ? 'border-2 border-cyan-400 shadow-xl ring-4 ring-cyan-50'
                                : 'border border-slate-200 shadow-lg'}
                            `}
                        >
                            {/* Best Value Badge */}
                            {plan.isPopular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-cyan-500 text-white px-6 py-1 rounded-full text-sm font-bold shadow-sm">
                                    Best Value
                                </div>
                            )}

                            {/* Title & Description */}
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed px-2 h-10">
                                    {plan.description}
                                </p>
                            </div>

                            {/* Pricing Section */}
                            <div className="mb-8 text-center min-h-[140px] flex flex-col justify-center">
                                {plan.priceType === 'standard' && (
                                    <div className="py-4">
                                        <div className="text-slate-500 font-medium text-lg mb-1">{plan.price}</div>
                                        <div className="text-4xl font-extrabold text-slate-900 flex justify-center items-baseline gap-2">
                                            {plan.priceSubtitle}
                                            <span className="text-lg font-normal text-slate-500">{plan.priceSubtitleSuffix}</span>
                                        </div>
                                        <p className="text-[10px] text-slate-400 mt-2">{plan.subText}</p>
                                    </div>
                                )}

                                {plan.priceType === 'promo' && (
                                    <div className="flex flex-col items-center">
                                        <div className="w-full bg-cyan-50 rounded-lg p-4 mb-3 border border-cyan-100">
                                            <span className="text-slate-400 text-3xl font-bold line-through decoration-slate-400 decoration-2">
                                                {plan.originalPrice}
                                            </span>
                                            <div className="text-3xl font-extrabold text-cyan-500 mt-1">
                                                {plan.price}
                                            </div>
                                            <div className="text-xs text-cyan-600 font-medium mt-1">
                                                {plan.promoTag}
                                            </div>
                                        </div>

                                        {plan.limitTag && (
                                            <div className="bg-cyan-100 text-cyan-600 text-[10px] font-bold px-3 py-1 rounded-full mb-2">
                                                {plan.limitTag}
                                            </div>
                                        )}

                                        {plan.showStandardPricing && (
                                            <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-cyan-600 transition-colors mt-1">
                                                <BookOpenIcon className="w-3 h-3" />
                                                <span className="underline decoration-dotted">Standard pricing</span>
                                            </button>
                                        )}
                                    </div>
                                )}

                                {plan.priceType === 'custom' && (
                                    <div>
                                        <div className="w-full bg-green-50 rounded-lg p-6 mb-3 border border-green-100">
                                            <div className="text-2xl font-bold text-green-700/60">
                                                {plan.price}
                                            </div>
                                            <div className="text-xs text-green-600 mt-1">
                                                {plan.customSubText}
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-slate-400 mt-2 px-4 leading-tight">{plan.subText}</p>
                                    </div>
                                )}
                            </div>

                            {/* Features List */}
                            <ul className="space-y-4 mb-8 flex-grow">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className="mt-1 flex-shrink-0">
                                            <div className="rounded-full border border-cyan-500 p-0.5">
                                                <CheckIcon className="w-3 h-3 text-cyan-500" strokeWidth={3} />
                                            </div>
                                        </div>
                                        <span className="text-sm text-slate-600 text-left">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Action Button */}
                            <button
                                onClick={() => handlePlanSelect(plan.title)}
                                className={`
                                    w-full py-3 px-4 rounded-lg text-white font-bold shadow-md transition-all duration-200 transform hover:-translate-y-0.5
                                    ${plan.buttonColor}
                                `}
                            >
                                {plan.buttonText}
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Enterprise Modal */}
                <EnterpriseModal
                    isOpen={isEnterpriseModalOpen}
                    onClose={() => setEnterpriseModalOpen(false)}
                    onSuccessAction={handleInquirySuccess}
                />
            </div>
        </section>
    );
}

/* -------------------------------------------------------- */
/* Helper Components                                        */
/* -------------------------------------------------------- */

function SuccessToast({ onClose }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -50, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 20 }}
            className="fixed top-6 right-6 z-[60] flex items-center w-full max-w-sm p-4 bg-white rounded-lg shadow-2xl border-l-4 border-green-500"
            role="alert"
        >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
                <CheckIcon className="w-5 h-5" />
            </div>
            <div className="ml-3 text-sm font-normal text-slate-700">
                <span className="font-semibold block text-slate-900">Request Sent!</span>
                We'll get back to you shortly.
            </div>
            <button
                type="button"
                onClick={onClose}
                className="ml-auto -mx-1.5 -my-1.5 bg-white text-slate-400 hover:text-slate-900 rounded-lg focus:ring-2 focus:ring-slate-300 p-1.5 hover:bg-slate-100 inline-flex h-8 w-8"
            >
                <span className="sr-only">Close</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
            </button>
        </motion.div>
    );
}

function EnterpriseModal({ isOpen, onClose, onSuccessAction }) {
    // Initialize Inertia Form
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        company: '',
        contact_name: '',
        email: '',
        team_size: '',
        requirements: '',
        budget: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure this route matches your Laravel route name or path
        post('/enterprise-inquiry', {
            onSuccess: () => {
                reset(); // Reset form fields
                onSuccessAction(); // Trigger parent success action (close modal + show toast)
            },
            onError: () => {
                // Errors are automatically populated into the 'errors' object
            }
        });
    };

    const handleCancel = () => {
        clearErrors();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto"
                >
                    <div className="p-6 sm:p-8">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-slate-900">Enterprise Plan Inquiry</h3>
                            <p className="text-slate-500 mt-1">Tell us about your team and needs. We'll set you up and reach out.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Row 1 */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-900 mb-1">Company *</label>
                                    <input
                                        type="text"
                                        value={data.company}
                                        onChange={e => setData('company', e.target.value)}
                                        placeholder="Acme Inc."
                                        className={`w-full rounded-md shadow-sm sm:text-sm px-3 py-2 border ${errors.company ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-cyan-500 focus:ring-cyan-500'}`}
                                    />
                                    {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-900 mb-1">Contact Name *</label>
                                    <input
                                        type="text"
                                        value={data.contact_name}
                                        onChange={e => setData('contact_name', e.target.value)}
                                        placeholder="Jane Doe"
                                        className={`w-full rounded-md shadow-sm sm:text-sm px-3 py-2 border ${errors.contact_name ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-cyan-500 focus:ring-cyan-500'}`}
                                    />
                                    {errors.contact_name && <p className="text-red-500 text-xs mt-1">{errors.contact_name}</p>}
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-900 mb-1">Email *</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        placeholder="jane@acme.com"
                                        className={`w-full rounded-md shadow-sm sm:text-sm px-3 py-2 border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-cyan-500 focus:ring-cyan-500'}`}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-900 mb-1">Team Size *</label>
                                    <input
                                        type="text"
                                        value={data.team_size}
                                        onChange={e => setData('team_size', e.target.value)}
                                        placeholder="e.g. 25"
                                        className={`w-full rounded-md shadow-sm sm:text-sm px-3 py-2 border ${errors.team_size ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-cyan-500 focus:ring-cyan-500'}`}
                                    />
                                    {errors.team_size && <p className="text-red-500 text-xs mt-1">{errors.team_size}</p>}
                                </div>
                            </div>

                            {/* Requirements */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-1">Requirements *</label>
                                <textarea
                                    rows={3}
                                    value={data.requirements}
                                    onChange={e => setData('requirements', e.target.value)}
                                    placeholder="Describe your use case..."
                                    className={`w-full rounded-md shadow-sm sm:text-sm px-3 py-2 border resize-none ${errors.requirements ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-cyan-500 focus:ring-cyan-500'}`}
                                />
                                {errors.requirements && <p className="text-red-500 text-xs mt-1">{errors.requirements}</p>}
                            </div>

                            {/* Budget */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-900 mb-1">Budget (optional)</label>
                                <input
                                    type="text"
                                    value={data.budget}
                                    onChange={e => setData('budget', e.target.value)}
                                    placeholder="Approximate budget"
                                    className={`w-full rounded-md shadow-sm sm:text-sm px-3 py-2 border ${errors.budget ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-cyan-500 focus:ring-cyan-500'}`}
                                />
                                {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget}</p>}
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 text-sm font-semibold text-white bg-cyan-500 border border-transparent rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Submitting...' : 'Submit Inquiry'}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

function CheckIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}

function BookOpenIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
    );
}
