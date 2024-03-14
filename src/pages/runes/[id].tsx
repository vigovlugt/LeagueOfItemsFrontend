import { removeTags } from "../../utils/format";
import RuneApi from "../../api/RuneApi";
import RuneStats from "../../models/runes/RuneStats";
import Card from "../../components/Card";
import { NextSeo } from "next-seo";
import PageHeader from "../../components/PageHeader";
import MatchApi from "../../api/MatchApi";
import usePageView from "../../hooks/usePageView";
import ChampionApi from "../../api/ChampionApi";
import StatsCard from "../../components/StatsCard";
import { AdHorizontal, AdRectangleSm } from "../../components/ads/Ads";

export default function RunePage({
    rune,
    totalMatches,
    previousTotalMatches,
    matchesByChampion,
    previousMatchesByChampion,
}) {
    rune = new RuneStats(rune);

    usePageView("RUNE", rune.id);

    return (
        <div className="flex flex-col">
            <NextSeo
                title={rune.name}
                description={`See ${rune.name}'s best champions and winrate statistics. Data from U.GG.`}
            />

            <PageHeader
                type="rune"
                id={rune.id}
                name={rune.name}
                description={removeTags(rune.shortDescription)}
            >
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="mb-4 grid grid-cols-2 gap-3 xl:w-1/2">
                        <StatsCard {...rune} entityType="rune" />
                        <StatsCard
                            {...rune}
                            totalMatches={totalMatches}
                            previousTotalMatches={previousTotalMatches}
                            entityType="rune"
                            type="pickrate"
                        />

                        <div className="rounded bg-white p-4 text-center text-lg font-bold text-gray-600 shadow dark:bg-gray-800 dark:text-gray-300">
                            <span className="text-gray-900 dark:text-white">
                                {rune.championStats.length}
                            </span>{" "}
                            Champions
                        </div>
                    </div>
                    <AdRectangleSm
                        className="h-[150px] w-[256px] md:ml-auto"
                        data-ad-format="false"
                        data-full-width-responsive="false"
                    />
                </div>
            </PageHeader>

            {/* Highest winrate champions */}
            <div>
                <h2 className="mb-1 font-header text-2xl font-medium">
                    Highest winrate champions
                </h2>
                <div className="flex w-full space-x-2 overflow-x-auto pb-2">
                    {rune.championStats
                        .sort((a, b) => b.wins / b.matches - a.wins / a.matches)
                        .map((championStats) => (
                            <Card
                                key={championStats.championId}
                                type={"champion"}
                                {...championStats}
                                totalMatches={
                                    matchesByChampion[championStats.championId]
                                }
                                previousTotalMatches={
                                    previousMatchesByChampion[
                                        championStats.championId
                                    ]
                                }
                                id={championStats.championId}
                            />
                        ))}
                </div>
            </div>

            {/* Highest pickrate champions */}
            <div>
                <h2 className="mb-1 mt-4 font-header text-2xl font-medium">
                    Highest pickrate champions
                </h2>
                <div className="flex w-full space-x-2 overflow-x-auto pb-2">
                    {rune.championStats
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
                                totalMatches={
                                    matchesByChampion[championStats.championId]
                                }
                                previousTotalMatches={
                                    previousMatchesByChampion[
                                        championStats.championId
                                    ]
                                }
                                id={championStats.championId}
                            />
                        ))}
                </div>

                <AdHorizontal
                    className="mt-4 h-32 w-full"
                    data-ad-format="false"
                    data-full-width-responsive="false"
                />
            </div>
        </div>
    );
}

export async function getStaticPaths() {
    const runes = RuneApi.getAllRunes();

    return {
        paths: runes.map((r) => ({ params: { id: r.id.toString() } })),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const rune = RuneApi.getRune(params.id);

    const totalMatches = MatchApi.getTotalMatches();
    const previousTotalMatches = MatchApi.getPreviousTotalMatches();

    const matchesByChampion = ChampionApi.getMatchesByChampion();
    const previousMatchesByChampion =
        ChampionApi.getPreviousMatchesByChampion();

    return {
        props: {
            rune,
            totalMatches,
            previousTotalMatches,
            matchesByChampion,
            previousMatchesByChampion,
        },
    };
}

RunePage.pageName = ({ rune }) => rune.name;
RunePage.favouriteType = () => "RUNE";
RunePage.favouriteId = ({ rune }) => rune.id;
