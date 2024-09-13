import { useEffect } from "react";

export default function usePageView(type, id) {
    useEffect(() => {
        if (process.browser) {
            fetch("/api/pageview", {
                method: "POST",
                body: JSON.stringify({ type, id }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
    }, [process.browser]);
}
