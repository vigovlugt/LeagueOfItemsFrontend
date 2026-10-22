export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
    (window as any).gtag("config", GA_TRACKING_ID, {
        page_path: url,
    });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value = undefined }) => {
    // gtag is missing when GA is blocked by an ad blocker
    if (typeof (window as any).gtag !== "function") return;
    (window as any).gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
    });
};
