import ItemApi from "../../api/ItemApi";
import ItemStats from "../../models/items/ItemStats";
import { pickrate, winrate, winrateClass } from "../../utils/format";
import StatsByOrder from "../../components/items/StatsByOrder";
import Card from "../../components/Card";
import { NextSeo } from "next-seo";
import { useState } from "react";
import ItemModal from "../../components/items/ItemModal";
import PageHeader from "../../components/PageHeader";
import ChampionApi from "../../api/ChampionApi";
import { CHAMPIONS_PER_MATCH } from "../../constants/constants";
import MatchApi from "../../api/MatchApi";

export default function ItemPage({ item, totalMatches }) {
  item = new ItemStats(item);

  const [modalIsOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <NextSeo
        title={item.name}
        description={`See ${item.name}'s best champions and winrate statistics. Data from U.GG.`}
      />

      <ItemModal isOpen={modalIsOpen} setIsOpen={setModalOpen} item={item} />

      <PageHeader
        type="item"
        id={item.id}
        setModalOpen={setModalOpen}
        hasModal
        name={item.name}
        description={item.plaintext}
      >
        <div className="grid grid-cols-2 gap-3 mb-4 xl:w-1/2">
          <div className="bg-white rounded p-4 text-lg text-center font-bold text-gray-600 shadow dark:text-gray-400 dark:bg-gray-800">
            <span className={winrateClass(item.wins, item.matches)}>
              {winrate(item.wins, item.matches)}
            </span>{" "}
            Winrate
          </div>
          <div className="bg-white rounded p-4 text-lg text-center font-bold text-gray-600 shadow dark:text-gray-400 dark:bg-gray-800">
            <span className="text-gray-900 dark:text-white">
              {pickrate(item.matches, totalMatches)}
            </span>{" "}
            Matches
          </div>
          <div className="bg-white rounded p-4 text-lg text-center font-bold text-gray-600 shadow dark:text-gray-400 dark:bg-gray-800">
            <span className="text-gray-900 dark:text-white">
              {item.championStats.length}
            </span>{" "}
            Champions
          </div>
        </div>
      </PageHeader>

      {/* Highest winrate champions */}
      <div>
        <h2 className="text-2xl font-header font-medium mb-1">
          Highest winrate champions
        </h2>
        <div className="flex space-x-2 w-full overflow-x-auto pb-2">
          {item.championStats
            .sort((a, b) => b.wins / b.matches - a.wins / a.matches)
            .map((championStats) => (
              <Card
                key={championStats.championId}
                type={"champion"}
                {...championStats}
                totalMatches={item.matches}
                id={championStats.championId}
              />
            ))}
        </div>
      </div>

      {/* Winrate by order */}
      <div className="mt-4">
        <h2 className="text-2xl font-header font-medium mb-1">
          Stats by order
        </h2>
        <div
          className="grid grid-cols-1 grid-flow-row xl:grid-flow-col xl:grid-cols-5 gap-2"
          style={{ gridTemplateRows: "auto auto" }}
        >
          {item.orderStats.map((stats) => (
            <StatsByOrder
              key={Math.random()}
              totalMatches={item.matches}
              orderStats={stats}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const items = ItemApi.getAllItems();

  return {
    paths: items.map((i) => ({ params: { id: "" + i.id } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const item = ItemApi.getItem(params.id);

  const totalMatches = MatchApi.getTotalMatches();

  return {
    props: {
      item,
      totalMatches,
    },
  };
}

ItemPage.pageName = ({ item }) => item.name;
