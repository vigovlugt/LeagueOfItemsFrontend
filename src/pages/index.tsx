import ItemApi from "../api/ItemApi";
import { NextSeo } from "next-seo";
import BuildsApi from "../api/BuildsApi";
import GridCell from "../components/GridCell";
import Link from "next/link";
import dataset from "../../data/dataset.json";
import MatchApi from "../api/MatchApi";
import { TrendingUpIcon } from "@heroicons/react/outline";
import HomeSidebar from "../components/home/HomeSidebar";
import BuildStats from "../models/builds/BuildStats";
import SummaryBar from "../components/home/SummaryBar";
import CategoryPreviews from "../components/home/CategoryPreviews";
import PopularSection from "../components/home/PopularSection";
import PageViewApi from "../api/PageViewApi";
import styles from "../styles/pages/index.module.css";
import ChampionApi from "../api/ChampionApi";
import {pickrate, winrate, winrateClass, winrateIncrease} from "../utils/format";
import ChampionGridCell from "../components/champions/ChampionGridCell";
import { getPlayrateIncrease, getWinrateIncrease } from "../utils/stats";
import { TrendingDownIcon } from "@heroicons/react/solid";

export default function Home({
  totalMatches = 0,
  popularPages = [],
  winrateBuilds = [],
  playrateBuilds = [],
  winrateChampions = [],
}) {
  const numberFormatter = new Intl.NumberFormat("us-US");

  winrateBuilds = winrateBuilds.map((b) => new BuildStats(b));
  playrateBuilds = playrateBuilds.map((b) => new BuildStats(b));

  return (
    <div className="-mt-3">
      <NextSeo />

      <SummaryBar
        dataset={dataset}
        totalMatches={totalMatches}
        numberFormatter={numberFormatter}
      />

      <div
        className={`${styles.homePageGrid} grid w-full max-w-full pt-6 gap-8 mb-16`}
      >
        <div className="w-full overflow-hidden">
          <CategoryPreviews />

          <PopularSection popularPages={popularPages} />

          <Link
            href={`https://www.leagueoflegends.com/en-us/news/game-updates/patch-${dataset.version.replace(
              ".",
              "-"
            )}-notes/`}
            passHref
          >
            <a
              target="_blank"
              className="flex justify-center items-center w-full bg-white rounded-lg p-8 py-32 shadow mb-8 dark:text-gray-50 dark:bg-dark relative overflow-hidden"
            >
              <img
                src="https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt4cc8c7e493705e7d/611db1fce74bc3148654e387/082421_Patch1117Notes_Banner.jpg"
                alt={""}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  filter: "saturate(0) opacity(0.3)",
                }}
                className="absolute inset-0 w-full h-full"
              />
              <div className="absolute inset-0 flex justify-center items-center">
                <h2 className="font-header text-4xl">
                  Patch {dataset.version}
                </h2>
              </div>
            </a>
          </Link>

          <h2 className="font-header text-4xl mb-2">
            Biggest champion winrate changes
          </h2>
          <div className="flex space-x-2 w-full overflow-x-auto pb-2">
            {winrateChampions.map((c) => (
              <DifferenceCard champion={c} />
            ))}
          </div>
        </div>
        <HomeSidebar
          playrateBuilds={playrateBuilds}
          winrateBuilds={winrateBuilds}
        />
      </div>
    </div>
  );
}

const DifferenceCard = ({ champion }) => {
  const increase = getWinrateIncrease(champion);

  const TrendingIcon = increase > 0 ? TrendingUpIcon : TrendingDownIcon;

  return (
    <div
      key={champion.id}
      className="flex flex-col items-center bg-white rounded shadow dark:text-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50"
    >
      <ChampionGridCell id={champion.id} />
      <div
        className={`flex items-center font-semibold my-1 ${winrateClass(
          0.5 + increase
        )}`}
      >
        <TrendingIcon className="w-8 inline mr-2" />
        <span className="text-xl font-header">
          {winrateIncrease(
            champion.wins,
            champion.matches,
            champion.previousWins,
            champion.previousMatches
          )}
        </span>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const items = ItemApi.getAllItems();
  const totalMatches = MatchApi.getTotalMatches();

  const popularPages = await PageViewApi.getPopularPages();

  const winrateBuilds = await BuildsApi.getByWinrate().slice(0, 10);
  const playrateBuilds = await BuildsApi.getByPlayrate().slice(0, 10);

  const winrateChampions = ChampionApi.getChampionsByWinRateDifference().slice(
    0,
    10
  );

  return {
    props: {
      items,
      totalMatches: Math.round(totalMatches),
      popularPages,
      winrateBuilds,
      playrateBuilds,
      winrateChampions,
    },
  };
}

Home.pageName = "Home";
