import ItemApi from "../api/ItemApi";
import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import ItemStats from "../models/ItemStats";
import Image from "next/image";
import { useRouter } from "next/router";
import { winrate, winrateClass } from "../utils/format";

export default function Tierlist({ items }) {
  const router = useRouter();

  const data = useMemo(() => items.map((i) => new ItemStats(i)), []);

  const columns = useMemo(
    () => [
      {
        Header: "ItemStats",
        accessor: "name",
        Cell: ({ row }) => (
          <div className="flex items-center">
            <Image
              src={`/images/items/${row.original.id}.png`}
              height={32}
              width={32}
            />
            <span className="ml-2 block">{row.original.name}</span>
          </div>
        ),
      },
      {
        Header: "Overall winrate",
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
        Header: "Champions",
        accessor: (original) => original.championStats.length,
        id: "champions",
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

  const goToItem = (id) => router.push(`/items/${id}`);

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <table
        {...table.getTableProps()}
        className="min-w-full divide-y divide-gray-200 font-semibold"
      >
        <thead className="bg-gray-50">
          {table.headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " ▼"
                        : " ▲"
                      : "\u00A0\u00A0"}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...table.getTableBodyProps()}
          className="bg-white divide-y divide-gray-200"
        >
          {table.rows.map((row) => {
            table.prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={() => goToItem(row.original.id)}
                className="cursor-pointer"
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 whitespace-nowrap w-[1%]"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export async function getStaticProps(context) {
  const items = await ItemApi.getAllItems();

  return {
    props: {
      items,
    },
  };
}

Tierlist.pageName = "Tierlist";
