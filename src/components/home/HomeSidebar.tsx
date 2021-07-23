import ItemGridCell from "../items/ItemGridCell";
import BuildsTable from "./BuildsTable";

export default function HomeSidebar({ playrateBuilds, winrateBuilds }) {
  return (
    <div className="flex flex-col">
      <h3 className="font-header text-xl mb-1 mt-4">New items</h3>
      <div className="flex space-x-4">
        <ItemGridCell id={8001} size="sm" />
        <ItemGridCell id={3181} size="sm" />
      </div>

      <h3 className="font-header mt-4 mb-1 text-xl">
        Biggest playrate increases
      </h3>
      <BuildsTable builds={playrateBuilds} type="playrate"/>

      <h3 className="font-header mt-4 my-1 text-xl">
        Biggest winrate increases
      </h3>
      <BuildsTable builds={winrateBuilds} />
    </div>
  );
}

function SideBarPanel({ children = undefined, className = "", title }) {
  return (
    <div className="pb-4">
      <h3 className="font-header text-xl mb-1">{title}</h3>
      <div
        className={`rounded shadow bg-white p-4 mb-4 dark:bg-gray-900 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
