import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

// Import Partials
import Guide from './Partials/Guide';
import Video from './Partials/Video';
import Download from './Partials/Download';

export default function Index() {
    return (
        <GuestLayout>
            <Head title="Free Plan - Build Your Own Journal" />

            <div className="min-h-screen bg-gray-50">
                {/* 1. Hero / Guide Section */}
                <Guide />

                {/* 2. Video Tutorial Section */}
                <Video />

                {/* 3. Download / Pricing Card Section */}
                <Download />
            </div>
        </GuestLayout>
    );
}
