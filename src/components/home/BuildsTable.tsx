import { useMemo } from "react";
import Table from "../Table";
import { useRouter } from "next/router";
import { useTable, useSortBy } from "react-table";
import { getPlayrateIncrease, getWinrateIncrease } from "../../utils/builds";
import { percentage, winrate, winrateClass } from "../../utils/format";
import {
  ArrowSmRightIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "@heroicons/react/solid";
import Link from "next/link";

export default function BuildsTable({ builds, type = "winrate" }) {
  const router = useRouter();

  const data = useMemo(() => builds, [builds]);

  const isWinrate = type === "winrate";

  const columns = useMemo(
    () => [
      {
        Header: "Build",
        accessor: (row) => row.championId + "-" + row.buildTypeId,
        Cell: ({ row }) => (
          <div className="flex items-center">
            <img
              src={`/images/champions/32/${row.original.championId}.webp`}
              style={{
                width: "32px",
                height: "32px",
                minHeight: "32px",
                minWidth: "32px",
              }}
              className="mr-2"
              alt="Champion image"
            />
            <div className="relative">
              <img
                src={`/images/${
                  row.original.buildType === "ITEM" ? "items" : "runes"
                }/32/${row.original.buildTypeId}.webp`}
                style={{
                  width: "32px",
                  height: "32px",
                  minHeight: "32px",
                  minWidth: "32px",
                }}
                alt="BuildType image"
              />
              {row.original.order != null && (
                <div
                  className="ml-2 font-header absolute text-white right-[1px] bottom-0"
                  style={{
                    lineHeight: "0.75rem",
                    textShadow:
                      "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
                  }}
                >
                  {row.original.order + 1}
                </div>
              )}
            </div>
          </div>
        ),
      },
      {
        Header: isWinrate ? "WR increase" : "PR increase",
        accessor: (row) =>
          isWinrate ? getWinrateIncrease(row) : getPlayrateIncrease(row),
        Cell: ({ row }) => {
          const increase = isWinrate
            ? getWinrateIncrease(row.original)
            : getPlayrateIncrease(row.original);

          const TrendingIcon = increase > 0 ? TrendingUpIcon : TrendingDownIcon;

          return (
            <div className="flex justify-end">
              <div
                className={`text-xl flex items-center ${winrateClass(
                  0.5 + increase
                )}`}
              >
                <TrendingIcon className="w-5 h-5 inline mr-1" />
                {(Math.abs(increase) * 100).toFixed(2) + "%"}
              </div>
            </div>
          );
        },
      },
      {
        Header: isWinrate ? "Winrate" : "Playrate",
        accessor: (row) => (isWinrate ? row.wins / row.matches : row.playRate),
        Cell: ({ row }) => {
          const value = isWinrate
            ? winrate(row.original.wins, row.original.matches)
            : percentage(row.original.playRate);
          const previousValue = isWinrate
            ? winrate(row.original.previousWins, row.original.previousMatches)
            : percentage(row.original.previousPlayRate);

          return (
            <div className="flex items-end flex-col">
              <div>{value}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {previousValue}
              </div>
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useTable(
    {
      columns,
      data
    },
  );

  const gotoBuild = (row) =>
    router.push(
      `/${row.original.buildType === "ITEM" ? "items" : "runes"}/${
        row.original.buildTypeId
      }`
    );

  return (
    <div className="rounded overflow-hidden shadow mb-4">
      <Table table={table} onClick={gotoBuild} />
      <Link href="/builds" passHref>
        <a className="flex justify-center items-center w-full rounded-b p-2 text-lg shadow bg-gray-50 dark:text-gray-50 dark:bg-gray-800">
          <h2 className="font-header">View all builds</h2>
          <ArrowSmRightIcon className="w-8 inline text-gray-600 dark:text-gray-400" />
        </a>
      </Link>
    </div>
  );
}
