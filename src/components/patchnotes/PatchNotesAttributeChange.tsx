import { decode } from "html-entities";

export default function PatchNotesAttributeChange({
    attribute,
    changeType,
    before,
    after,
    removed,
}) {
    changeType = (changeType || "updated").toLowerCase();

    return (
        <div className="mb-2 items-center text-sm font-medium text-gray-600 dark:text-gray-400">
            {changeType != "updated" && (
                <span
                    className={`mr-2 p-1 text-[.6rem] uppercase tracking-widest text-white ${getChangeTypeColor(
                        changeType
                    )}`}
                >
                    {changeType}
                </span>
            )}
            <span className="mr-2 uppercase">{decode(attribute)}:</span>
            {before && <span className="line-through">{decode(before)}</span>}
            {before && <span className="mx-2 text-white">⇒</span>}
            {after && <span className="text-white">{decode(after)}</span>}
            {removed && <span className="line-through">{decode(removed)}</span>}
        </div>
    );
}

function getChangeTypeColor(changeType) {
    const changeTypeByColor = {
        updated: "bg-patchnotes-updated",
        new: "bg-patchnotes-new",
        removed: "bg-patchnotes-removed",
    };

    return changeTypeByColor[changeType];
}
