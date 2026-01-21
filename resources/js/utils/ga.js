export const trackPageView = (url) => {
    if (!window.gtag) return;

    window.gtag('event', 'page_view', {
        page_path: url,
    });
};
