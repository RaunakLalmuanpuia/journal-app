import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { trackPageView } from './utils/ga'

const appName = 'KeyTag Journal - Transform Chaos to Clarity | Productivity Tracking';

createInertiaApp({
    title: (title) => `${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
        trackPageView(window.location.pathname)

        document.addEventListener('inertia:navigate', (event) => {
            trackPageView(event.detail.page.url)
        })
    },
    progress: {
        color: '#4B5563',
    },
});
