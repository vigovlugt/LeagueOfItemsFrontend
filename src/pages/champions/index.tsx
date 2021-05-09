import { NextSeo } from "next-seo";
import ChampionApi from "../../api/ChampionApi";
import ChampionGridCell from "../../components/champions/ChampionGridCell";
import ChampionStats from "../../models/champions/ChampionStats";

export default function ChampionIndex({ champions }) {
  champions = champions.map((i) => new ChampionStats(i));

  return (
    <div>
      <NextSeo
        title="Champions"
        description="See all League of Legends champions with data about both runes and items."
      />

      <h2 className="font-header text-4xl mb-2">Champions</h2>
      <div className="flex flex-wrap">
        {champions.map((c) => (
          <ChampionGridCell {...c} key={c.id} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const champions = ChampionApi.getAllChampions();

  return {
    props: {
      champions,
    },
  };
}

ChampionIndex.pageName = "Champions";
