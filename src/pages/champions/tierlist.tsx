import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import Table from "../../components/table/Table";
import { useRouter } from "next/router";
import {
    percentage,
    pickrate,
    winrate,
    winrateClass,
} from "../../utils/format";
import { NextSeo } from "next-seo";
import ChampionApi from "../../api/ChampionApi";
import MatchApi from "../../api/MatchApi";
import { IChampionStats } from "../../models/champions/ChampionStats";
import { getIncrease, getPickrateIncrease } from "../../utils/stats";

interface IProps {
    champions: IChampionStats[];
    totalMatches: number;
    previousTotalMatches: number;
}

export default function ChampionTierlist({
    champions,
    totalMatches,
    previousTotalMatches,
}: IProps) {
    const router = useRouter();

    const data = useMemo(() => champions, [champions]);

    const columns = useMemo(
        () => [
            {
                Header: "Champion",
                headerClass: "w-full",
                accessor: "champion",
                Cell: ({ row }) => (
                    <div className="flex items-center">
                        <img
                            src={`/images/champions/32/${row.original.id}.webp`}
                            style={{
                                width: "32px",
                                height: "32px",
                                minHeight: "32px",
                                minWidth: "32px",
                            }}
                            alt="Champion image"
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
                Header: "Banrate",
                headerClass: "text-right",
                cellClass: "text-right",
                Cell: ({
                    row: {
                        original: { bans, previousBans },
                    },
                }) => (
                    <div className="flex flex-col">
                        <span>{pickrate(bans, totalMatches)}</span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                            {pickrate(previousBans, previousTotalMatches)}
                        </span>
                    </div>
                ),
                accessor: "bans",
                sortType: (rowA, rowB) =>
                    rowA.original.bans - rowB.original.bans,
                id: "bans",
            },
            {
                Header: "BR increase",
                headerClass: "text-right",
                cellClass: "text-right",
                Cell: ({
                    row: {
                        original: { bans, previousBans },
                    },
                }) => (
                    <span className="text-gray-600 dark:text-gray-400">
                        {percentage(
                            bans / totalMatches -
                                previousBans / previousTotalMatches
                        )}
                    </span>
                ),
                accessor: "bans",
                sortType: (rowA, rowB) =>
                    getIncrease(
                        rowA.original.bans,
                        rowA.original.previousBans,
                        totalMatches,
                        previousTotalMatches
                    ) -
                    getIncrease(
                        rowB.original.bans,
                        rowB.original.previousBans,
                        totalMatches,
                        previousTotalMatches
                    ),
                id: "previousBanrate",
            },
            {
                Header: "Items",
                headerClass: "text-right",
                cellClass: "text-right",
                accessor: (original) => original.items,
                id: "items",
            },
            {
                Header: "Runes",
                headerClass: "text-right",
                cellClass: "text-right",
                accessor: (original) => original.runes,
                id: "runes",
            },
            {
                Header: "Roles",
                headerClass: "text-right",
                cellClass: "text-right",
                accessor: (original) => original.roles,
                id: "roles",
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
                        id: "winrate",
                        desc: true,
                    },
                ],
            },
        },
        useSortBy
    );

    const goToChampion = (row) => router.push(`/champions/${row.original.id}`);

    return (
        <SponsorLayout>
            <NextSeo
                title="Champion tierlist"
                description="League of Legends champion tierlist."
            />
            <div className="rounded-lg shadow-lg w-full min-w-0 overflow-x-auto">
                <Table
                    table={table}
                    onClick={goToChampion}
                    className="overflow-x-visible"
                />
            </div>
        </SponsorLayout>
    );
}

export async function getStaticProps(context) {
    const champions = ChampionApi.getAllChampions().map(
        ({
            id,
            name,
            matches,
            previousMatches,
            wins,
            previousWins,
            bans,
            previousBans,
            roleStats,
            itemStats,
            runeStats,
        }) => ({
            id,
            name,
            wins,
            previousWins,
            bans,
            previousBans,
            matches,
            previousMatches,
            roles: roleStats.length,
            items: itemStats.length,
            runes: runeStats.length,
        })
    );
    const totalMatches = MatchApi.getTotalMatches();
    const previousTotalMatches = MatchApi.getPreviousTotalMatches();

    return {
        props: {
            champions,
            totalMatches,
            previousTotalMatches,
        },
    };
}

ChampionTierlist.pageName = "Champion Tierlist";
