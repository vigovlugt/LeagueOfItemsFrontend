import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import Table from "../../components/table/Table";
import RuneStats from "../../models/runes/RuneStats";
import { useRouter } from "next/router";
import {
    percentage,
    pickrate,
    winrate,
    winrateClass,
} from "../../utils/format";
import RuneApi from "../../api/RuneApi";
import { NextSeo } from "next-seo";
import MatchApi from "../../api/MatchApi";
import { getPickrateIncrease } from "../../utils/stats";

export default function RuneTierlist({
    runes,
    totalMatches,
    previousTotalMatches,
}) {
    const router = useRouter();

    const data = useMemo(
        () => runes.filter((r) => RuneStats.isKeystone(r)),
        [runes]
    );

    const data2 = useMemo(
        () => runes.filter((r) => !RuneStats.isKeystone(r)),
        [runes]
    );

    const columns = useMemo(
        () => [
            {
                Header: "Rune",
                headerClass: "w-full",
                accessor: "name",
                Cell: ({ row }) => (
                    <div className="flex items-center">
                        <img
                            src={`/images/runes/32/${row.original.id}.webp`}
                            style={{
                                width: "32px",
                                height: "32px",
                                minHeight: "32px",
                                minWidth: "32px",
                            }}
                            alt="Rune icon"
                        />

                        <span className="ml-2 block">{row.original.name}</span>
                    </div>
                ),
            },
            {
                Header: "Winrate",
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
                Header: "Pickrate",
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

    const keystoneTable = useTable(
        {
            columns,
            data,
            initialState: {
                sortBy: [
                    {
                        id: "winrate",
                        desc: true,
                    },
                ],
            },
        },
        useSortBy
    );

    const normalTable = useTable(
        {
            columns,
            data: data2,
            initialState: {
                sortBy: [
                    {
                        id: "winrate",
                        desc: true,
                    },
                ],
            },
        },
        useSortBy
    );

    const goToRune = (row) => router.push(`/runes/${row.original.id}`);

    return (
        <div>
            <NextSeo
                title="Rune tierlist"
                description="Rune tierlist with all League of Legends items."
            />

            <h2 className="mb-2 font-header text-4xl">Keystones</h2>
            <div className="mb-8 overflow-hidden rounded-lg shadow-lg">
                <Table table={keystoneTable} onClick={goToRune} />
            </div>
            <h2 className="mb-2 font-header text-4xl">Runes</h2>
            <div className="rounded-lg shadow-lg w-full min-w-0 overflow-x-auto">
                <Table table={normalTable} onClick={goToRune} />
            </div>
        </div>
    );
}

export async function getStaticProps(context) {
    const runes = RuneApi.getAllRunes().map(
        ({
            id,
            name,
            matches,
            wins,
            previousMatches,
            previousWins,
            championStats,
            tier,
        }) => ({
            id,
            name,
            matches,
            wins,
            previousMatches,
            previousWins,
            tier,
            champions: championStats.length,
        })
    );

    const totalMatches = MatchApi.getTotalMatches();
    const previousTotalMatches = MatchApi.getPreviousTotalMatches();

    return {
        props: {
            runes,
            totalMatches,
            previousTotalMatches,
        },
    };
}

RuneTierlist.pageName = "Rune Tierlist";
