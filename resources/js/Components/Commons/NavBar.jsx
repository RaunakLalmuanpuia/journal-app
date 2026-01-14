import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/Ui/ApplicationLogo.jsx';

export default function NavBar({ className = '' }) {
    const { url, props } = usePage();
    const { auth } = props;
    const user = auth.user; // Get user from Inertia props
    const isAuthenticated = !!user;

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle Scroll Effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Toggle Mobile Menu
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    // Helper to check active path
    const isActivePath = (path) => {
        if (path === '/') return url === '/';
        return url.startsWith(path);
    };

    // Reusable Button Style Helper (to mimic the reference code's Button component)
    const btnClass = (variant = 'default', extraClasses = '') => {
        const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2";

        const variants = {
            ghost: "hover:bg-gray-100 hover:text-gray-900",
            outline: "border border-input bg-transparent shadow-sm hover:bg-gray-100 hover:text-gray-900",
            default: "bg-[#12b5e2] text-white shadow hover:bg-[#0ea5d3]",
        };

        return `${base} ${variants[variant] || variants.default} ${extraClasses}`;
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled
                        ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
                        : "bg-white/90 backdrop-blur-sm border-b border-gray-200"
                } ${className}`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="w-8 h-8 rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
                                {/* Using your ApplicationLogo here, adapted to fit the design */}

                                <img
                                    src='/assets/logo.png'
                                    alt='Logo'
                                    className="w-full h-full fill-current text-[#12b5e2]"
                                />

                            </div>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-[#12b5e2] transition-colors">
                                KeyTagJo
                            </h1>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-6">
                            <nav className="flex items-center space-x-1 lg:space-x-6">
                                {[
                                    { name: 'Home', href: '/' },
                                    { name: 'Demo', href: '/demo' },
                                    { name: 'Free Plan', href: '/free-plan' },
                                    { name: 'Pro Plan', href: '/paid-plan' },
                                    { name: 'Story', href: '/story' },
                                    { name: 'Blog', href: '/' },
                                ].map((item) => (
                                    <Link key={item.name} href={item.href}>
                                        <button
                                            className={btnClass('ghost', `transition-colors ${
                                                isActivePath(item.href)
                                                    ? " text-[#12b5e2] hover:bg-[#12b5e2] hover:bg-opacity-20"
                                                    : "text-gray-700 hover:bg-gray-100 hover:text-[#12b5e2]"
                                            }`)}
                                        >
                                            {item.name}
                                        </button>
                                    </Link>
                                ))}
                            </nav>

                            {/* Auth Section */}
                            {isAuthenticated ? (
                                <div className="flex items-center space-x-3 pl-6 border-l border-gray-200">
                                    <span className="text-sm text-gray-700 hidden lg:block">
                                        Welcome, {user?.name}!
                                    </span>
                                    <Link href={user?.role === 0 ? "/dashboard/admin" : "/dashboard"}>
                                        <button className={btnClass('outline', "text-[#12b5e2] hover:bg-[#12b5e2] hover:bg-opacity-10 border-[#12b5e2]")}>
                                            Dashboard
                                        </button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-3 pl-6 border-l border-gray-200">
                                    <Link href={route('login')}>
                                        <button className={btnClass('default', "bg-[#12b5e2] hover:bg-[#0ea5d3] text-white")}>
                                            Get Started
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={toggleMobileMenu}
                                className="text-gray-700 hover:bg-gray-100 p-2 rounded-md"
                            >
                                {isMobileMenuOpen ? (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={closeMobileMenu}
                />
            )}

            {/* Mobile Menu */}
            <div
                className={`fixed top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40 md:hidden transform transition-transform duration-300 ease-in-out ${
                    isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex flex-col space-y-2">
                        {[
                            { name: 'Home', href: '/' },
                            { name: 'Product Demo', href: '/demo' },
                            { name: 'Free Guide', href: '/free-plan' },
                            { name: 'Pro Plan', href: '/paid-plan' },
                            { name: 'Story', href: '/story' },
                            { name: 'Blog', href: '/' },
                        ].map((item) => (
                            <Link key={item.name} href={item.href} onClick={closeMobileMenu}>
                                <button className={btnClass('ghost', `w-full justify-start transition-colors ${
                                    isActivePath(item.href)
                                        ? "bg-[#12b5e2] bg-opacity-10 text-[#12b5e2] hover:bg-[#12b5e2] hover:bg-opacity-20"
                                        : "text-gray-700 hover:bg-gray-100 hover:text-[#12b5e2]"
                                }`)}>
                                    {item.name}
                                </button>
                            </Link>
                        ))}

                        {/* Mobile Auth Section */}
                        <div className="border-t border-gray-200 pt-4 mt-2 space-y-3">
                            {isAuthenticated ? (
                                <>
                                    <div className="px-3 py-2 bg-gray-50 rounded-lg">
                                        <span className="text-sm text-gray-700 font-medium">
                                            Welcome, {user?.name}!
                                        </span>
                                    </div>
                                    <Link href={"/dashboard"} onClick={closeMobileMenu}>
                                        <button className={btnClass('outline', "w-full text-[#12b5e2] hover:bg-[#12b5e2] hover:bg-opacity-10 border-[#12b5e2]")}>
                                            Dashboard
                                        </button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href={route('login')} onClick={closeMobileMenu}>
                                        <button className={btnClass('ghost', "w-full text-[#12b5e2] hover:bg-[#12b5e2] hover:bg-opacity-10")}>
                                            Login
                                        </button>
                                    </Link>
                                    <Link href={route('register')} onClick={closeMobileMenu}>
                                        <button className={btnClass('default', "w-full bg-[#12b5e2] hover:bg-[#0ea5d3] text-white")}>
                                            Get Started
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}
