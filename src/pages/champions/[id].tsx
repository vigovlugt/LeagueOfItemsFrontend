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
import usePageView from "../../hooks/usePageView";
import { CHAMPION_PICKRATE_HELPER_TEXT } from "../../constants/constants";
import HelpHover from "../../components/HelpHover";
import StatsCard from "../../components/StatsCard";

export default function ChampionPage({
  champion,
  runes,
  totalMatches,
  previousTotalMatches,
}) {
  champion = new ChampionStats(champion);

  const [modalIsOpen, setModalOpen] = useState(false);

  usePageView("CHAMPION", champion.id);

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
          <div className="mr-3 mb-4 grid grid-cols-2 gap-3 lg:mb-0 lg:w-1/2">
            <StatsCard {...champion} />
            <StatsCard
              {...champion}
              totalMatches={totalMatches}
              previousTotalMatches={previousTotalMatches}
              type="pickrate"
            />

            <div className="flex items-center justify-center rounded bg-white p-4 text-lg font-bold text-gray-600 shadow dark:bg-gray-800 dark:text-gray-400">
              <span className="mr-1 text-gray-900 dark:text-white">
                {champion.itemStats.length}
              </span>{" "}
              Items
            </div>
            <div className="flex items-center justify-center rounded bg-white p-4 text-lg font-bold text-gray-600 shadow dark:bg-gray-800 dark:text-gray-400">
              <span className="mr-1 text-gray-900 dark:text-white">
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

      {/* Highest winrate runes */}
      <h2 className="mb-1 font-header text-2xl font-medium">
        Highest winrate runes
      </h2>
      <div className="mb-4 flex flex-col lg:flex-row lg:space-x-8">
        <div className="mb-4 lg:mb-0 lg:max-w-1/2">
          <div className="flex w-full space-x-2 overflow-x-auto pb-2">
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
          <div className="flex w-full space-x-2 overflow-x-auto pb-2">
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

      {/* Highest pickrate runes */}
      <h2 className="mb-1 font-header text-2xl font-medium">
        Highest pickrate runes
      </h2>
      <div className="mb-4 flex flex-col lg:flex-row lg:space-x-8">
        <div className="mb-4 lg:mb-0 lg:max-w-1/2">
          <div className="flex w-full space-x-2 overflow-x-auto pb-2">
            {champion.runeStats
              .filter(
                (stats) =>
                  runes.find((rune) => rune.id == stats.runeId).tier === 0
              )
              .sort((a, b) => b.matches - a.matches)
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
          <div className="flex w-full space-x-2 overflow-x-auto pb-2">
            {champion.runeStats
              .filter(
                (stats) =>
                  runes.find((rune) => rune.id == stats.runeId).tier !== 0
              )
              .sort((a, b) => b.matches - a.matches)
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
        <h2 className="mb-1 font-header text-2xl font-medium">
          Item stats by order
        </h2>
        <div
          className="grid grid-flow-row grid-cols-1 gap-2 xl:grid-flow-col xl:grid-cols-5"
          style={{ gridTemplateRows: "auto auto" }}
        >
          {champion.orderStats.map((stats) => (
            <StatsByOrder
              key={Math.random()}
              totalMatches={champion.matches}
              type={"item"}
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
  const previousTotalMatches = MatchApi.getPreviousTotalMatches();

  return {
    props: {
      champion,
      totalMatches,
      previousTotalMatches,
      runes: runes.map(({ id, tier }) => ({ id, tier })),
      items: items.map(({ id, description }) => ({
        id,
        isMythic: description.includes("rarityMythic"),
      })),
    },
  };
}

ChampionPage.pageName = ({ champion }) => champion.name;
ChampionPage.favouriteType = () => "CHAMPION";
ChampionPage.favouriteId = ({ champion }) => champion.id;
