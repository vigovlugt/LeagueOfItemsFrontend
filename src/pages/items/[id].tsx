import Image from "next/image";
import ItemApi from "../../api/ItemApi";
import ItemStats from "../../models/ItemStats";
import { winrate, winrateClass } from "../../utils/format";
import ItemStatsByOrder from "../../components/items/ItemStatsByOrder";
import ChampionCard from "../../components/ChampionCard";
import { NextSeo } from "next-seo";

export default function ItemPage({ item }) {
  item = new ItemStats(item);

  return (
    <div className="flex flex-col">
      <NextSeo
        title={item.name}
        description={`See ${item.name}'s best champions and winrate statistics. Data from U.GG.`}
      />

      <div className="flex mb-4 w-full">
        <div className="w-[256px] h-[256px] mr-4 flex-shrink-0">
          <Image
            className="cursor-pointer"
            src={`/images/items/${item.id}.png`}
            width={256}
            height={256}
            quality={100}
          />
        </div>
        <div className="flex flex-col w-full">
          <h2 className="text-5xl font-header font-medium">{item.name}</h2>
          <p className="text-lg font-header mb-4 text-gray-600">
            {item.plaintext}
          </p>
          <div className="grid grid-cols-2 gap-3 mb-4 w-1/2">
            <div className="bg-white rounded p-4 text-lg text-center font-bold text-gray-600 shadow">
              <span
                className={`text-gray-900 ${winrateClass(
                  item.wins,
                  item.matches
                )}`}
              >
                {winrate(item.wins, item.matches)}
              </span>{" "}
              Winrate
            </div>
            <div className="bg-white rounded p-4 text-lg text-center font-bold text-gray-600 shadow">
              <span className="text-gray-900">{item.matches}</span> Matches
            </div>
            <div className="bg-white rounded p-4 text-lg text-center font-bold text-gray-600 shadow">
              <span className="text-gray-900">{item.championStats.length}</span>{" "}
              Champions
            </div>
          </div>
        </div>
      </div>

      {/* Highest winrate champions */}
      <div>
        <h2 className="text-2xl font-header font-medium mb-1">
          Highest winrate champions
        </h2>
        <div className="flex space-x-2 w-full overflow-x-auto pb-2">
          {item.championStats
            .sort((a, b) => b.wins / b.matches - a.wins / a.matches)
            .map((championStats, i) => (
              <ChampionCard key={i} {...championStats} />
            ))}
        </div>
      </div>

      {/* Winrate by order */}
      <div className="mt-4">
        <h2 className="text-2xl font-header font-medium mb-1">
          Stats by order
        </h2>
        <div
          className="grid grid-cols-5 grid-flow-col gap-2"
          style={{ gridTemplateRows: "auto auto" }}
        >
          {item.orderStats.map((stats) => (
            <ItemStatsByOrder key={Math.random()} orderStats={stats} />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const items = await ItemApi.getAllItems();

  return {
    paths: items.map((i) => ({ params: { id: "" + i.id } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const item = await ItemApi.getItem(params.id);

  return {
    props: {
      item,
    },
  };
}

ItemPage.pageName = ({ item }) => item.name;
