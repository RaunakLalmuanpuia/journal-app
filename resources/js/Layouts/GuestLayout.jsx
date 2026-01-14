import React from 'react';
import NavBar from '@/Components/Commons/NavBar.jsx';
import Footer from '@/Components/Commons/Footer.jsx';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            {/* Top Navigation */}
            <NavBar />

            {/* Main Content - Flex grow ensures footer stays at bottom */}
            {/* We use w-full so the Hero section can handle its own max-width */}
            <main className="flex-grow w-full">
                {children}
            </main>

            {/* Footer Component */}
            <Footer />
        </div>
    );
}
