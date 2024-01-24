import PatchNotesGroup from "./PatchNotesGroup";
import IPatchNotesDataset from "../../models/patchnotes/IPatchNotesDataset";
import IPatchNotesStats from "../../models/patchnotes/IPatchNotesStats";
import { ArrowSmRightIcon, XIcon } from "@heroicons/react/solid";
import { useState } from "react";

export default function PatchNotesRundown({
    patchNotesDataset,
    patchNotesStats,
    championMatches,
    previousChampionMatches,
}: {
    patchNotesDataset: IPatchNotesDataset;
    patchNotesStats: IPatchNotesStats;
    championMatches: number;
    previousChampionMatches: number;
}) {
    const [maximizeHighlights, setMaximizeHighlights] = useState(false);
    const toggleMaximizeHighlights = () =>
        setMaximizeHighlights(!maximizeHighlights);

    return (
        <div>
            <p className="max-w-[65ch] whitespace-pre-wrap font-medium">
                {patchNotesDataset.quote}
            </p>
            <h2 className="mb-2 mt-8 font-header text-4xl">Patch Highlights</h2>
            <div
                className={
                    (maximizeHighlights
                        ? "absolute inset-0 z-10 bg-black/90"
                        : "") +
                    " flex cursor-pointer items-center justify-center"
                }
            >
                <img
                    src={patchNotesDataset.highlightImageUrl}
                    alt="Patch highlights"
                    loading="lazy"
                    className=" max-w-full max-h-full"
                    onClick={toggleMaximizeHighlights}
                />
                {maximizeHighlights && (
                    <button
                        className="absolute top-4 right-4 z-20 -m-4 p-4 focus:outline-none"
                        onClick={() => toggleMaximizeHighlights()}
                    >
                        <XIcon className="h-6 w-6" />
                    </button>
                )}
            </div>

            {patchNotesDataset.groups.map((g) => (
                <PatchNotesGroup
                    key={g.id}
                    patchNotesGroup={g}
                    patchNotesStats={patchNotesStats}
                    championMatches={championMatches}
                    previousChampionMatches={previousChampionMatches}
                />
            ))}
        </div>
    );
}
