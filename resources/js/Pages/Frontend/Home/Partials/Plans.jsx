import React from 'react';
import { motion } from 'framer-motion';

export default function Plans() {
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 font-sans bg-slate-50" id="pricing">
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
                                {/* Standard Price Layout */}
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

                                {/* Promo / Pro Layout */}
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

                                {/* Enterprise / Custom Layout */}
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
                            <button className={`
                                w-full py-3 px-4 rounded-lg text-white font-bold shadow-md transition-all duration-200 transform hover:-translate-y-0.5
                                ${plan.buttonColor}
                            `}>
                                {plan.buttonText}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
// ^^^ IMPORTANT: This brace MUST close the 'Plans' function
// before you define the icon components below.

/* -------------------------------------------------------- */
/* Helper Components (Must be OUTSIDE the main function)    */
/* -------------------------------------------------------- */

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
