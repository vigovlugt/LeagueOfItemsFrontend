import { event } from "./ga";

export function trackAdClick(adId: string) {
    event({ action: "ad_click", category: "ad", label: adId });

    // First-party count, which ad blockers don't block like they do GA.
    // sendBeacon survives the navigation away from the page.
    const body = JSON.stringify({ type: "AD_CLICK", id: adId });
    const sent =
        typeof navigator.sendBeacon === "function" &&
        navigator.sendBeacon(
            "/api/pageview",
            new Blob([body], { type: "application/json" })
        );
    if (!sent) {
        fetch("/api/pageview", {
            method: "POST",
            body,
            headers: { "Content-Type": "application/json" },
            keepalive: true,
        }).catch(() => {});
    }
}
