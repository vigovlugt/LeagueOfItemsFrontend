import { winrate, winrateClass } from "../../utils/format";
import ChampionIcon from "../ChampionIcon";
import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import Table from "../Table";
import { useRouter } from "next/router";

const nameByOrder = ["First", "Second", "Third", "Fourth", "Last"];

export default function ItemStatsByOrder({ orderStats }) {
  const router = useRouter();

  const data = useMemo(() => orderStats.championStats, []);

  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "name",
        Cell: ({ row }) => (
          <div className="flex items-center">
            <ChampionIcon id={row.original.championId} size="sm" />
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

  const goToChampion = (row) => router.push(`/champions/${row.original.championId}`);

  return (
    <>
      {/* General stats */}
      <div className="px-3 py-3 bg-white rounded text-center shadow">
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
        <div className="rounded-lg overflow-hidden shadow bg-white">
          <Table table={table} onClick={goToChampion} size="sm" />
        </div>
      </div>
    </>
  );
}