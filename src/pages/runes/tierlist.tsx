import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import Table from "../../components/Table";
import RuneStats from "../../models/runes/RuneStats";
import Image from "next/image";
import { useRouter } from "next/router";
import { winrate, winrateClass } from "../../utils/format";
import RuneApi from "../../api/RuneApi";
import {NextSeo} from "next-seo";

export default function RuneTierlist({ runes }) {
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
            <Image
              src={`/images/runes/${row.original.id}.png`}
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
  const runes = await RuneApi.getAllRunes();

  return {
    props: {
      runes,
    },
  };
}

RuneTierlist.pageName = "Rune Tierlist";
