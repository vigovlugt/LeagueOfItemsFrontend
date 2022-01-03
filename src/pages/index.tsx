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
  getPlayrateIncrease,
  getPlayrateIncreaseFromPlayRate,
  getWinrateIncrease,
} from "../utils/stats";
import { TrendingDownIcon } from "@heroicons/react/solid";
import RuneApi from "../api/RuneApi";
import RuneStats from "../models/runes/RuneStats";
import PatchSection from "../components/home/PatchSection";
import PatchScheduleApi from "../api/PatchScheduleApi";

export default function Home({
  totalMatches = 0,
  championMatches = 0,
  previousChampionMatches = 0,
  pageViewDataset = [],
  winrateBuilds = [],
  playrateBuilds = [],
  winrateChampions = [],
  playrateChampions = [],
  winrateItems = [],
  playrateItems = [],
  winrateRunes,
  playrateRunes,
  playrateRoles,
  nextPatch,
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
        nextPatch={nextPatch}
      />

      <div
        className={`${styles.homePageGrid} grid w-full max-w-full pt-6 gap-8 mb-16`}
      >
        <div className="w-full overflow-hidden">
          <CategoryPreviews />

          <PopularSection pageViewDataset={pageViewDataset} />

          <PatchSection
            dataset={dataset}
            winrateChampions={winrateChampions}
            playrateChampions={playrateChampions}
            championMatches={championMatches}
            previousChampionMatches={previousChampionMatches}
            winrateItems={winrateItems}
            playrateItems={playrateItems}
            winrateRunes={winrateRunes}
            playrateRunes={playrateRunes}
            playrateRoles={playrateRoles}
          />
        </div>
        <HomeSidebar
          playrateBuilds={playrateBuilds}
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

  const playrateBuilds = await BuildsApi.getByPlayrate()
    .filter((b) => !BuildStats.isSmallRune(b, keystones))
    .slice(0, 10);

  const winrateChampions = ChampionApi.getChampionsByWinRateDifference().slice(
    0,
    20
  );
  const playrateChampions =
    ChampionApi.getChampionsByPlayRateDifference().slice(0, 20);

  const playrateRoles = ChampionApi.getChampionRolesByPlayrateIncrease().slice(
    0,
    20
  );

  const winrateItems = ItemApi.getByWinRateDifference().slice(0, 20);
  const playrateItems = ItemApi.getByPlayRateDifference().slice(0, 20);

  const winrateRunes = RuneApi.getByWinRateDifference().slice(0, 20);
  const playrateRunes = RuneApi.getByPlayRateDifference().slice(0, 20);

  const nextPatch = PatchScheduleApi.getNextPatch();

  return {
    props: {
      items,
      totalMatches,
      championMatches,
      previousChampionMatches,
      pageViewDataset,
      winrateBuilds,
      playrateBuilds,
      winrateChampions,
      playrateChampions,
      winrateItems,
      playrateItems,
      itemMatches,
      previousItemMatches,
      winrateRunes,
      playrateRunes,
      previousRuneMatches,
      playrateRoles,
      nextPatch,
    },
  };
}

Home.pageName = "Home";
