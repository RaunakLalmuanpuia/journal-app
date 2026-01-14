import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

// Import Partials
import { StoryList } from './Partials/StoryList';
import { MusicQuote } from './Partials/MusicQuote';

export default function Index() {
    return (
        <GuestLayout>
            <Head title="Our Story - KeyTag Journal" />

            <div className="min-h-screen bg-gradient-to-br from-[#12b5e2]/10 via-white to-[#12b5e2]/10">
                {/* 1. Main Story Timeline */}
                <StoryList />

                {/* 2. Footer Quote Section */}
                <MusicQuote />
            </div>
        </GuestLayout>
    );
}
