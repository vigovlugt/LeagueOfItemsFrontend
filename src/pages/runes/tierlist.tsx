import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import Table from "../../components/Table";
import RuneStats from "../../models/runes/RuneStats";
import { useRouter } from "next/router";
import { pickrate, winrate, winrateClass } from "../../utils/format";
import RuneApi from "../../api/RuneApi";
import { NextSeo } from "next-seo";
import MatchApi from "../../api/MatchApi";

export default function RuneTierlist({ runes, totalMatches }) {
  const router = useRouter();

  const data = useMemo(
    () => runes.map((r) => new RuneStats(r)).filter((r) => r.isKeystone()),
    []
  );
  const data2 = useMemo(
    () => runes.map((r) => new RuneStats(r)).filter((r) => !r.isKeystone()),
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Rune",
        accessor: "name",
        Cell: ({ row }) => (
          <div className="flex items-center">
            <img
              src={`/images/runes/32/${row.original.id}.png`}
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
  const runes = RuneApi.getAllRunes();

  const totalMatches = MatchApi.getTotalMatches();

  return {
    props: {
      runes,
      totalMatches,
    },
  };
}

RuneTierlist.pageName = "Rune Tierlist";
