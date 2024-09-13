import { pickrate, winrate, winrateClass } from "../utils/format";
import HelpHover from "./HelpHover";
import {
    CHAMPION_PICKRATE_HELPER_TEXT,
    ITEM_PICKRATE_HELPER_TEXT,
    ITEM_WINRATE_HELPER_TEXT,
} from "../constants/constants";

export default function StatsCard({
    wins = null,
    matches = null,
    previousWins = null,
    previousMatches = null,
    totalMatches = null,
    previousTotalMatches = null,
    type = "winrate",
    entityType = "champion",
}) {
    const isWinrate = type === "winrate";

    return (
        <div className="flex-col items-center justify-center rounded bg-white p-4 text-lg font-bold text-gray-600 shadow dark:bg-gray-800 dark:text-gray-400">
            <div className="flex justify-center">
                {isWinrate && (
                    <>
                        <span className={`${winrateClass(wins, matches)} mr-1`}>
                            {winrate(wins, matches)}
                        </span>
                        <span>Winrate</span>
                        {entityType === "item" && (
                            <HelpHover text={ITEM_WINRATE_HELPER_TEXT} />
                        )}
                    </>
                )}
                {!isWinrate && (
                    <>
                        <span className="mr-1 text-gray-900 dark:text-white">
                            {pickrate(matches, totalMatches)}
                        </span>{" "}
                        Pickrate
                        {entityType === "item" && (
                            <HelpHover text={ITEM_PICKRATE_HELPER_TEXT} />
                        )}
                    </>
                )}
            </div>
            {isWinrate && previousMatches != null && previousWins != null && (
                <div className="flex justify-center text-xs">
                    <span className="mr-1 text-gray-500">
                        {winrate(previousWins, previousMatches)}
                    </span>
                    <span className="text-gray-500">Last patch</span>
                </div>
            )}
            {!isWinrate &&
                previousMatches != null &&
                previousTotalMatches != null && (
                    <div className="flex justify-center text-xs">
                        <span className="mr-1 text-gray-500">
                            {pickrate(previousMatches, previousTotalMatches)}
                        </span>
                        <span className="text-gray-500">Last patch</span>
                    </div>
                )}
        </div>
    );
}
