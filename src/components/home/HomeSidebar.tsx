import ItemGridCell from "../items/ItemGridCell";
import BuildsTable from "./BuildsTable";
import RuneGridCell from "../runes/RuneGridCell";

export default function HomeSidebar({ pickrateBuilds, winrateBuilds }) {
  return (
    <div className="flex flex-col">
      <h3 className="font-header text-xl mb-1 mt-4">New content</h3>
      <div className="flex flex-wrap justify-left">
        <ItemGridCell id={3001} size="sm" className="mr-[6px] mb-[6px]" />
        <ItemGridCell id={4644} size="sm" className="mr-[6px] mb-[6px]" />
        <ItemGridCell id={6696} size="sm" className="mr-[6px] mb-[6px]" />
        <ItemGridCell id={4645} size="sm" className="mr-[6px] mb-[6px]" />
        <ItemGridCell id={3119} size="sm" className="mr-[6px] mb-[6px]" />
        <RuneGridCell id={8369} size="sm" className="mr-[6px] mb-[6px]" />
        <RuneGridCell id={8351} size="sm" className="mr-[6px] mb-[6px]" />
        <RuneGridCell id={8008} size="sm" className="mr-[6px] mb-[6px]" />
      </div>

      <h3 className="font-header mt-4 mb-1 text-xl">
        Biggest pickrate increases
      </h3>
      <BuildsTable builds={pickrateBuilds} type="pickrate" size="sm" />

      <h3 className="font-header mt-4 my-1 text-xl">
        Biggest winrate increases
      </h3>
      <BuildsTable builds={winrateBuilds} size="sm" type="winrate" />
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
