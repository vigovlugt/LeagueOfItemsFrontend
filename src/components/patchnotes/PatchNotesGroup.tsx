import PatchNotesChange from "./PatchNotesChange";
import IPatchNotesGroup from "../../models/patchnotes/IPatchNotesGroup";
import IPatchNotesStats from "../../models/patchnotes/IPatchNotesStats";

export default function PatchNotesGroup({
    patchNotesGroup,
    patchNotesStats,
    championMatches,
    previousChampionMatches,
}: {
    patchNotesGroup: IPatchNotesGroup;
    patchNotesStats: IPatchNotesStats;
    championMatches: number;
    previousChampionMatches: number;
}) {
    return (
        <div id={patchNotesGroup.id} className="mb-24">
            <h2 className="mb-3 mt-8 font-header text-4xl">
                {patchNotesGroup.title}
            </h2>
            <div className="patch-notes-group-grid grid gap-16 sm:grid-cols-2 2xl:grid-cols-1 3xl:grid-cols-2">
                {patchNotesGroup.changes.map((c) => (
                    <PatchNotesChange
                        key={c.type + "-" + c.id}
                        patchNotesChange={c}
                        patchNotesStats={patchNotesStats}
                        championMatches={championMatches}
                        previousChampionMatches={previousChampionMatches}
                    />
                ))}
            </div>
        </div>
    );
}
