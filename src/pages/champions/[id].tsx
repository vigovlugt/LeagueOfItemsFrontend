import Image from "next/image";
import { winrate, winrateClass } from "../../utils/format";
import Card from "../../components/Card";
import { NextSeo } from "next-seo";
import ChampionStats from "../../models/champions/ChampionStats";
import ChampionApi from "../../api/ChampionApi";
import StatsByOrder from "../../components/items/StatsByOrder";
import RuneApi from "../../api/RuneApi";
import ItemApi from "../../api/ItemApi";
import ChampionRoles from "../../components/champions/ChampionRoles";
import UggButton from "../../components/champions/UggButton";
import ChampionModal from "../../components/champions/ChampionModal";
import { useState } from "react";

export default function ChampionPage({ champion, runes, items }) {
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

      <div className="flex mb-4 w-full">
        <div
          className="w-[256px] h-[256px] mr-4 flex-shrink-0 cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          <Image
            src={`/images/champions/tiles/${champion.id}.jpg`}
            width={256}
            height={256}
            quality={100}
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center">
            <h2
              className="text-5xl font-header font-medium cursor-pointer"
              onClick={() => setModalOpen(true)}
            >
              {champion.name}
            </h2>
            <UggButton champion={champion} />
          </div>

          <p
            className="text-lg font-header mb-4 overflow-ellipsis overflow-hidden max-h-[56px] cursor-pointer text-gray-600 dark:text-gray-400"
            onClick={() => setModalOpen(true)}
          >
            {champion.blurb}
          </p>
          <div className="flex">
            <div className="grid grid-cols-2 gap-3 w-1/2 mr-3">
              <div className="bg-white rounded p-4 text-lg text-center font-bold text-gray-600 shadow dark:text-gray-400 dark:bg-dark">
                <span className={winrateClass(champion.wins, champion.matches)}>
                  {winrate(champion.wins, champion.matches)}
                </span>{" "}
                Winrate
              </div>
              <div className="bg-white rounded p-4 text-lg text-center font-bold text-gray-600 shadow dark:text-gray-400 dark:bg-dark">
                <span className="text-gray-900 dark:text-white">
                  {champion.matches}
                </span>{" "}
                Matches
              </div>
              <div className="bg-white rounded p-4 text-lg text-center font-bold text-gray-600 shadow dark:text-gray-400 dark:bg-dark">
                <span className="text-gray-900 dark:text-white">
                  {champion.itemStats.length}
                </span>{" "}
                Items
              </div>
              <div className="bg-white rounded p-4 text-lg text-center font-bold text-gray-600 shadow dark:text-gray-400 dark:bg-dark">
                <span className="text-gray-900 dark:text-white">
                  {champion.runeStats.length}
                </span>{" "}
                Runes
              </div>
            </div>
            <ChampionRoles roleStats={champion.roleStats} />
          </div>
        </div>
      </div>

      {/* Highest winrate items */}
      <h2 className="text-2xl font-header font-medium mb-1">
        Highest winrate items
      </h2>
      <div className="flex space-x-8 mb-4">
        <div className="max-w-1/2">
          <div className="flex space-x-2 w-full overflow-x-auto pb-2">
            {champion.itemStats
              .filter(
                (stats) =>
                  items.find((item) => item.id == stats.itemId).isMythic
              )
              .sort((a, b) => b.wins / b.matches - a.wins / a.matches)
              .map((itemStats, i) => (
                <Card
                  key={i}
                  type={"item"}
                  {...itemStats}
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
              .map((itemStats, i) => (
                <Card
                  key={i}
                  type={"item"}
                  {...itemStats}
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
      <div className="flex space-x-8 mb-4">
        <div className="max-w-1/2">
          <div className="flex space-x-2 w-full overflow-x-auto pb-2">
            {champion.runeStats
              .filter(
                (stats) =>
                  runes.find((rune) => rune.id == stats.runeId).tier === 0
              )
              .sort((a, b) => b.wins / b.matches - a.wins / a.matches)
              .map((runeStats, i) => (
                <Card
                  key={i}
                  type={"rune"}
                  {...runeStats}
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
              .map((runeStats, i) => (
                <Card
                  key={i}
                  type={"rune"}
                  {...runeStats}
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
          className="grid grid-cols-5 grid-flow-col gap-2"
          style={{ gridTemplateRows: "auto auto" }}
        >
          {champion.orderStats.map((stats) => (
            <StatsByOrder
              key={Math.random()}
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
  const champions = await ChampionApi.getAllChampions();

  return {
    paths: champions.map((i) => ({ params: { id: "" + i.id } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const champion = await ChampionApi.getChampion(params.id);
  const runes = await RuneApi.getAllRunes();
  const items = await ItemApi.getAllItems();

  return {
    props: {
      champion,
      runes: runes.map(({ id, tier }) => ({ id, tier })),
      items: items.map(({ id, description }) => ({
        id,
        isMythic: description.includes("rarityMythic"),
      })),
    },
  };
}

ChampionPage.pageName = ({ champion }) => champion.name;
