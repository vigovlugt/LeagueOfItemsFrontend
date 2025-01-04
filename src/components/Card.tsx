import { pickrate, winrate, winrateClass } from "../utils/format";
import Link from "next/link";
import { usePopperTooltip } from "react-popper-tooltip";

export default function Card({
    type,
    id,
    wins,
    matches,
    totalMatches,
    previousWins = null,
    previousMatches = null,
    previousTotalMatches = null,
    isLastPatch = false,
}) {
    const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
        usePopperTooltip({
            delayShow: 500,
            placement: "top",
        });

    return (
        <div>
            <Link
                href={`/${type.toLowerCase()}s/${id}`}
                passHref
                className={`flex cursor-pointer flex-col items-center justify-center rounded bg-white px-3 py-3 text-center shadow ${
                    isLastPatch ? "dark:bg-gray-700" : "dark:bg-gray-800"
                }`}
                ref={setTriggerRef}
            >
                {isLastPatch && (
                    <span className="mb-1 block whitespace-nowrap text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                        Last Patch
                    </span>
                )}
                <img
                    src={`/images/${type.toLowerCase()}s/64/${id}.webp`}
                    style={{
                        width: "64px",
                        height: "64px",
                        minHeight: "64px",
                        minWidth: "64px",
                    }}
                    alt="Image"
                />
                <p className="text-center text-[0.65rem] font-medium uppercase tracking-wider mt-1 -mb-2 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    Winrate
                </p>
                <p
                    className={`text-center text-lg font-bold mb-1 ${winrateClass(
                        wins,
                        matches
                    )}`}
                >
                    {winrate(wins, matches)}
                </p>
                <p className="text-center text-[0.65rem] font-medium uppercase tracking-wider -mb-2 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    Pickrate
                </p>
                <p
                    className="text-center text-lg font-bold"
                    title={matches + " matches"}
                >
                    {pickrate(matches, totalMatches)}
                </p>
            </Link>
            {visible &&
                previousMatches != null &&
                previousWins != null &&
                previousTotalMatches != null && (
                    <div ref={setTooltipRef} {...getTooltipProps()}>
                        <Card
                            type={type}
                            id={id}
                            wins={previousWins}
                            matches={previousMatches}
                            totalMatches={previousTotalMatches}
                            isLastPatch={true}
                        />
                    </div>
                )}
        </div>
    );
}
