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
        className="hidden items-center justify-center rounded bg-white p-2 text-lg shadow dark:bg-gray-900 dark:text-gray-50 2xl:flex"
        onClick={(e) => scrollToId("patch-overview", e)}
      >
        <h2 className="font-header text-lg">Patch overview</h2>
        <ArrowSmDownIcon className="inline w-8 text-gray-600 dark:text-gray-400" />
      </a>

      <a
        href="#patch-rundown"
        className="mt-4 hidden items-center justify-center rounded bg-white p-2 text-lg shadow dark:bg-gray-900 dark:text-gray-50 2xl:flex"
        onClick={(e) => scrollToId("patch-rundown", e)}
      >
        <h2 className="font-header text-lg">Patch notes</h2>
        <ArrowSmDownIcon className="inline w-8 text-gray-600 dark:text-gray-400" />
      </a>

      <h3 className="mt-4 mb-1 font-header text-xl">
        Biggest pickrate increases
      </h3>
      <BuildsTable builds={pickrateBuilds} type="pickrate" size="sm" />

      <h3 className="my-1 mt-4 font-header text-xl">
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
      <h3 className="mb-1 font-header text-xl">{title}</h3>
      <div
        className={`mb-4 rounded bg-white p-4 shadow dark:bg-gray-900 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
