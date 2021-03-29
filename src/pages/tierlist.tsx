import ItemApi from "../api/ItemApi";
import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import Table from "../components/Table";
import ItemStats from "../models/ItemStats";
import Image from "next/image";
import { useRouter } from "next/router";
import { winrate, winrateClass } from "../utils/format";
import { NextSeo } from "next-seo";

export default function Tierlist({ items }) {
  const router = useRouter();

  const data = useMemo(() => items.map((i) => new ItemStats(i)), []);

  const columns = useMemo(
    () => [
      {
        Header: "Item",
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

  const goToItem = (row) => router.push(`/items/${row.original.id}`);

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <NextSeo
        title="Item tierlist"
        description="Item tierlist with all League of Legends items."
      />

      <Table table={table} onClick={goToItem} />
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
