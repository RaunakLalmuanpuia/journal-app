import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

import Intro from './Partials/Intro.jsx';
import Process from './Partials/Process.jsx';
import Video from './Partials/Video.jsx';
import Plans from './Partials/Plans.jsx';
import Visualize from './Partials/Visualize.jsx';
import LatestBlogPosts from '@/Components/Commons/LatestBlogPosts';
// import Tags from './Partials/Tags.jsx';


export default function Home({ auth, laravelVersion, phpVersion }) {
    return (
        <GuestLayout>
            <Head title="Home" />

            {/* The Main Content Area
               You can adjust the order of these components based on your design flow
            */}

            <div className="min-h-screen bg-gray-100">

                {/* Hero / Introduction */}
                <Intro />

                {/* Explanation of Process */}
                <Process />


                {/* Video Presentation */}
                <Video />

                {/* Plans */}
                <Plans />

                {/* Data Visualization or Graphics */}
                <Visualize />

                <LatestBlogPosts/>



                {/* Footer Tags or Categories */}
                {/*<Tags />*/}

            </div>

        </GuestLayout>
    );
}
