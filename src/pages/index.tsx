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
import {
  percentage,
  pickrate,
  winrate,
  winrateClass,
  winrateIncrease,
} from "../utils/format";
import ChampionGridCell from "../components/champions/ChampionGridCell";
import {
  getPickrateIncrease,
  getPickrateIncreaseFromPlayRate,
  getWinrateIncrease,
} from "../utils/stats";
import { TrendingDownIcon } from "@heroicons/react/solid";
import RuneApi from "../api/RuneApi";
import RuneStats from "../models/runes/RuneStats";
import PatchSection from "../components/home/PatchSection";
import PatchScheduleApi from "../api/PatchScheduleApi";
import FavouritesSection from "../components/home/FavouritesSection";

export default function Home({
  totalMatches = 0,
  championMatches = 0,
  previousChampionMatches = 0,
  pageViewDataset = [],
  winrateBuilds = [],
  pickrateBuilds = [],
  winrateChampions = [],
  pickrateChampions = [],
  winrateItems = [],
  pickrateItems = [],
  winrateRunes,
  pickrateRunes,
  pickrateRoles,
  nextPatch,
}) {
  const numberFormatter = new Intl.NumberFormat("us-US");

  winrateBuilds = winrateBuilds.map((b) => new BuildStats(b));
  pickrateBuilds = pickrateBuilds.map((b) => new BuildStats(b));

  return (
    <div className="lg:-mt-3">
      <NextSeo />

      <SummaryBar
        dataset={dataset}
        totalMatches={totalMatches}
        numberFormatter={numberFormatter}
        nextPatch={nextPatch}
      />

      <div
        className={`${styles.homePageGrid} w-full max-w-full pt-6 gap-8 mb-16`}
      >
        <div className="overflow-hidden">
          <CategoryPreviews />

          <PopularSection pageViewDataset={pageViewDataset} />

          <FavouritesSection />

          <PatchSection
            dataset={dataset}
            winrateChampions={winrateChampions}
            pickrateChampions={pickrateChampions}
            championMatches={championMatches}
            previousChampionMatches={previousChampionMatches}
            winrateItems={winrateItems}
            pickrateItems={pickrateItems}
            winrateRunes={winrateRunes}
            pickrateRunes={pickrateRunes}
            pickrateRoles={pickrateRoles}
          />
        </div>
        <HomeSidebar
          pickrateBuilds={pickrateBuilds}
          winrateBuilds={winrateBuilds}
        />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const items = ItemApi.getAllItems();
  const runes = RuneApi.getAllRunes();
  const keystones = runes
    .map((r) => new RuneStats(r))
    .filter((r) => r.isKeystone())
    .map((r) => r.id);

  const totalMatches = MatchApi.getTotalMatches();
  const championMatches = MatchApi.getChampionMatches();
  const previousChampionMatches = MatchApi.getPreviousChampionMatches();
  const itemMatches = ItemApi.getTotalMatches();
  const previousItemMatches = ItemApi.getPreviousTotalMatches();
  const previousRuneMatches = RuneApi.getPreviousTotalMatches();

  const pageViewDataset = await PageViewApi.getDataset();

  const winrateBuilds = await BuildsApi.getByWinrate()
    .filter(
      (b) =>
        !BuildStats.isSmallRune(b, keystones) &&
        b.matches > 500 &&
        b.previousMatches > 500
    )
    .slice(0, 10);

  const pickrateBuilds = await BuildsApi.getByPickrate()
    .filter((b) => !BuildStats.isSmallRune(b, keystones))
    .slice(0, 10);

  const winrateChampions = ChampionApi.getChampionsByWinRateDifference().slice(
    0,
    20
  );
  const pickrateChampions =
    ChampionApi.getChampionsByPlayRateDifference().slice(0, 20);

  const pickrateRoles = ChampionApi.getChampionRolesByPickrateIncrease().slice(
    0,
    20
  );

  const winrateItems = ItemApi.getByWinRateDifference().slice(0, 20);
  const pickrateItems = ItemApi.getByPlayRateDifference().slice(0, 20);

  const winrateRunes = RuneApi.getByWinRateDifference().slice(0, 20);
  const pickrateRunes = RuneApi.getByPlayRateDifference().slice(0, 20);

  const nextPatch = PatchScheduleApi.getNextPatch();

  return {
    props: {
      items,
      totalMatches,
      championMatches,
      previousChampionMatches,
      pageViewDataset,
      winrateBuilds,
      pickrateBuilds,
      winrateChampions,
      pickrateChampions,
      winrateItems,
      pickrateItems,
      itemMatches,
      previousItemMatches,
      winrateRunes,
      pickrateRunes,
      previousRuneMatches,
      pickrateRoles,
      nextPatch,
    },
  };
}

Home.pageName = "Home";
