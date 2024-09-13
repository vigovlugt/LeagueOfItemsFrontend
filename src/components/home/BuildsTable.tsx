import { useEffect, useMemo, useState } from "react";
import Table from "../table/Table";
import { useRouter } from "next/router";
import { useTable, useSortBy, usePagination } from "react-table";
import { getPickrateIncrease, getWinrateIncrease } from "../../utils/stats";
import { percentage, winrate, winrateClass } from "../../utils/format";
import {
    ArrowSmRightIcon,
    TrendingDownIcon,
    TrendingUpIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import { createQueryString } from "../../utils/query";

export default function BuildsTable({
    builds,
    type = "pickrate",
    size = "md",
    filterId = null,
    filterType = null,
    filterName = null,
    sortBy = null,
}) {
    const router = useRouter();

    const data = useMemo(() => builds, [builds]);

    const isFull = type === "full";

    const isWinrate = type === "winrate" || isFull;
    const isPickrate = type === "pickrate" || isFull;

    const getColumns = (isWinrate) => [
        {
            Header: isWinrate ? "WR increase" : "PR increase",
            headerClass: "text-right",
            id: isWinrate ? "winrate-increase" : "pickrate-increase",
            accessor: (row) =>
                isWinrate
                    ? getWinrateIncrease(row)
                    : getPickrateIncrease(
                          row,
                          row.totalMatches,
                          row.previousTotalMatches
                      ),
            Cell: ({ row }) => {
                const increase = isWinrate
                    ? getWinrateIncrease(row.original)
                    : getPickrateIncrease(
                          row.original,
                          row.original.totalMatches,
                          row.original.previousTotalMatches
                      );

                const TrendingIcon =
                    increase > 0 ? TrendingUpIcon : TrendingDownIcon;

                return (
                    <div className="flex justify-end">
                        <div
                            className={`flex items-center text-xl ${winrateClass(
                                0.5 + increase,
                                undefined,
                                true
                            )}`}
                        >
                            <TrendingIcon className="mr-1 inline h-5 w-5" />
                            {(Math.abs(increase) * 100).toFixed(2) + "%"}
                        </div>
                    </div>
                );
            },
            sortDescFirst: true,
            sortType: "basic",
        },
        {
            Header: isWinrate ? "Winrate" : "Pickrate",
            headerClass: "text-right",
            accessor: (row) =>
                isWinrate
                    ? row.wins / row.matches
                    : row.matches / row.totalMatches,
            Cell: ({ row }) => {
                const value = isWinrate
                    ? winrate(row.original.wins, row.original.matches)
                    : percentage(
                          row.original.matches / row.original.totalMatches
                      );
                const previousValue = isWinrate
                    ? winrate(
                          row.original.previousWins,
                          row.original.previousMatches
                      )
                    : percentage(
                          row.original.previousMatches /
                              row.original.previousTotalMatches
                      );

                const title = isWinrate
                    ? undefined
                    : row.original.matches + " matches";

                return (
                    <div className="flex flex-col items-end">
                        <div title={title}>{value}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                            {previousValue}
                        </div>
                    </div>
                );
            },
            sortDescFirst: true,
            sortType: "number",
            id: isWinrate ? "winrate" : "pickrate",
        },
    ];

    const columns = useMemo(
        () => [
            {
                Header: "Build",
                headerClass: "text-left w-full",
                accessor: (row) =>
                    row.championId +
                    "-" +
                    (row.buildType === "RUNE"
                        ? row.runeId
                        : row.item1Id + "-" + row.item2Id + "-" + row.item3Id),
                Cell: ({ row }) => (
                    <div className="flex items-center">
                        <img
                            src={`/images/champions/32/${row.original.championId}.webp`}
                            style={{
                                width: "32px",
                                height: "32px",
                                minHeight: "32px",
                                minWidth: "32px",
                            }}
                            className="mr-2"
                            alt="Champion image"
                        />
                        <div>
                            {row.original.buildType === "RUNE" ? (
                                <img
                                    src={`/images/runes/32/${row.original.runeId}.webp`}
                                    style={{
                                        width: "32px",
                                        height: "32px",
                                        minHeight: "32px",
                                        minWidth: "32px",
                                    }}
                                    alt="BuildType image"
                                />
                            ) : (
                                <div className="flex">
                                    <img
                                        src={`/images/items/32/${row.original.item1Id}.webp`}
                                        className="mr-1"
                                        style={{
                                            width: "32px",
                                            height: "32px",
                                            minHeight: "32px",
                                            minWidth: "32px",
                                        }}
                                        alt="Item 1 image"
                                    />
                                    <img
                                        src={`/images/items/32/${row.original.item2Id}.webp`}
                                        className="mr-1"
                                        style={{
                                            width: "32px",
                                            height: "32px",
                                            minHeight: "32px",
                                            minWidth: "32px",
                                        }}
                                        alt="Item 2 image"
                                    />
                                    <img
                                        src={`/images/items/32/${row.original.item3Id}.webp`}
                                        style={{
                                            width: "32px",
                                            height: "32px",
                                            minHeight: "32px",
                                            minWidth: "32px",
                                        }}
                                        alt="Item 3 image"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ),
                disableSortBy: true,
            },
            ...(isWinrate ? getColumns(true) : []),
            ...(isPickrate ? getColumns(false) : []),
        ],
        []
    );

    const table = useTable(
        {
            columns,
            data,
            autoResetSortBy: false,
        },
        isFull ? useSortBy : null,
        isFull ? usePagination : null
    );

    useEffect(() => {
        const id =
            router.query.sortby?.toString() ?? sortBy ?? "pickrate-increase";

        if (table.setSortBy) {
            table.setSortBy([{ id, desc: true }]);
        }
    }, [router.query.sortby, sortBy]);

    const gotoBuild = (row) =>
        router.push(`/champions/${row.original.championId}`);

    const linkHref =
        "/builds" +
        createQueryString({
            sortby: isPickrate ? "pickrate-increase" : "winrate-increase",
            filterType,
            filterId,
            filterName,
        });

    return (
        <div
            className={
                !isFull
                    ? "mb-4 overflow-hidden rounded shadow"
                    : "mb-4 overflow-hidden rounded"
            }
        >
            <Table table={table} onClick={gotoBuild} size={size} />
            {!isFull && (
                <Link
                    href={linkHref}
                    passHref
                    className="flex w-full items-center justify-center rounded-b bg-gray-50 p-2 text-lg shadow dark:bg-gray-800 dark:text-gray-50"
                >
                    <h2 className="font-header">
                        {filterName
                            ? `View all ${filterName} builds`
                            : "View all builds"}
                    </h2>
                    <ArrowSmRightIcon className="inline w-8 text-gray-600 dark:text-gray-400" />
                </Link>
            )}
        </div>
    );
}
