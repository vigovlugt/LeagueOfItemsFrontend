import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import Table from "../../components/Table";
import { useRouter } from "next/router";
import { pickrate, winrate, winrateClass } from "../../utils/format";
import { NextSeo } from "next-seo";
import ChampionStats from "../../models/champions/ChampionStats";
import ChampionApi from "../../api/ChampionApi";
import MatchApi from "../../api/MatchApi";

export default function ChampionTierlist({ champions, totalMatches }) {
  const router = useRouter();

  const data = useMemo(() => champions.map((i) => new ChampionStats(i)), [
    champions,
  ]);

  const columns = useMemo(
    () => [
      {
        Header: "Champion",
        accessor: "champion",
        Cell: ({ row }) => (
          <div className="flex items-center">
            <img
              src={`/images/champions/32/${row.original.id}.png`}
              style={{
                width: "32px",
                height: "32px",
                minHeight: "32px",
                minWidth: "32px",
              }}
              alt="Champion image"
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
        Header: "Items",
        accessor: (original) => original.itemStats.length,
        id: "items",
      },
      {
        Header: "Runes",
        accessor: (original) => original.runeStats.length,
        id: "runes",
      },
      {
        Header: "Roles",
        accessor: (original) => original.roleStats.length,
        id: "roles",
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

  const goToChampion = (row) => router.push(`/champions/${row.original.id}`);

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <NextSeo
        title="Champion tierlist"
        description="League of Legends champion tierlist."
      />

      <Table table={table} onClick={goToChampion} />
    </div>
  );
}

export async function getStaticProps(context) {
  const champions = ChampionApi.getAllChampions();
  const totalMatches = MatchApi.getTotalMatches();

  return {
    props: {
      champions,
      totalMatches,
    },
  };
}

ChampionTierlist.pageName = "Champion Tierlist";
