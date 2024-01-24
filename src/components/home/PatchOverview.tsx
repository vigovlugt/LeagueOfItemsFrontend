import Link from "next/link";
import { getPickrateIncrease, getWinrateIncrease } from "../../utils/stats";
import { TrendingUpIcon } from "@heroicons/react/outline";
import { ArrowSmRightIcon, TrendingDownIcon } from "@heroicons/react/solid";
import ChampionGridCell from "../champions/ChampionGridCell";
import { percentage, winrateClass } from "../../utils/format";
import ItemGridCell from "../items/ItemGridCell";
import RuneGridCell from "../runes/RuneGridCell";
import { CHAMPIONS_PER_MATCH } from "../../constants/constants";
import TopIcon from "../icons/roles/TopIcon";
import Role from "../../models/roles/Role";
import JungleIcon from "../icons/roles/JungleIcon";
import MidIcon from "../icons/roles/MidIcon";
import BottomIcon from "../icons/roles/BottomIcon";
import SupportIcon from "../icons/roles/SupportIcon";
import styles from "./PatchOverview.module.css";

export default function PatchOverview({
    patch,
    winrateChampions,
    pickrateChampions,
    banrateChampions,
    winrateItems,
    pickrateItems,
    winrateRunes,
    pickrateRunes,
    championMatches,
    previousChampionMatches,
    pickrateRoles,
    patchNotes,
}) {
    return (
        <div
            id="patch-overview"
            className="mt-24 rounded bg-white p-4 dark:bg-gray-900"
        >
            <Link
                href={`https://www.leagueoflegends.com/en-us/news/game-updates/patch-${patch.replace(
                    ".",
                    "-"
                )}-notes/`}
                passHref
                target="_blank"
                className="group relative mb-8 flex w-full items-center justify-center overflow-hidden rounded-lg bg-white p-8 py-24 shadow dark:bg-dark dark:text-gray-50 sm:py-32"
            >
                <img
                    src={patchNotes.bannerImageUrl}
                    alt={""}
                    loading="lazy"
                    className={
                        "absolute inset-0 h-full w-full " +
                        styles.patchOverviewImage
                    }
                />
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center font-header">
                    <h2 className="mt-8 text-4xl group-hover:text-white">
                        Patch {patch} overview
                    </h2>
                    <p className="mt-4 text-sm text-gray-600 group-hover:text-white dark:text-gray-400">
                        Patch notes <ArrowSmRightIcon className="inline w-6" />
                    </p>
                </div>
            </Link>

            <PatchEntityChanges
                pickrateData={pickrateChampions}
                winrateData={winrateChampions}
                matches={championMatches / CHAMPIONS_PER_MATCH}
                previousMatches={previousChampionMatches / CHAMPIONS_PER_MATCH}
                rolePickrateData={pickrateRoles}
                banrateData={banrateChampions}
                type="CHAMPION"
            />

            <PatchEntityChanges
                pickrateData={pickrateItems}
                winrateData={winrateItems}
                matches={championMatches / CHAMPIONS_PER_MATCH}
                previousMatches={previousChampionMatches / CHAMPIONS_PER_MATCH}
                type="ITEM"
            />

            <PatchEntityChanges
                pickrateData={pickrateRunes}
                winrateData={winrateRunes}
                matches={championMatches / CHAMPIONS_PER_MATCH}
                previousMatches={previousChampionMatches / CHAMPIONS_PER_MATCH}
                type="RUNE"
            />
        </div>
    );
}

const PatchEntityChanges = ({
    pickrateData,
    winrateData,
    matches,
    previousMatches,
    rolePickrateData = [],
    banrateData = [],
    type,
}) => {
    const title = {
        RUNE: "Runes",
        CHAMPION: "Champions",
        ITEM: "Items",
    }[type];

    const dataKey = type.toLowerCase(); // ITEM => item.

    return (
        <div>
            <h2 className="mb-2 mt-8 font-header text-4xl">{title}</h2>
            <h2 className="mb-2 font-header text-xl lg:text-2xl">
                Biggest pickrate changes since last patch
            </h2>
            <div className="flex w-full space-x-2 overflow-x-auto pb-2">
                {pickrateData.map((d) => (
                    <DifferenceCard
                        key={d.id}
                        {...{ [dataKey]: d }}
                        type="pickrate"
                        matches={matches}
                        previousMatches={previousMatches}
                    />
                ))}
            </div>
            <h2 className="mt-4 mb-2 font-header text-xl lg:text-2xl">
                Biggest winrate changes since last patch
            </h2>
            <div className="flex w-full space-x-2 overflow-x-auto pb-2">
                {winrateData.map((d) => (
                    <DifferenceCard key={d.id} {...{ [dataKey]: d }} />
                ))}
            </div>

            {rolePickrateData.length > 0 && (
                <>
                    <h2 className="mt-4 mb-2 font-header text-xl lg:text-2xl">
                        Role pickrate increases since last patch
                    </h2>
                    <div className="flex w-full space-x-2 overflow-x-auto pb-2">
                        {rolePickrateData.map((d) => {
                            const data = { ...d, id: d.championId };

                            return (
                                <DifferenceCard
                                    key={d.championId + "-" + d.role}
                                    champion={data}
                                    type="pickrate"
                                    matches={d.totalMatches}
                                    previousMatches={d.previousTotalMatches}
                                />
                            );
                        })}
                    </div>
                </>
            )}

            {banrateData.length > 0 && (
                <>
                    <h2 className="mt-4 mb-2 font-header text-xl lg:text-2xl">
                        Biggest banrate changes since last patch
                    </h2>
                    <div className="flex w-full space-x-2 overflow-x-auto pb-2">
                        {banrateData.map((d) => (
                            <DifferenceCard
                                key={d.id}
                                champion={d}
                                type="banrate"
                                matches={matches}
                                previousMatches={previousMatches}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

const DifferenceCard = ({
    champion = null,
    item = null,
    rune = null,
    type = "winrate",
    matches = 0,
    previousMatches = 0,
}) => {
    const isWinrate = type === "winrate";

    const entity = champion ?? item ?? rune;

    const current = {
        winrate: entity.wins / entity.matches,
        pickrate: entity.matches / matches,
        banrate: entity.bans / matches,
    }[type];

    const previous = {
        winrate: entity.previousWins / entity.previousMatches,
        pickrate: entity.previousMatches / previousMatches,
        banrate: entity.previousBans / previousMatches,
    }[type];

    const increase = current - previous;

    const TrendingIcon = increase > 0 ? TrendingUpIcon : TrendingDownIcon;

    const RoleIcon = {
        [Role.Top]: TopIcon,
        [Role.Jungle]: JungleIcon,
        [Role.Mid]: MidIcon,
        [Role.Adc]: BottomIcon,
        [Role.Supp]: SupportIcon,
    }[entity.role];

    return (
        <div className="flex flex-col items-center rounded bg-white text-gray-900 shadow dark:bg-gray-800 dark:text-gray-50">
            <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-t">
                {champion && <ChampionGridCell id={champion.id} />}
                {RoleIcon && (
                    <RoleIcon className="pointer-events-none absolute right-0 bottom-0 w-11 rounded-tl-lg rounded-tr-lg bg-gray-800 pt-[2px] pl-[2px]" />
                )}
                {item && <ItemGridCell id={item.id} />}
                {rune && (
                    <RuneGridCell
                        id={rune.id}
                        className="mr-0 mb-0"
                        size={rune.isKeystone ? "md" : "sm"}
                    />
                )}
            </div>

            <div
                className={`flex items-center font-semibold ${
                    rune !== null ? "mb-1" : "my-1"
                } ${winrateClass(0.5 + increase, undefined, true)}`}
            >
                <TrendingIcon className="mr-2 inline w-8" />
                <span className="font-header text-xl">
                    {percentage(increase)}
                </span>
            </div>
            <div className="mb-2 flex items-center text-xs font-semibold ">
                <span className="text-gray-600 dark:text-gray-400">
                    {" "}
                    {percentage(previous)}
                </span>
                <ArrowSmRightIcon className="inline h-4 text-gray-600 dark:text-gray-400" />{" "}
                <span>{percentage(current)}</span>
            </div>
        </div>
    );
};
