import ItemApi from "../../api/ItemApi";
import ItemStats from "../../models/items/ItemStats";
import StatsByOrder from "../../components/items/StatsByOrder";
import Card from "../../components/Card";
import { NextSeo } from "next-seo";
import { useState } from "react";
import ItemModal from "../../components/items/ItemModal";
import PageHeader from "../../components/PageHeader";
import MatchApi from "../../api/MatchApi";
import usePageView from "../../hooks/usePageView";
import ChampionApi from "../../api/ChampionApi";
import StatsCard from "../../components/StatsCard";
import { AdHorizontal, AdRectangleSm } from "../../components/ads/Ads";

export default function ItemPage({
    item,
    totalMatches,
    previousTotalMatches,
    matchesByChampion,
    previousMatchesByChampion,
    orderMatchesByChampion,
    previousOrderMatchesByChampion,
}) {
    item = new ItemStats(item);

    const [modalIsOpen, setModalOpen] = useState(false);
    const [showPreviousOrderStats, setShowPreviousOrderStats] = useState(false);

    usePageView("ITEM", item.id);

    return (
        <div className="flex flex-col">
            <NextSeo
                title={item.name}
                description={`See ${item.name}'s best champions and winrate statistics. Data from U.GG.`}
            />

            <ItemModal
                isOpen={modalIsOpen}
                setIsOpen={setModalOpen}
                item={item}
            />

            <PageHeader
                type="item"
                id={item.id}
                setModalOpen={setModalOpen}
                hasModal
                name={item.name}
                description={item.plaintext}
                tooltip={
                    <div className="max-w-[400px]">
                        <h3 className="text-xl font-medium font-header tracking-wide">
                            {item.name}
                        </h3>
                        {item.plaintext && (
                            <p className="mb-4">{item.plaintext}</p>
                        )}
                        <div
                            dangerouslySetInnerHTML={{
                                __html: item.description,
                            }}
                            className="[&_attention]:font-bold [&_rules]:italic [&_passive]:font-bold [&_active]:font-bold [&_scalearmor]:text-[#fb7056] [&_scalemr]:text-[#53dcff]"
                        ></div>
                    </div>
                }
            >
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="mb-4 grid grid-cols-2 gap-3 xl:w-1/2">
                        <StatsCard {...item} entityType="item" />
                        <StatsCard
                            {...item}
                            totalMatches={totalMatches}
                            previousTotalMatches={previousTotalMatches}
                            type="pickrate"
                            entityType="item"
                        />

                        <div className="rounded bg-white p-4 text-center text-lg font-bold text-gray-600 shadow dark:bg-gray-800 dark:text-gray-400">
                            <span className="text-gray-900 dark:text-white">
                                {item.championStats.length}
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
                    {item.championStats
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

            <AdHorizontal
                className="mt-4 h-32 w-full"
                data-ad-format="false"
                data-full-width-responsive="false"
            />

            {/* Winrate by order */}
            <div className="mt-4">
                <div className="flex items-center justify-between">
                    <h2 className="mb-1 font-header text-2xl font-medium">
                        Champion stats by order
                    </h2>
                    <label>
                        <input
                            type="checkbox"
                            className="mr-1"
                            checked={showPreviousOrderStats}
                            onChange={() =>
                                setShowPreviousOrderStats(
                                    !showPreviousOrderStats
                                )
                            }
                        />{" "}
                        Show previous patch stats
                    </label>
                </div>
                <div
                    className="grid grid-flow-row grid-cols-1 gap-2 xl:grid-flow-col xl:grid-cols-5"
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
                            previousOrderMatchesByChampion={Object.keys(
                                previousOrderMatchesByChampion
                            ).reduce(
                                (agg, key) => ({
                                    ...agg,
                                    [key]: previousOrderMatchesByChampion[key][
                                        i
                                    ],
                                }),
                                {}
                            )}
                            showPrevious={showPreviousOrderStats}
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
    const previousMatchesByChampion =
        ChampionApi.getPreviousMatchesByChampion();
    const orderMatchesByChampion = ChampionApi.getOrderMatchesByChampion();
    const previousOrderMatchesByChampion =
        ChampionApi.getPreviousOrderMatchesByChampion();

    return {
        props: {
            item,
            totalMatches,
            previousTotalMatches,
            matchesByChampion,
            previousMatchesByChampion,
            orderMatchesByChampion,
            previousOrderMatchesByChampion,
        },
    };
}

ItemPage.pageName = ({ item }) => item.name;
ItemPage.favouriteType = () => "ITEM";
ItemPage.favouriteId = ({ item }) => item.id;
