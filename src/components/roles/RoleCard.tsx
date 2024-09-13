import { pickrate, winrate, winrateClass } from "../../utils/format";
import TopIcon from "../icons/roles/TopIcon";
import Role from "../../models/roles/Role";
import JungleIcon from "../icons/roles/JungleIcon";
import MidIcon from "../icons/roles/MidIcon";
import BottomIcon from "../icons/roles/BottomIcon";
import SupportIcon from "../icons/roles/SupportIcon";
import { usePopperTooltip } from "react-popper-tooltip";

export default function RoleCard({
    role,
    wins,
    matches,
    totalMatches,
    previousWins = null,
    previousMatches = null,
    previousTotalMatches = null,
    isLastPatch = false,
}) {
    const Icon = {
        [Role.Top]: TopIcon,
        [Role.Jungle]: JungleIcon,
        [Role.Mid]: MidIcon,
        [Role.Adc]: BottomIcon,
        [Role.Supp]: SupportIcon,
    }[role];

    const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
        usePopperTooltip({
            delayShow: 500,
            placement: "top",
        });

    return (
        <div
            className={`flex flex-col justify-center rounded bg-white px-3 py-3 text-center shadow ${
                isLastPatch ? "dark:bg-gray-700" : "dark:bg-gray-800"
            }`}
            ref={setTriggerRef}
        >
            {isLastPatch && (
                <span className="mb-1 block whitespace-nowrap text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Last Patch
                </span>
            )}
            <Icon className="mx-auto mb-1 w-[46px] text-gray-600 dark:text-white" />
            {/*<p className="text-center text-xs font-medium uppercase tracking-wider -mb-1 text-gray-500 dark:text-gray-400 whitespace-nowrap">*/}
            {/*  Wins*/}
            {/*</p>*/}
            <p
                className={`text-center text-lg font-bold ${winrateClass(
                    wins,
                    matches
                )}`}
            >
                {winrate(wins, matches)}
            </p>
            {/*<p className="text-center text-xs font-medium uppercase tracking-wider -mb-1 text-gray-500 dark:text-gray-400 whitespace-nowrap">*/}
            {/*  Matches*/}
            {/*</p>*/}
            <p
                className="text-center text-lg font-bold"
                title={matches + " matches"}
            >
                {pickrate(matches, totalMatches)}
            </p>
            {visible &&
                previousMatches != null &&
                previousWins != null &&
                previousTotalMatches != null && (
                    <div ref={setTooltipRef} {...getTooltipProps()}>
                        <RoleCard
                            role={role}
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
