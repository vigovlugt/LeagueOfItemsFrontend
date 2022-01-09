import PatchNotesGroup from "./PatchNotesGroup";
import IPatchNotesDataset from "../../models/patchnotes/IPatchNotesDataset";
import IPatchNotesStats from "../../models/patchnotes/IPatchNotesStats";
import {ArrowSmRightIcon} from "@heroicons/react/solid";

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
  return (
    <div>
      <p className="whitespace-pre-wrap font-medium max-w-[65ch]">
        {patchNotesDataset.quote}
      </p>
      <h2 className="font-header text-4xl mb-2 mt-8">Patch Highlights</h2>
      <div className="flex justify-center">
        <img
          src={patchNotesDataset.highlightImageUrl}
          alt="Patch highlights"
          loading="lazy"
        />
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
