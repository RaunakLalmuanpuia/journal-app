import { usePage } from '@inertiajs/react';
import {Shield} from 'lucide-react';
export default function ProfileHeader({ className = '' }) {
    const user = usePage().props.auth.user;

    return (
        <div className={`flex items-start gap-6 pb-6 ${className}`}>
            {/* Profile Photo */}
            <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
                <h2 className="text-2xl font-medium text-gray-900 mb-1">
                    {user.name}
                </h2>

                <p className="text-gray-600 mb-4">
                    {user.email}
                </p>

                {/* Status Indicators */}
                <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <span>Account type:</span>
                        <span className="font-medium text-gray-900">
                            Standard User
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span>Status:</span>
                        <span className="font-medium text-green-700">
                            {user.status}
                        </span>
                    </div>

                    {user.email_verified_at && (
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-green-600" />
                            <span className="font-medium text-green-700">
                                Verified
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
