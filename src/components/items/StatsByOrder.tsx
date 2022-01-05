import { pickrate, winrate, winrateClass } from "../../utils/format";
import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import Table from "../table/Table";
import { useRouter } from "next/router";

const nameByOrder = ["First", "Second", "Third", "Fourth", "Last"];

export default function StatsByOrder({
  orderStats,
  totalMatches,
  type = "champion",
  orderMatchesByChampion = null,
}) {
  const router = useRouter();

  const data = useMemo(
    () =>
      type === "champion" ? orderStats.championStats : orderStats.itemStats,
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "name",
        Cell: ({ row }) => (
          <img
            src={`/images/${type}s/32/${
              type === "champion"
                ? row.original.championId
                : row.original.itemId
            }.webp`}
            style={{
              height: "32px",
              width: "32px",
              minHeight: "32px",
              minWidth: "32px",
            }}
            alt="Image"
          />
        ),
        disableSortBy: true,
      },
      {
        Header: "Winrate",
        headerClass: "text-right",
        Cell: ({
          row: {
            original: { wins, matches },
          },
        }) => (
          <div
            className={`${winrateClass(wins, matches)} text-right w-full`}
            title={wins}
          >
            {winrate(wins, matches)}
          </div>
        ),
        accessor: "wins",
        sortType: (rowA, rowB) =>
          rowA.original.wins / rowA.original.matches -
          rowB.original.wins / rowB.original.matches,
        id: "winrate",
      },
      {
        Header: "Pickrate",
        headerClass: "text-right",
        cellClass: "text-right",
        accessor: "pickrate",
        sortType: orderMatchesByChampion
          ? (rowA, rowB) =>
              rowA.original.matches /
                orderMatchesByChampion[rowA.original.championId] -
              rowB.original.matches /
                orderMatchesByChampion[rowB.original.championId]
          : (rowA, rowB) => rowA.original.matches - rowB.original.matches,
        Cell: ({
          row: {
            original: { matches, championId },
          },
        }) => (
          <div className="text-right w-full" title={matches}>
            {pickrate(
              matches,
              orderMatchesByChampion
                ? orderMatchesByChampion[championId]
                : orderStats.matches
            )}
          </div>
        ),
      },
    ],
    []
  );

  const table = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [
          {
            id: "pickrate",
            desc: true,
          },
        ],
      },
    },
    useSortBy
  );

  const goToChampion = (row) =>
    router.push(`/champions/${row.original.championId}`);
  const goToItem = (row) => router.push(`/items/${row.original.itemId}`);
  const goTo = type === "champion" ? goToChampion : goToItem;

  return (
    <>
      {/* General stats */}
      <div className="px-3 py-3 rounded text-center shadow bg-white dark:bg-gray-900">
        <h3 className="text-xl font-header font-medium mb-1">
          {nameByOrder[orderStats.order]} item
        </h3>
        <div className="flex justify-around">
          <span className="text-center">
            <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 whitespace-nowrap block">
              Winrate
            </span>
            <span
              className={`font-bold text-lg ${winrateClass(
                orderStats.wins,
                orderStats.matches
              )}`}
            >
              {winrate(orderStats.wins, orderStats.matches)}
            </span>
          </span>
          <span className="text-center">
            <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 whitespace-nowrap block">
              Games
            </span>
            <span
              className="text-center font-bold text-lg"
              title={orderStats.matches}
            >
              {pickrate(orderStats.matches, totalMatches)}
            </span>
          </span>
        </div>
      </div>

      {/* Champion stats */}
      <div>
        <div className="rounded-lg overflow-hidden mb-4 shadow bg-white dark:bg-dark">
          <Table table={table} onClick={goTo} size="sm" />
        </div>
      </div>
    </>
  );
}
