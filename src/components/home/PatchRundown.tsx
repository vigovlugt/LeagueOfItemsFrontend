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
    <div id="patch-rundown" className="rounded p-4 mt-24 bg-white dark:bg-gray-900">
      <Link
        href={`https://www.leagueoflegends.com/en-us/news/game-updates/patch-${patch.replace(
          ".",
          "-"
        )}-notes/`}
        passHref
      >
        <a
          target="_blank"
          className="flex justify-center items-center w-full bg-white rounded-lg p-8 py-24 sm:py-32 shadow mb-4 dark:text-gray-50 dark:bg-dark relative overflow-hidden group"
        >
          <img
            src={patchNotes.bannerImageUrl}
            loading="lazy"
            alt={""}
            className={
              "absolute inset-0 w-full h-full " + styles.patchRundownImage
            }
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center font-header pointer-events-none text-center">
            <h2 className="text-4xl mt-8 group-hover:text-white">
              Patch {patch} notes
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-4 group-hover:text-white">
              Full patch notes <ArrowSmRightIcon className="w-6 inline" />
            </p>
          </div>
        </a>
      </Link>

      <PatchNotesRundown
        patchNotesDataset={patchNotes}
        patchNotesStats={patchNotesStats}
        championMatches={championMatches}
        previousChampionMatches={previousChampionMatches}
      />

      <p className="text-center mb-2 font-medium">
        This overview only shows items, runes and champions from the patch
        notes.
      </p>
      <Link
        href={`https://www.leagueoflegends.com/en-us/news/game-updates/patch-${patch.replace(
          ".",
          "-"
        )}-notes/`}
        passHref
      >
        <a
          className="flex justify-center items-center w-full rounded p-2 text-lg shadow bg-gray-50 dark:text-gray-50 dark:bg-gray-800"
          target="_blank"
        >
          <h2 className="font-header">View full patch notes</h2>
          <ArrowSmRightIcon className="w-8 inline text-gray-600 dark:text-gray-400" />
        </a>
      </Link>
    </div>
  );
}
