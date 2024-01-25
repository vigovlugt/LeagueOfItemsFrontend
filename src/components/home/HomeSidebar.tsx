import ItemGridCell from "../items/ItemGridCell";
import BuildsTable from "./BuildsTable";
import RuneGridCell from "../runes/RuneGridCell";
import HelpHover from "../HelpHover";
import { ArrowSmDownIcon, ArrowSmRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { GameBoostVertical } from "../ads/GameBoost";

export default function HomeSidebar({ pickrateBuilds, winrateBuilds }) {
    return (
        <div className="flex flex-col">
            <h3 className="mb-1 font-header text-xl">
                Biggest pickrate increases
            </h3>
            <BuildsTable builds={pickrateBuilds} type="pickrate" size="sm" />

            <h3 className="my-1 mt-4 font-header text-xl">
                Biggest winrate increases
                <HelpHover text="500 Match minimum" />
            </h3>
            <BuildsTable builds={winrateBuilds} size="sm" type="winrate" />

            <GameBoostVertical className="mt-4 w-full sticky top-0" />
        </div>
    );
}

function SideBarPanel({ children = undefined, className = "", title }) {
    return (
        <div className="pb-4">
            <h3 className="mb-1 font-header text-xl">{title}</h3>
            <div
                className={`mb-4 rounded bg-white p-4 shadow dark:bg-gray-900 ${className}`}
            >
                {children}
            </div>
        </div>
    );
}
