import {useMemo} from "react";
import {useTable, useSortBy} from "react-table";
import Table from "../../components/Table";
import Image from "next/image";
import {useRouter} from "next/router";
import {winrate, winrateClass} from "../../utils/format";
import {NextSeo} from "next-seo";
import ChampionStats from "../../models/champions/ChampionStats";
import ChampionApi from "../../api/ChampionApi";

export default function ChampionTierlist({champions}) {
  const router = useRouter();

  const data = useMemo(() => champions.map((i) => new ChampionStats(i)), []);

  const columns = useMemo(
    () => [
      {
        Header: "Champion",
        accessor: "champion",
        Cell: ({row}) => (
          <div className="flex items-center">
            <Image
              className="champion-image"
              src={`/images/champions/${row.original.id}.png`}
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
                   original: {wins, matches},
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

      <Table table={table} onClick={goToChampion}/>
    </div>
  );
}

export async function getStaticProps(context) {
  const champions = await ChampionApi.getAllChampions();

  return {
    props: {
      champions,
    },
  };
}

ChampionTierlist.pageName = "Champion Tierlist";
