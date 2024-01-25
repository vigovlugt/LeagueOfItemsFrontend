import ItemApi from "../api/ItemApi";
import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import Table from "../components/table/Table";
import { useRouter } from "next/router";
import { percentage, pickrate, winrate, winrateClass } from "../utils/format";
import { NextSeo } from "next-seo";
import MatchApi from "../api/MatchApi";
import HelpHover from "../components/HelpHover";
import {
    ITEM_PICKRATE_HELPER_TEXT,
    ITEM_WINRATE_HELPER_TEXT,
} from "../constants/constants";
import { getPickrateIncrease } from "../utils/stats";
import { SponsorLayout } from "../components/ads/GameBoost";

export default function Tierlist({
    items,
    totalMatches,
    previousTotalMatches,
}) {
    const router = useRouter();

    const data = useMemo(() => items, [items]);

    const columns = useMemo(
        () => [
            {
                Header: "Item",
                accessor: "name",
                headerClass: "w-full",
                Cell: ({ row }) => (
                    <div className="flex items-center">
                        <img
                            src={`/images/items/32/${row.original.id}.webp`}
                            style={{
                                width: "32px",
                                height: "32px",
                                minHeight: "32px",
                                minWidth: "32px",
                            }}
                            alt="Item image"
                        />

                        <span className="ml-2 block">{row.original.name}</span>
                    </div>
                ),
            },
            {
                Header: () => (
                    <>
                        Winrate
                        <HelpHover text={ITEM_WINRATE_HELPER_TEXT} />
                    </>
                ),
                headerClass: "text-right",
                cellClass: "text-right",
                Cell: ({
                    row: {
                        original: {
                            wins,
                            matches,
                            previousWins,
                            previousMatches,
                        },
                    },
                }) => (
                    <div className="flex flex-col">
                        <span className={`${winrateClass(wins, matches)}`}>
                            {winrate(wins, matches)}
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                            {winrate(previousWins, previousMatches)}
                        </span>
                    </div>
                ),
                accessor: "wins",
                sortType: (rowA, rowB) =>
                    rowA.original.wins / rowA.original.matches -
                    rowB.original.wins / rowB.original.matches,
                id: "winrate",
            },
            {
                Header: "WR increase",
                headerClass: "text-right",
                cellClass: "text-right",
                Cell: ({
                    row: {
                        original: {
                            wins,
                            matches,
                            previousWins,
                            previousMatches,
                        },
                    },
                }) => (
                    <span className="text-gray-600 dark:text-gray-400">
                        {percentage(
                            wins / matches - previousWins / previousMatches
                        )}
                    </span>
                ),
                accessor: "wins",
                sortType: (rowA, rowB) =>
                    rowA.original.wins / rowA.original.matches -
                    rowA.original.previousWins / rowA.original.previousMatches -
                    (rowB.original.wins / rowB.original.matches -
                        rowB.original.previousWins /
                            rowB.original.previousMatches),
                id: "winrateIncrease",
            },
            {
                Header: () => (
                    <>
                        Pickrate
                        <HelpHover text={ITEM_PICKRATE_HELPER_TEXT} />
                    </>
                ),
                headerClass: "text-right",
                cellClass: "text-right",
                Cell: ({
                    row: {
                        original: { matches, previousMatches },
                    },
                }) => (
                    <div className="flex flex-col">
                        <span>{pickrate(matches, totalMatches)}</span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                            {pickrate(previousMatches, previousTotalMatches)}
                        </span>
                    </div>
                ),
                accessor: "matches",
                sortType: (rowA, rowB) =>
                    rowA.original.matches - rowB.original.matches,
                id: "pickrate",
            },
            {
                Header: "PR increase",
                headerClass: "text-right",
                cellClass: "text-right",
                Cell: ({
                    row: {
                        original: { matches, previousMatches },
                    },
                }) => (
                    <span className="text-gray-600 dark:text-gray-400">
                        {percentage(
                            matches / totalMatches -
                                previousMatches / previousTotalMatches
                        )}
                    </span>
                ),
                accessor: "matches",
                sortType: (rowA, rowB) =>
                    getPickrateIncrease(
                        rowA.original,
                        totalMatches,
                        previousTotalMatches
                    ) -
                    getPickrateIncrease(
                        rowB.original,
                        totalMatches,
                        previousTotalMatches
                    ),
                id: "previousPickrate",
            },
            {
                Header: "Champions",
                headerClass: "text-right",
                cellClass: "text-right",
                accessor: (original) => original.champions,
                id: "champions",
            },
            {
                Header: "Matches",
                headerClass: "text-right",
                cellClass: "text-right",
                accessor: "matches",
            },
        ],
        []
    );

    const table = useTable(
        {
            columns,
            data,
            initialState: {
                sortBy: [
                    {
                        id: "pickrate",
                        desc: true,
                    },
                ],
            },
        },
        useSortBy
    );

    const goToItem = (row) => router.push(`/items/${row.original.id}`);

    return (
        <SponsorLayout>
            <NextSeo
                title="Item tierlist"
                description="Item tierlist with all League of Legends items."
            />
            <div className="rounded-lg shadow-lg w-full min-w-0 overflow-hidden">
                <Table
                    table={table}
                    onClick={goToItem}
                    className="overflow-x-visible"
                />
            </div>
        </SponsorLayout>
    );
}

export async function getStaticProps(context) {
    const items = ItemApi.getAllItems().map(
        ({
            id,
            name,
            matches,
            previousMatches,
            wins,
            previousWins,
            championStats,
        }) => ({
            id,
            name,
            matches,
            wins,
            previousMatches,
            previousWins,
            champions: championStats.length,
        })
    );

    const totalMatches = MatchApi.getTotalMatches();
    const previousTotalMatches = MatchApi.getPreviousTotalMatches();

    return {
        props: {
            items,
            totalMatches,
            previousTotalMatches,
        },
    };
}

Tierlist.pageName = "Tierlist";
