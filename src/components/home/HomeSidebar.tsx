import ItemGridCell from "../items/ItemGridCell";
import BuildsTable from "./BuildsTable";
import RuneGridCell from "../runes/RuneGridCell";
import HelpHover from "../HelpHover";
import { ArrowSmDownIcon, ArrowSmRightIcon } from "@heroicons/react/solid";
import Link from "next/link";

export default function HomeSidebar({ pickrateBuilds, winrateBuilds }) {
  const scrollToId = (id, e) => {
    e.preventDefault();
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col">
      <a
        href="#patch-overview"
        className="hidden 2xl:flex justify-center items-center bg-white rounded p-2 text-lg shadow dark:text-gray-50 dark:bg-gray-900"
        onClick={(e) => scrollToId("patch-overview", e)}
      >
        <h2 className="font-header text-lg">Patch overview</h2>
        <ArrowSmDownIcon className="w-8 inline text-gray-600 dark:text-gray-400" />
      </a>

      <a
        href="#patch-rundown"
        className="hidden 2xl:flex justify-center items-center bg-white rounded p-2 text-lg shadow mt-4 dark:text-gray-50 dark:bg-gray-900"
        onClick={(e) => scrollToId("patch-rundown", e)}
      >
        <h2 className="font-header text-lg">Patch notes</h2>
        <ArrowSmDownIcon className="w-8 inline text-gray-600 dark:text-gray-400" />
      </a>

      <h3 className="font-header mt-4 mb-1 text-xl">
        Biggest pickrate increases
      </h3>
      <BuildsTable builds={pickrateBuilds} type="pickrate" size="sm" />

      <h3 className="font-header mt-4 my-1 text-xl">
        Biggest winrate increases
        <HelpHover text="500 Match minimum" />
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
