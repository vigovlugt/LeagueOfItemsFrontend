import formatDistance from "date-fns/formatDistance";

import dataset from "../../../data/dataset.json";
import { useRef } from "react";

const SPONSOR_AB_TEST = [
    {
        image: "/images/sponsors/coachify-become-coach.webp",
        url: "https://coachify.gg/article/how-to-start-coaching-esports?utm_campaign=loi_tools_for_esports_coaches&utm_source=league_of_items&utm_medium=referral",
    },
    {
        image: "/images/sponsors/coachify-tools.webp",
        url: "https://coachify.gg/?utm_campaign=loi_tools_for_esports_coaches&utm_source=league_of_items&utm_medium=referral",
    },
] as const;

export default function SideNavFooter() {
    const abTest = useRef(
        SPONSOR_AB_TEST[Math.floor(Math.random() * SPONSOR_AB_TEST.length)]
    );

    return (
        <div className="flex flex-shrink-0 flex-col border-t border-gray-200 p-2 pb-0 text-gray-600 dark:border-gray-700 dark:text-gray-400">
            <span className="pb-1">Patch {dataset.version}</span>
            <span>
                Last update{" "}
                {formatDistance(new Date(dataset.date), new Date(), {
                    addSuffix: true,
                })}
            </span>
            <span className="text-center text-sm mt-2 mb-1 text-gray-500">
                Kindly sponsored by
            </span>
            <a
                href={abTest.current.url}
                target="_blank"
                rel="noreferrer"
                className="-mx-2"
            >
                <img src={abTest.current.image} alt="Coachify" />
            </a>
        </div>
    );
}
