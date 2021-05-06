import { winrate, winrateClass } from "../../utils/format";
import ChampionIcon from "../ChampionIcon";
import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import Table from "../Table";
import { useRouter } from "next/router";
import Image from "next/image";

const nameByOrder = ["First", "Second", "Third", "Fourth", "Last"];

export default function StatsByOrder({ orderStats, type = "champion" }) {
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
          <div className="flex items-center">
            {type === "champion" ? (
              <ChampionIcon id={row.original.championId} size="sm" />
            ) : (
              <Image
                height={32}
                width={32}
                src={`/images/items/${row.original.itemId}.png`}
              />
            )}
          </div>
        ),
        disableSortBy: true,
      },
      {
        Header: "Winrate",
        Cell: ({
          row: {
            original: { wins, matches },
          },
        }) => (
          <span className={`${winrateClass(wins, matches)}`}>
            {winrate(wins, matches)}
          </span>
        ),
        accessor: "wins",
        sortType: (rowA, rowB) =>
          rowA.original.wins / rowA.original.matches -
          rowB.original.wins / rowB.original.matches,
        id: "winrate",
      },
      {
        Header: "Matches",
        accessor: "matches",
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
            id: "winrate",
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
          <p
            className={`text-center font-bold text-lg ${winrateClass(
              orderStats.wins,
              orderStats.matches
            )}`}
          >
            {winrate(orderStats.wins, orderStats.matches)}
          </p>
          <p className="text-center font-bold text-lg">{orderStats.matches}</p>
        </div>
      </div>

      {/* Champion stats */}
      <div>
        <div className="rounded-lg overflow-hidden shadow bg-white dark:bg-dark">
          <Table table={table} onClick={goTo} size="sm" />
        </div>
      </div>
    </>
  );
}
