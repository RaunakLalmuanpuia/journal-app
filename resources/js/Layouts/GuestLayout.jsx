import ApplicationLogo from '@/Components/Ui/ApplicationLogo.jsx';
import NavBar from '@/Components/Commons/NavBar.jsx';
import Footer from '@/Components/Commons/Footer.jsx';
import { Link } from '@inertiajs/react';



export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col bg-gray-100">
            {/* Top Navigation */}
            <NavBar />

            {/* Main Content Area - flex-grow pushes footer down */}
            {/*<main className="flex-grow flex flex-col items-center pt-24 pb-12 sm:justify-center">*/}

            {/*    /!* Card Container *!/*/}
            {/*    <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">*/}
            {/*        {children}*/}
            {/*    </div>*/}
            {/*</main>*/}

            <main>

                {/* Card Container */}
                <div>
                    {children}
                </div>
            </main>

            {/* Footer Component */}
            <Footer />
        </div>
    );
}
