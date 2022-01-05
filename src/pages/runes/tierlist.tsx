import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import Table from "../../components/table/Table";
import RuneStats from "../../models/runes/RuneStats";
import { useRouter } from "next/router";
import { pickrate, winrate, winrateClass } from "../../utils/format";
import RuneApi from "../../api/RuneApi";
import { NextSeo } from "next-seo";
import MatchApi from "../../api/MatchApi";

export default function RuneTierlist({ runes, totalMatches }) {
  const router = useRouter();

  const data = useMemo(
    () => runes.filter((r) => RuneStats.isKeystone(r)),
    [runes]
  );

  const data2 = useMemo(
    () => runes.filter((r) => !RuneStats.isKeystone(r)),
    [runes]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Rune",
        accessor: "name",
        Cell: ({ row }) => (
          <div className="flex items-center">
            <img
              src={`/images/runes/32/${row.original.id}.webp`}
              style={{
                width: "32px",
                height: "32px",
                minHeight: "32px",
                minWidth: "32px",
              }}
              alt="Rune icon"
            />

            <span className="ml-2 block">{row.original.name}</span>
          </div>
        ),
      },
      {
        Header: "Winrate",
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
        Header: "Pickrate",
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
        accessor: (original) => original.champions,
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

  const keystoneTable = useTable(
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

  const normalTable = useTable(
    {
      columns,
      data: data2,
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

  const goToRune = (row) => router.push(`/runes/${row.original.id}`);

  return (
    <div>
      <NextSeo
        title="Rune tierlist"
        description="Rune tierlist with all League of Legends items."
      />

      <h2 className="font-header text-4xl mb-2">Keystones</h2>
      <div className="rounded-lg overflow-hidden shadow-lg mb-8">
        <Table table={keystoneTable} onClick={goToRune} />
      </div>
      <h2 className="font-header text-4xl mb-2">Runes</h2>
      <div className="rounded-lg overflow-hidden shadow-lg">
        <Table table={normalTable} onClick={goToRune} />
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const runes = RuneApi.getAllRunes().map(
    ({ id, name, matches, wins, championStats, tier }) => ({
      id,
      name,
      matches,
      wins,
      tier,
      champions: championStats.length,
    })
  );

  const totalMatches = MatchApi.getTotalMatches();

  return {
    props: {
      runes,
      totalMatches,
    },
  };
}

RuneTierlist.pageName = "Rune Tierlist";
