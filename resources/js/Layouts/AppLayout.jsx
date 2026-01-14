import { usePage } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout'; // Default User Layout
import AdminLayout from '@/Layouts/AdminLayout'; // The new Admin Layout you created

export default function AppLayout({ header, children }) {
    // 1. Access the 'roles' prop shared from your HandleInertiaRequests middleware
    const { roles } = usePage().props;

    // 2. Check if the 'Admin' role exists in the roles array
    const isAdmin = roles && roles.includes('Admin');

    // 3. Conditionally render the correct layout
    if (isAdmin) {
        return (
            <AdminLayout header={header}>
                {children}
            </AdminLayout>
        );
    }

    // Default fallback to the standard User layout
    return (
        <UserLayout header={header}>
            {children}
        </UserLayout>
    );
}
