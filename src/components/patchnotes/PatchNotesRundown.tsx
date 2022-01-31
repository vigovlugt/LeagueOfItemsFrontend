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
      <p className="whitespace-pre-wrap font-medium max-w-[65ch]">
        {patchNotesDataset.quote}
      </p>
      <h2 className="font-header text-4xl mb-2 mt-8">Patch Highlights</h2>
      <div
        className={
          (maximizeHighlights ? "absolute inset-0 z-10 bg-black/90" : "") +
          " cursor-pointer flex justify-center items-center"
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
            className="absolute top-4 right-4 -m-4 p-4 focus:outline-none z-20"
            onClick={() => toggleMaximizeHighlights()}
          >
            <XIcon className="w-6 h-6" />
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
