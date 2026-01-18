import UserLayout from '@/Layouts/UserLayout.jsx';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import AccountActivity from './Partials/AccountActivity';
import ProfileHeader from './Partials/ProfileHeader';
import React from "react";

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <UserLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-light text-gray-900">
                                    Account
                                </h1>
                                <p className="text-gray-500 mt-1 font-light text-sm">
                                    Manage your account settings and personal information
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="py-12 space-y-6">

                <div className="bg-white p-6 shadow sm:rounded-lg">
                    <ProfileHeader className="max-w-xl" />
                </div>
                <div className="bg-white p-6 shadow sm:rounded-lg">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>

                <div className="bg-white p-6 shadow sm:rounded-lg">
                    <AccountActivity className="max-w-xl" />
                </div>


            </div>

        </UserLayout>
    );
}
