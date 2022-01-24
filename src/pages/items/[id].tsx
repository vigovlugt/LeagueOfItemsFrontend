import ItemApi from "../../api/ItemApi";
import ItemStats from "../../models/items/ItemStats";
import { pickrate, winrate, winrateClass } from "../../utils/format";
import StatsByOrder from "../../components/items/StatsByOrder";
import Card from "../../components/Card";
import { NextSeo } from "next-seo";
import { useState } from "react";
import ItemModal from "../../components/items/ItemModal";
import PageHeader from "../../components/PageHeader";
import MatchApi from "../../api/MatchApi";
import usePageView from "../../hooks/usePageView";
import HelpHover from "../../components/HelpHover";
import {
  ITEM_PICKRATE_HELPER_TEXT,
  ITEM_WINRATE_HELPER_TEXT,
} from "../../constants/constants";
import ChampionApi from "../../api/ChampionApi";
import StatsCard from "../../components/StatsCard";

export default function ItemPage({
  item,
  totalMatches,
  previousTotalMatches,
  matchesByChampion,
  orderMatchesByChampion,
}) {
  item = new ItemStats(item);

  const [modalIsOpen, setModalOpen] = useState(false);

  usePageView("ITEM", item.id);

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
          <StatsCard {...item} entityType="item" />
          <StatsCard
            {...item}
            totalMatches={totalMatches}
            previousTotalMatches={previousTotalMatches}
            type="pickrate"
            entityType="item"
          />

          <div className="bg-white rounded p-4 text-lg text-center font-bold text-gray-600 shadow dark:text-gray-400 dark:bg-gray-800">
            <span className="text-gray-900 dark:text-white">
              {pickrate(item.matches, totalMatches)}
            </span>{" "}
            Pickrate
            <HelpHover text={ITEM_PICKRATE_HELPER_TEXT} />
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
                totalMatches={matchesByChampion[championStats.championId]}
                id={championStats.championId}
              />
            ))}
        </div>
      </div>

      {/* Highest pickrate champions */}
      <div>
        <h2 className="text-2xl font-header font-medium mb-1 mt-4">
          Highest pickrate champions
        </h2>
        <div className="flex space-x-2 w-full overflow-x-auto pb-2">
          {item.championStats
            .sort(
              (a, b) =>
                b.matches / matchesByChampion[b.championId] -
                a.matches / matchesByChampion[a.championId]
            )
            .map((championStats) => (
              <Card
                key={championStats.championId}
                type={"champion"}
                {...championStats}
                totalMatches={matchesByChampion[championStats.championId]}
                id={championStats.championId}
              />
            ))}
        </div>
      </div>

      {/* Winrate by order */}
      <div className="mt-4">
        <h2 className="text-2xl font-header font-medium mb-1">
          Champion stats by order
        </h2>
        <div
          className="grid grid-cols-1 grid-flow-row xl:grid-flow-col xl:grid-cols-5 gap-2"
          style={{ gridTemplateRows: "auto auto" }}
        >
          {item.orderStats.map((stats, i) => (
            <StatsByOrder
              key={Math.random()}
              totalMatches={item.matches}
              orderStats={stats}
              orderMatchesByChampion={Object.keys(
                orderMatchesByChampion
              ).reduce(
                (agg, key) => ({
                  ...agg,
                  [key]: orderMatchesByChampion[key][i],
                }),
                {}
              )}
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
  const previousTotalMatches = MatchApi.getPreviousTotalMatches();

  const matchesByChampion = ChampionApi.getMatchesByChampion();
  const orderMatchesByChampion = ChampionApi.getOrderMatchesByChampion();

  return {
    props: {
      item,
      totalMatches,
      previousTotalMatches,
      matchesByChampion,
      orderMatchesByChampion,
    },
  };
}

ItemPage.pageName = ({ item }) => item.name;
ItemPage.favouriteType = () => "ITEM";
ItemPage.favouriteId = ({ item }) => item.id;
