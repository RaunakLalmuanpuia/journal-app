import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout.jsx';
import InputLabel from "@/Components/Ui/InputLabel.jsx";
import TextInput from "@/Components/Ui/TextInput.jsx";
import InputError from "@/Components/Ui/InputError.jsx";
import Checkbox from "@/Components/Ui/Checkbox.jsx";
import PrimaryButton from "@/Components/Ui/PrimaryButton.jsx";
export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <GuestLayout>

            </GuestLayout>

        </>
    );
}
