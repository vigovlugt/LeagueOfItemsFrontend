import ItemApi from "../api/ItemApi";
import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import Table from "../components/table/Table";
import ItemStats from "../models/items/ItemStats";
import { useRouter } from "next/router";
import { pickrate, winrate, winrateClass } from "../utils/format";
import { NextSeo } from "next-seo";
import MatchApi from "../api/MatchApi";
import HelpHover from "../components/HelpHover";
import {ITEM_PICKRATE_HELPER_TEXT, ITEM_WINRATE_HELPER_TEXT} from "../constants/constants";

export default function Tierlist({ items, totalMatches }) {
  const router = useRouter();

  const data = useMemo(() => items.map((i) => new ItemStats(i)), [items]);

  const columns = useMemo(
    () => [
      {
        Header: "Item",
        accessor: "name",
        Cell: ({ row }) => (
          <div className="flex items-center">
            <img
              src={`/images/items/32/${row.original.id}.webp`}
              style={{
                width: "32px",
                height: "32px",
                minHeight: "32px",
                minWidth: "32px",
              }}
              alt="Item image"
            />

            <span className="ml-2 block">{row.original.name}</span>
          </div>
        ),
      },
      {
        Header: () => <>Winrate<HelpHover text={ITEM_WINRATE_HELPER_TEXT}/></>,
        headerClass: "text-right",
        cellClass: "text-right",
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
        Header: () => <>Pickrate<HelpHover text={ITEM_PICKRATE_HELPER_TEXT}/></>,
        headerClass: "text-right",
        cellClass: "text-right",
        Cell: ({
          row: {
            original: { matches },
          },
        }) => <span>{pickrate(matches, totalMatches)}</span>,
        accessor: "matches",
        sortType: (rowA, rowB) => rowA.original.matches - rowB.original.matches,
        id: "pickrate",
      },
      {
        Header: "Champions",
        headerClass: "text-right",
        cellClass: "text-right",
        accessor: (original) => original.championStats.length,
        id: "champions",
      },
      {
        Header: "Matches",
        headerClass: "text-right",
        cellClass: "text-right",
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
            id: "pickrate",
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
  const items = ItemApi.getAllItems();

  const totalMatches = MatchApi.getTotalMatches();

  return {
    props: {
      items,
      totalMatches,
    },
  };
}

Tierlist.pageName = "Tierlist";
