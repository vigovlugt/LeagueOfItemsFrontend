import formatDistance from "date-fns/formatDistance";

import dataset from "../../../data/dataset.json";

export default function SideNavFooter() {
  return (
    <div className="p-2 mt-auto border-t border-gray-200 text-gray-600">
      Last update{" "}
      {formatDistance(new Date(dataset.date), new Date(), {
        addSuffix: true,
      })}
    </div>
  );
}
