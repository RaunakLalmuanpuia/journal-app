import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/Ui/ApplicationLogo.jsx';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center space-x-3 mb-4 group">
                            <div className="w-8 h-8 rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
                                {/* Using ApplicationLogo to match Navbar, or use <img src="..." /> */}
                                <img
                                    src='/assets/logo.png'
                                    alt='Logo'
                                    className="w-full h-full fill-current text-[#12b5e2]"
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-white">KeyTag Journal</h3>
                        </Link>
                        <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                            Transform your daily chaos into clarity with our intelligent
                            productivity tracking system.
                        </p>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Product</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/demo" className="text-gray-400 hover:text-white transition-colors">
                                    Product Demo
                                </Link>
                            </li>
                            <li>
                                <Link href="/free-plan" className="text-gray-400 hover:text-white transition-colors">
                                    Free Guide
                                </Link>
                            </li>
                            <li>
                                <Link href="/paid-plan" className="text-gray-400 hover:text-white transition-colors">
                                    Pro Plan
                                </Link>
                            </li>
                            <li>
                                <Link href="/story" className="text-gray-400 hover:text-white transition-colors">
                                    KeytagJo Story
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                                    KeytagJo Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Support</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            {/* Note: Using Laravel named routes where applicable, falling back to strings if not defined */}
                            <li>
                                <Link href={route('login')} className="text-gray-400 hover:text-white transition-colors">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link href={route('login')} className="text-gray-400 hover:text-white transition-colors">
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Legal</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link href="/cancellation" className="text-gray-400 hover:text-white transition-colors">
                                    Cancellation & Refund
                                </Link>
                            </li>
                            <li>
                                <Link href="/shipping-delivery" className="text-gray-400 hover:text-white transition-colors">
                                    Shipping & Delivery
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-800 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 text-sm mb-4 md:mb-0">
                            © {currentYear} KeyTag Journal. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-gray-400">
                            <span>🔥 by Eightsis Tech </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
