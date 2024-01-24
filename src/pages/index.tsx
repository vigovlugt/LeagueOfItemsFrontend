import ItemApi from "../api/ItemApi";
import { NextSeo } from "next-seo";
import BuildsApi from "../api/BuildsApi";
import MatchApi from "../api/MatchApi";
import HomeSidebar from "../components/home/HomeSidebar";
import BuildStats from "../models/builds/BuildStats";
import SummaryBar from "../components/home/SummaryBar";
import CategoryPreviews from "../components/home/CategoryPreviews";
import PopularSection from "../components/home/PopularSection";
import PageViewApi from "../api/PageViewApi";
import styles from "../styles/pages/index.module.css";
import ChampionApi from "../api/ChampionApi";
import RuneApi from "../api/RuneApi";
import RuneStats from "../models/runes/RuneStats";
import PatchOverview from "../components/home/PatchOverview";
import PatchScheduleApi from "../api/PatchScheduleApi";
import FavouritesSection from "../components/home/FavouritesSection";
import DatasetApi from "../api/DatasetApi";
import PatchRundown from "../components/home/PatchRundown";
import PatchNotesApi from "../api/PatchNotesApi";

export default function Home({
    totalMatches = 0,
    championMatches = 0,
    previousChampionMatches = 0,
    pageViewDataset = [],
    winrateBuilds = [],
    pickrateBuilds = [],
    winrateChampions = [],
    pickrateChampions = [],
    banrateChampions = [],
    winrateItems = [],
    pickrateItems = [],
    winrateRunes,
    pickrateRunes,
    pickrateRoles,
    nextPatch,
    patch,
    patchNotes,
    patchNotesStats,
}) {
    const numberFormatter = new Intl.NumberFormat("us-US");

    winrateBuilds = winrateBuilds.map((b) => new BuildStats(b));
    pickrateBuilds = pickrateBuilds.map((b) => new BuildStats(b));

    return (
        <div className="lg:-mt-3">
            <NextSeo />

            <SummaryBar
                patch={patch}
                totalMatches={totalMatches}
                numberFormatter={numberFormatter}
                nextPatch={nextPatch}
            />

            <div
                className={`${styles.homePageGrid} max-w-full mb-16 w-full gap-8 pt-6`}
            >
                <div className="overflow-hidden">
                    <CategoryPreviews />

                    <PopularSection pageViewDataset={pageViewDataset} />

                    <FavouritesSection />

                    <PatchOverview
                        patch={patch}
                        winrateChampions={winrateChampions}
                        pickrateChampions={pickrateChampions}
                        banrateChampions={banrateChampions}
                        championMatches={championMatches}
                        previousChampionMatches={previousChampionMatches}
                        winrateItems={winrateItems}
                        pickrateItems={pickrateItems}
                        winrateRunes={winrateRunes}
                        pickrateRunes={pickrateRunes}
                        pickrateRoles={pickrateRoles}
                        patchNotes={patchNotes}
                    />

                    <PatchRundown
                        patch={patch}
                        patchNotes={patchNotes}
                        patchNotesStats={patchNotesStats}
                        championMatches={championMatches}
                        previousChampionMatches={previousChampionMatches}
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

    const pageViewDataset = PageViewApi.getDataset();

    const winrateBuilds = BuildsApi.getByWinrate()
        .filter(
            (b) =>
                !BuildStats.isSmallRune(b, keystones) &&
                b.matches > 500 &&
                b.previousMatches > 500
        )
        .slice(0, 10);

    const pickrateBuilds = BuildsApi.getByPickrate()
        .filter((b) => !BuildStats.isSmallRune(b, keystones))
        .slice(0, 10);

    const winrateChampions =
        ChampionApi.getChampionsByWinRateDifference().slice(0, 20);
    const pickrateChampions =
        ChampionApi.getChampionsByPickrateDifference().slice(0, 20);

    const banrateChampions =
        ChampionApi.getChampionsByBanrateDifference().slice(0, 20);

    const pickrateRoles =
        ChampionApi.getChampionRolesByPickrateIncrease().slice(0, 20);

    const winrateItems = ItemApi.getByWinRateDifference().slice(0, 20);
    const pickrateItems = ItemApi.getByPlayRateDifference().slice(0, 20);

    const winrateRunes = RuneApi.getByWinRateDifference()
        .filter((r) => r.isKeystone)
        .slice(0, 20);
    const pickrateRunes = RuneApi.getByPlayRateDifference()
        .filter((r) => r.isKeystone)
        .slice(0, 20);

    const nextPatch = PatchScheduleApi.getNextPatch();
    const patch = DatasetApi.getPatch();
    const patchNotes = PatchNotesApi.getPatchNotes();
    const patchNotesStats = PatchNotesApi.getPatchNotesStats();

    return {
        props: {
            totalMatches,
            championMatches,
            previousChampionMatches,
            pageViewDataset,
            winrateBuilds,
            pickrateBuilds,
            winrateChampions,
            pickrateChampions,
            banrateChampions,
            winrateItems,
            pickrateItems,
            itemMatches,
            previousItemMatches,
            winrateRunes,
            pickrateRunes,
            previousRuneMatches,
            pickrateRoles,
            nextPatch,
            patch,
            patchNotes,
            patchNotesStats,
        },
    };
}

Home.pageName = "Home";
