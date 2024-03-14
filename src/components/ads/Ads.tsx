import { ArrowRightIcon } from "@heroicons/react/solid";
import Script from "next/script";
import { ComponentProps, useEffect, useState } from "react";

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

export function AdSenseAd({
    slot,
    className,
    style,
    ...props
}: { slot: string } & ComponentProps<"ins">) {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
        if (!window.adsbygoogle) {
            window.adsbygoogle = [];
        }
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <Script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1885808487696267"
                crossOrigin="anonymous"
            ></Script>
            <ins
                ref={() => {
                    try {
                        window.adsbygoogle.push({});
                    } catch (e) {
                        console.error(e);
                    }
                }}
                className={"adsbygoogle " + className}
                style={{ display: "block", ...style }}
                data-ad-client="ca-pub-1885808487696267"
                data-ad-slot={slot}
                data-ad-format="auto"
                data-full-width-responsive="true"
                data-adtest={
                    process.env.NODE_ENV === "development" ? "on" : undefined
                }
                {...props}
            ></ins>
        </>
    );
}

export function AdRectangleSm({ ...props }: ComponentProps<"ins">) {
    return <AdSenseAd {...props} slot="9216640697" />;
}

export function AdRectangleLg({ ...props }: ComponentProps<"ins">) {
    return <AdSenseAd {...props} slot="3441322412" />;
}

export function AdVertical({ ...props }: ComponentProps<"ins">) {
    return <AdSenseAd {...props} slot="6993554612" />;
}

export function SponsorLayout({ children, ...props }: ComponentProps<"div">) {
    return (
        <div
            {...props}
            className={"flex flex-col md:flex-row gap-4 " + props.className}
        >
            <div className="flex md:hidden">
                <AdRectangleSm />
            </div>
            <div className="w-full">{children}</div>
            <div
                className="self-start flex-shrink-0 flex-grow-0"
                style={{ width: "300px" }}
            >
                <AdVertical />
            </div>
        </div>
    );
}
