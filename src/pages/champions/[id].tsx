import { pickrate, winrate, winrateClass } from "../../utils/format";
import Card from "../../components/Card";
import { NextSeo } from "next-seo";
import ChampionStats from "../../models/champions/ChampionStats";
import ChampionApi from "../../api/ChampionApi";
import StatsByOrder from "../../components/items/StatsByOrder";
import RuneApi from "../../api/RuneApi";
import ItemApi from "../../api/ItemApi";
import ChampionRoles from "../../components/champions/ChampionRoles";
import ChampionModal from "../../components/champions/ChampionModal";
import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import MatchApi from "../../api/MatchApi";

export default function ChampionPage({ champion, runes, items, totalMatches }) {
  champion = new ChampionStats(champion);

  const [modalIsOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <NextSeo
        title={champion.name}
        description={`See ${champion.name}'s best items, runes and winrate statistics. Data from U.GG.`}
      />

      <ChampionModal
        isOpen={modalIsOpen}
        setIsOpen={setModalOpen}
        champion={champion}
      />

      <PageHeader
        type="champion"
        id={champion.id}
        setModalOpen={setModalOpen}
        hasModal
        name={champion.name}
        description={champion.blurb}
      >
        <div className="flex flex-col lg:flex-row">
          <div className="grid grid-cols-2 gap-3 lg:w-1/2 mr-3 mb-4 lg:mb-0">
            <div className="flex items-center justify-center bg-white rounded p-4 text-lg font-bold text-gray-600 shadow dark:text-gray-400 dark:bg-gray-800">
              <span
                className={`${winrateClass(
                  champion.wins,
                  champion.matches
                )} mr-1`}
              >
                {winrate(champion.wins, champion.matches)}
              </span>
              Winrate
            </div>
            <div
              className="flex items-center justify-center bg-white rounded p-4 text-lg font-bold text-gray-600 shadow dark:text-gray-400 dark:bg-gray-800"
              title={champion.matches}
            >
              <span className="text-gray-900 dark:text-white mr-1">
                {pickrate(champion.matches, totalMatches)}
              </span>{" "}
              Pickrate
            </div>
            <div className="flex items-center justify-center bg-white rounded p-4 text-lg font-bold text-gray-600 shadow dark:text-gray-400 dark:bg-gray-800">
              <span className="text-gray-900 dark:text-white mr-1">
                {champion.itemStats.length}
              </span>{" "}
              Items
            </div>
            <div className="flex items-center justify-center bg-white rounded p-4 text-lg font-bold text-gray-600 shadow dark:text-gray-400 dark:bg-gray-800">
              <span className="text-gray-900 dark:text-white mr-1">
                {champion.runeStats.length}
              </span>{" "}
              Runes
            </div>
          </div>
          <ChampionRoles
            roleStats={champion.roleStats}
            totalMatches={champion.matches}
          />
        </div>
      </PageHeader>

      {/* Highest winrate items */}
      <h2 className="text-2xl font-header font-medium mb-1">
        Highest winrate items
      </h2>
      <div className="flex flex-col lg:flex-row lg:space-x-8 mb-4">
        <div className="lg:max-w-1/2">
          <div className="flex space-x-2 w-full overflow-x-auto pb-2">
            {champion.itemStats
              .filter(
                (stats) =>
                  items.find((item) => item.id == stats.itemId).isMythic
              )
              .sort((a, b) => b.wins / b.matches - a.wins / a.matches)
              .map((itemStats) => (
                <Card
                  key={itemStats.itemId}
                  type={"item"}
                  {...itemStats}
                  totalMatches={champion.matches}
                  id={itemStats.itemId}
                />
              ))}
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="flex space-x-2 w-full overflow-x-auto pb-2">
            {champion.itemStats
              .filter(
                (stats) =>
                  !items.find((item) => item.id == stats.itemId).isMythic
              )
              .sort((a, b) => b.wins / b.matches - a.wins / a.matches)
              .map((itemStats) => (
                <Card
                  key={itemStats.itemId}
                  type={"item"}
                  {...itemStats}
                  totalMatches={champion.matches}
                  id={itemStats.itemId}
                />
              ))}
          </div>
        </div>
      </div>

      {/* Highest winrate runes */}
      <h2 className="text-2xl font-header font-medium mb-1">
        Highest winrate runes
      </h2>
      <div className="flex flex-col lg:flex-row lg:space-x-8 mb-4">
        <div className="lg:max-w-1/2">
          <div className="flex space-x-2 w-full overflow-x-auto pb-2">
            {champion.runeStats
              .filter(
                (stats) =>
                  runes.find((rune) => rune.id == stats.runeId).tier === 0
              )
              .sort((a, b) => b.wins / b.matches - a.wins / a.matches)
              .map((runeStats) => (
                <Card
                  key={runeStats.runeId}
                  type={"rune"}
                  {...runeStats}
                  totalMatches={champion.matches}
                  id={runeStats.runeId}
                />
              ))}
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="flex space-x-2 w-full overflow-x-auto pb-2">
            {champion.runeStats
              .filter(
                (stats) =>
                  runes.find((rune) => rune.id == stats.runeId).tier !== 0
              )
              .sort((a, b) => b.wins / b.matches - a.wins / a.matches)
              .map((runeStats) => (
                <Card
                  key={runeStats.runeId}
                  type={"rune"}
                  {...runeStats}
                  totalMatches={champion.matches}
                  id={runeStats.runeId}
                />
              ))}
          </div>
        </div>
      </div>

      {/* Winrate by order */}
      <div>
        <h2 className="text-2xl font-header font-medium mb-1">
          Stats by order
        </h2>
        <div
          className="grid grid-cols-1 grid-flow-row xl:grid-flow-col xl:grid-cols-5 gap-2"
          style={{ gridTemplateRows: "auto auto" }}
        >
          {champion.orderStats.map((stats) => (
            <StatsByOrder
              key={Math.random()}
              totalMatches={champion.matches}
              type={"items"}
              orderStats={stats}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const champions = ChampionApi.getAllChampions();

  return {
    paths: champions.map((i) => ({ params: { id: "" + i.id } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const champion = ChampionApi.getChampion(params.id);
  const runes = RuneApi.getAllRunes();
  const items = ItemApi.getAllItems();

  const totalMatches = MatchApi.getTotalMatches();

  return {
    props: {
      champion,
      totalMatches,
      runes: runes.map(({ id, tier }) => ({ id, tier })),
      items: items.map(({ id, description }) => ({
        id,
        isMythic: description.includes("rarityMythic"),
      })),
    },
  };
}

ChampionPage.pageName = ({ champion }) => champion.name;
