import { pickrate, winrate, winrateClass } from "../../utils/format";
import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import Table from "../table/Table";
import { useRouter } from "next/router";

const nameByOrder = ["First", "Second", "Third", "Fourth", "Last"];

export default function StatsByOrder({
    orderStats,
    totalMatches,
    type = "champion",
    orderMatchesByChampion = null,
    previousOrderMatchesByChampion = null,
    showPrevious,
}) {
    const router = useRouter();

    const data = useMemo(
        () =>
            type === "champion"
                ? orderStats.championStats
                : orderStats.itemStats,
        []
    );

    const columns = useMemo(
        () => [
            {
                Header: "",
                accessor: "name",
                headerClass: "w-full",
                Cell: ({ row }) => (
                    <img
                        src={`/images/${type}s/32/${
                            type === "champion"
                                ? row.original.championId
                                : row.original.itemId
                        }.webp`}
                        style={{
                            height: "32px",
                            width: "32px",
                            minHeight: "32px",
                            minWidth: "32px",
                        }}
                        alt="Image"
                    />
                ),
                disableSortBy: true,
            },
            {
                Header: "Winrate",
                headerClass: "text-right",
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
                    <div
                        className={`${winrateClass(
                            wins,
                            matches
                        )} w-full text-right`}
                        title={wins}
                    >
                        {winrate(wins, matches)}
                        {showPrevious && (
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                {winrate(previousWins, previousMatches)}
                            </div>
                        )}
                    </div>
                ),
                accessor: "wins",
                sortType: (rowA, rowB) =>
                    rowA.original.wins / rowA.original.matches -
                    rowB.original.wins / rowB.original.matches,
                id: "winrate",
            },
            {
                Header: "Pickrate",
                headerClass: "text-right",
                cellClass: "text-right",
                accessor: "pickrate",
                sortType: orderMatchesByChampion
                    ? (rowA, rowB) =>
                          rowA.original.matches /
                              orderMatchesByChampion[rowA.original.championId] -
                          rowB.original.matches /
                              orderMatchesByChampion[rowB.original.championId]
                    : (rowA, rowB) =>
                          rowA.original.matches - rowB.original.matches,
                Cell: ({
                    row: {
                        original: { matches, previousMatches, championId },
                    },
                }) => (
                    <div
                        className="w-full text-right"
                        title={matches + " matches"}
                    >
                        {pickrate(
                            matches,
                            orderMatchesByChampion
                                ? orderMatchesByChampion[championId]
                                : orderStats.matches
                        )}
                        {showPrevious && (
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                {pickrate(
                                    previousMatches,
                                    previousOrderMatchesByChampion
                                        ? previousOrderMatchesByChampion[
                                              championId
                                          ]
                                        : orderStats.previousMatches
                                )}
                            </div>
                        )}
                    </div>
                ),
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

    const goToChampion = (row) =>
        router.push(`/champions/${row.original.championId}`);
    const goToItem = (row) => router.push(`/items/${row.original.itemId}`);
    const goTo = type === "champion" ? goToChampion : goToItem;

    return (
        <>
            {/* General stats */}
            <div className="rounded bg-white px-3 py-3 text-center shadow dark:bg-gray-900">
                <h3 className="mb-1 font-header text-xl font-medium">
                    {nameByOrder[orderStats.order]} item
                </h3>
                <div className="flex justify-around">
                    <span className="text-center">
                        <span className="block whitespace-nowrap text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            Winrate
                        </span>
                        <span
                            className={`text-lg font-bold ${winrateClass(
                                orderStats.wins,
                                orderStats.matches
                            )}`}
                        >
                            {winrate(orderStats.wins, orderStats.matches)}
                        </span>
                    </span>
                    <span className="text-center">
                        <span className="block whitespace-nowrap text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            Games
                        </span>
                        <span
                            className="text-center text-lg font-bold"
                            title={orderStats.matches + "  matches"}
                        >
                            {pickrate(orderStats.matches, totalMatches)}
                        </span>
                    </span>
                </div>
            </div>

            {/* Champion stats */}
            <div>
                <div className="mb-4 overflow-hidden rounded-lg bg-white shadow dark:bg-dark">
                    <Table table={table} onClick={goTo} size="sm" />
                </div>
            </div>
        </>
    );
}
