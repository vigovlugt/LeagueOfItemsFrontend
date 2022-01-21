import {decode} from "html-entities";

export default function PatchNotesAttributeChange({
  attribute,
  changeType,
  before,
  after,
  removed,
}) {
  changeType = (changeType || "updated").toLowerCase();

  return (
    <div className="items-center text-gray-600 dark:text-gray-400 font-medium text-sm mb-2">
      {changeType != "updated" && (
        <span
          className={`uppercase text-white text-[.6rem] mr-2 p-1 tracking-widest ${getChangeTypeColor(
            changeType
          )}`}
        >
          {changeType}
        </span>
      )}
      <span className="uppercase mr-2">{decode(attribute)}:</span>
      {before && <span className="line-through">{decode(before)}</span>}
      {before && <span className="text-white mx-2">⇒</span>}
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
