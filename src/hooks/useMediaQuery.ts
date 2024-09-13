import { useEffect, useState } from "react";

export default function useMediaQuery(query) {
    const [match, setMatch] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);

        const handler = () => setMatch(mediaQuery.matches);
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, [process.browser]);

    return match;
}
