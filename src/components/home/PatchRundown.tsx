import Link from "next/link";
import styles from "./PatchRundown.module.css";
import { ArrowSmRightIcon } from "@heroicons/react/solid";
import PatchNotesRundown from "../patchnotes/PatchNotesRundown";
import IPatchNotesStats from "../../models/patchnotes/IPatchNotesStats";

export default function PatchRundown({
    patch,
    patchNotes,
    patchNotesStats,
    championMatches,
    previousChampionMatches,
}: {
    patch: any;
    patchNotes: any;
    patchNotesStats: IPatchNotesStats;
    championMatches: number;
    previousChampionMatches: number;
}) {
    return (
        <div
            id="patch-rundown"
            className="mt-24 mb-8 rounded bg-white p-4 dark:bg-gray-900"
        >
            <Link
                href={`https://www.leagueoflegends.com/en-us/news/game-updates/patch-${patch.replace(
                    ".",
                    "-"
                )}-notes/`}
                passHref
                target="_blank"
                className="group relative mb-4 flex w-full items-center justify-center overflow-hidden rounded-lg bg-white p-8 py-24 shadow dark:bg-dark dark:text-gray-50 sm:py-32"
            >
                <img
                    src={patchNotes.bannerImageUrl}
                    loading="lazy"
                    alt={""}
                    className={
                        "absolute inset-0 h-full w-full " +
                        styles.patchRundownImage
                    }
                />
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center font-header">
                    <h2 className="mt-8 text-4xl group-hover:text-white">
                        Patch {patch} notes
                    </h2>
                    <p className="mt-4 text-sm text-gray-600 group-hover:text-white dark:text-gray-400">
                        Full patch notes{" "}
                        <ArrowSmRightIcon className="inline w-6" />
                    </p>
                </div>
            </Link>

            <PatchNotesRundown
                patchNotesDataset={patchNotes}
                patchNotesStats={patchNotesStats}
                championMatches={championMatches}
                previousChampionMatches={previousChampionMatches}
            />

            <p className="mb-2 text-center font-medium">
                This overview only shows items, runes and champions from the
                patch notes.
            </p>
            <Link
                href={`https://www.leagueoflegends.com/en-us/news/game-updates/patch-${patch.replace(
                    ".",
                    "-"
                )}-notes/`}
                passHref
                className="flex w-full items-center justify-center rounded bg-gray-50 p-2 text-lg shadow dark:bg-gray-800 dark:text-gray-50"
                target="_blank"
            >
                <h2 className="font-header">View full patch notes</h2>
                <ArrowSmRightIcon className="inline w-8 text-gray-600 dark:text-gray-400" />
            </Link>
        </div>
    );
}
