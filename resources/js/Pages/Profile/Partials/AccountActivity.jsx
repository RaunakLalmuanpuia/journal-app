import { usePage } from '@inertiajs/react';

export default function AccountActivity({ className = '' }) {
    const user = usePage().props.auth.user;

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Account Activity
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Account history and activity information
                </p>
            </header>

            <div className="mt-6 space-y-4 text-sm">
                {/* Member since */}
                <div className="flex justify-between">
                    <span className="text-gray-500">Member since</span>
                    <span className="font-semibold text-gray-900">
                        {new Date(user.created_at).toLocaleDateString()}
                    </span>
                </div>

                {/* Last login */}
                <div className="flex justify-between">
                    <span className="text-gray-500">Last login</span>
                    <span className="font-semibold text-gray-900">
                        {user.last_active_at
                            ? new Date(user.last_active_at).toLocaleString()
                            : 'Never'}
                    </span>
                </div>

                {/* Email verification */}
                <div className="flex justify-between">
                    <span className="text-gray-500">Email verified</span>
                    <span
                        className={`font-semibold ${
                            user.email_verified_at
                                ? 'text-green-600'
                                : 'text-red-600'
                        }`}
                    >
                        {user.email_verified_at ? 'Active' : 'Not Active'}
                    </span>
                </div>
            </div>
        </section>
    );
}
