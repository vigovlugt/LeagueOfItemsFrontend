import GridCell from "../GridCell";
import { percentage, winrate, winrateClass } from "../../utils/format";
import { ArrowSmRightIcon, TrendingDownIcon } from "@heroicons/react/solid";
import { TrendingUpIcon } from "@heroicons/react/outline";
import IPatchNotesChange from "../../models/patchnotes/IPatchNotesChange";
import IPatchNotesStats, {
    IPatchNotesBaseStats,
    IPatchNotesChampionStats,
} from "../../models/patchnotes/IPatchNotesStats";
import BuildsTable from "../home/BuildsTable";
import Role from "../../models/roles/Role";
import TopIcon from "../icons/roles/TopIcon";
import JungleIcon from "../icons/roles/JungleIcon";
import MidIcon from "../icons/roles/MidIcon";
import BottomIcon from "../icons/roles/BottomIcon";
import SupportIcon from "../icons/roles/SupportIcon";
import HelpHover from "../HelpHover";
import { decode } from "html-entities";
import ReactMarkdown from "react-markdown";
import { useCallback, useMemo } from "react";
import { useTable } from "react-table";
import Table from "../table/Table";
import { getPickrateIncrease, getWinrateIncrease } from "../../utils/stats";
import { PatchNotesChangeType } from "../../models/patchnotes/IPatchNotesChange";

const patchNotesStatsKeys: Record<
    PatchNotesChangeType,
    "champions" | "runes" | "items"
> = {
    CHAMPION: "champions",
    RUNE: "runes",
    ITEM: "items",
};

const patchNotesMarkdownComponents = {
    h2: ({ children }: any) => (
        <h4 className="mb-2 mt-6 font-header text-xl">{children}</h4>
    ),
    h3: ({ children }: any) => (
        <h4 className="mb-2 mt-6 font-header text-xl">{children}</h4>
    ),
    h4: ({ children }: any) => (
        <h4 className="mb-2 mt-6 font-header text-xl">{children}</h4>
    ),
    p: ({ children }: any) => (
        <p className="mb-4 max-w-[65ch] font-medium leading-relaxed">
            {children}
        </p>
    ),
    blockquote: ({ children }: any) => (
        <blockquote className="mb-4 max-w-[65ch] border-l-4 border-gray-300 pl-4 font-medium italic text-gray-600 dark:border-gray-700 dark:text-gray-400">
            {children}
        </blockquote>
    ),
    ul: ({ children }: any) => (
        <ul className="mb-4 ml-5 max-w-[65ch] list-disc space-y-1 font-medium">
            {children}
        </ul>
    ),
    li: ({ children }: any) => <li>{children}</li>,
    strong: ({ children }: any) => (
        <strong className="font-bold text-gray-900 dark:text-gray-100">
            {children}
        </strong>
    ),
    hr: () => <hr className="my-6 border-gray-300 dark:border-gray-700" />,
    a: ({ children, href }: any) => (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
        >
            {children}
        </a>
    ),
    img: ({ src, alt }: any) => (
        <img
            src={src}
            alt={alt || ""}
            loading="lazy"
            className="my-4 max-w-full rounded shadow"
        />
    ),
};

export default function PatchNotesChange({
    patchNotesChange,
    patchNotesStats,
    championMatches,
    previousChampionMatches,
}: {
    patchNotesChange: IPatchNotesChange;
    patchNotesStats: IPatchNotesStats;
    championMatches: number;
    previousChampionMatches: number;
}) {
    const statsKey = patchNotesChange.type
        ? patchNotesStatsKeys[patchNotesChange.type]
        : undefined;
    const hasEntityReference =
        statsKey !== undefined && patchNotesChange.id != null;
    const entity: IPatchNotesBaseStats | undefined = hasEntityReference
        ? patchNotesStats[statsKey][patchNotesChange.id]
        : undefined;

    const matches =
        patchNotesChange.type === "CHAMPION"
            ? championMatches
            : championMatches / 10;

    const previousMatches =
        patchNotesChange.type === "CHAMPION"
            ? previousChampionMatches
            : previousChampionMatches / 10;

    return (
        <div className="min-w-0 border-t-[2px] border-gray-300 pt-4 dark:border-gray-700">
            <div className="mb-2 flex">
                {hasEntityReference && (
                    <GridCell
                        type={patchNotesChange.type}
                        id={patchNotesChange.id}
                    />
                )}
                <div className={hasEntityReference ? "ml-4" : ""}>
                    <h3 className="mb-2 font-header text-2xl">
                        {patchNotesChange.title}
                    </h3>
                </div>
            </div>
            <ReactMarkdown components={patchNotesMarkdownComponents}>
                {decode(patchNotesChange.body)}
            </ReactMarkdown>

            {entity && (
                <div className="mt-8 mb-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                    <DifferenceCard
                        current={entity.wins / entity.matches}
                        previous={entity.previousWins / entity.previousMatches}
                        text="Winrate"
                    />
                    <DifferenceCard
                        current={entity.matches / matches}
                        previous={entity.previousMatches / previousMatches}
                        text="Pickrate"
                    />
                    {patchNotesChange.type === "CHAMPION" && (
                        <DifferenceCard
                            current={
                                ((entity as IPatchNotesChampionStats).bans /
                                    matches) *
                                10
                            }
                            previous={
                                ((entity as IPatchNotesChampionStats)
                                    .previousBans /
                                    previousMatches) *
                                10
                            }
                            text="Banrate"
                        />
                    )}
                </div>
            )}

            {entity && entity.buildStats.length > 0 && (
                <div className="mb-4 max-w-[512px]">
                    <h4 className="mb-2 font-header text-xl">
                        Build pickrate{" "}
                        {patchNotesChange.type === "CHAMPION"
                            ? "increases"
                            : "changes"}{" "}
                        <HelpHover
                            text={
                                patchNotesChange.type === "CHAMPION"
                                    ? "Increase >5%"
                                    : "Change >5%"
                            }
                        />
                    </h4>
                    <BuildsTable
                        builds={entity.buildStats}
                        size="sm"
                        filterId={patchNotesChange.id}
                        filterName={patchNotesChange.title}
                        filterType={patchNotesChange.type}
                    />
                </div>
            )}

            {entity && patchNotesChange.type === "CHAMPION" && (
                <ChampionStats
                    championStats={entity as IPatchNotesChampionStats}
                />
            )}
        </div>
    );
}

function ChampionStats({
    championStats,
}: {
    championStats: IPatchNotesChampionStats;
}) {
    const roleStatsData = useMemo(
        () => championStats.roleStats,
        [championStats.roleStats]
    );

    const getColumns = useCallback(
        (isWinrate) => [
            {
                Header: isWinrate ? "WR increase" : "PR increase",
                headerClass: "text-right",
                id: isWinrate ? "winrate" : "pickrate",
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
                              championStats.matches,
                              championStats.previousMatches
                          );

                    const TrendingIcon =
                        increase > 0 ? TrendingUpIcon : TrendingDownIcon;

                    return (
                        <div className="flex justify-end">
                            <div
                                className={`flex items-center ${winrateClass(
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
                              row.original.matches / championStats.matches
                          );
                    const previousValue = isWinrate
                        ? winrate(
                              row.original.previousWins,
                              row.original.previousMatches
                          )
                        : percentage(
                              row.original.previousMatches /
                                  championStats.previousMatches
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
            },
        ],
        [championStats.matches, championStats.previousMatches]
    );

    const columns = useMemo(
        () => [
            {
                Header: "role",
                accessor: "role",
                Cell: ({ row }) => {
                    const RoleIcon = {
                        [Role.Top]: TopIcon,
                        [Role.Jungle]: JungleIcon,
                        [Role.Mid]: MidIcon,
                        [Role.Adc]: BottomIcon,
                        [Role.Supp]: SupportIcon,
                    }[row.original.role];

                    return <RoleIcon className="w-8" />;
                },
            },
            ...getColumns(true),
            ...getColumns(false),
        ],
        [getColumns]
    );

    const table = useTable({
        columns,
        data: roleStatsData,
    });

    return (
        <div>
            {championStats.roleStats.length > 0 && (
                <>
                    <h4 className="mb-2 font-header text-xl">Role changes</h4>
                    <div className="overflow-hidden rounded">
                        <Table table={table} size="sm" />
                        <div className="h-3 bg-gray-50 shadow dark:bg-gray-800 dark:text-gray-50" />
                    </div>
                </>
            )}
        </div>
    );
}

function DifferenceCard({ current, previous, text }) {
    const increase = current - previous;
    const TrendingIcon = increase > 0 ? TrendingUpIcon : TrendingDownIcon;

    return (
        <div className="flex w-full items-center rounded bg-white p-4 text-lg font-bold text-gray-600 shadow dark:bg-gray-800 dark:text-gray-300">
            <div className="align-center mx-auto flex flex-col items-center">
                <div
                    className={`flex items-center font-semibold ${winrateClass(
                        0.5 + increase,
                        undefined,
                        true
                    )}`}
                >
                    <span className="font-header text-xl">
                        <TrendingIcon className="mr-2 inline w-8" />
                        {percentage(increase)}
                    </span>
                </div>
                <div className="flex items-center text-xs font-semibold">
                    <span className="text-gray-600 dark:text-gray-400">
                        {" "}
                        {percentage(previous)}
                    </span>
                    <ArrowSmRightIcon className="inline h-4 text-gray-600 dark:text-gray-400" />{" "}
                    <span>{percentage(current)}</span>
                </div>
                <span>{text}</span>
            </div>
        </div>
    );
}
