import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

// Import Partials
import { Plan } from './Partials/Plan';
import { Benefits } from './Partials/Benefits';

export default function Index() {
    return (
        <GuestLayout>
            <Head title="Pro Plan - KeyTag Journal" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                {/* 1. Hero & Pricing Section */}
                <Plan />

                {/* 2. Benefits Grid Section */}
                <Benefits />
            </div>
        </GuestLayout>
    );
}
