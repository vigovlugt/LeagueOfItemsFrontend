import BuildsApi from "../api/BuildsApi";
import BuildsTable from "../components/home/BuildsTable";
import RuneApi from "../api/RuneApi";
import RuneStats from "../models/runes/RuneStats";
import BuildStats, { IBuildStats } from "../models/builds/BuildStats";
import { useEffect, useState } from "react";
import { Popover } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import FilterSelector from "../components/builds/FilterSelector";
import { useRouter } from "next/router";
import useFavourites from "../hooks/useFavourites";

export default function BuildsPage({
    builds,
}: {
    builds: (IBuildStats & { isKeystone: boolean; isSmallRune: boolean })[];
}) {
    const router = useRouter();

    const [filteredBuilds, setFilteredBuilds] = useState(builds);

    const [showSmallRunes, setShowSmallRunes] = useState(false);
    const toggleShowSmallRunes = () => setShowSmallRunes(!showSmallRunes);
    const [showKeyStones, setShowKeyStones] = useState(true);
    const toggleShowKeyStones = () => setShowKeyStones(!showKeyStones);
    const [showBuildPaths, setShowBuildPaths] = useState(true);
    const toggleShowBuildPaths = () => setShowBuildPaths(!showBuildPaths);
    const [onlyFavourites, setOnlyFavourites] = useState(false);
    const toggleOnlyFavourites = () => setOnlyFavourites(!onlyFavourites);
    const [only500Matches, setOnly500Matches] = useState(false);
    const toggleOnly500Matches = () => setOnly500Matches(!only500Matches);

    const [championFilter, setChampionFilter] = useState(null);
    const [itemFilter, setItemFilter] = useState(null);
    const [runeFilter, setRuneFilter] = useState(null);

    const { favourites } = useFavourites();

    useEffect(() => {
        const fnByType = {
            CHAMPION: setChampionFilter,
            RUNE: setRuneFilter,
            ITEM: setItemFilter,
        };

        const id = router.query.filterId?.toString();
        const name = router.query.filterName?.toString();
        const type = router.query.filterType?.toString();
        const setFn = fnByType[type];

        if (id == null || name == null || setFn == null) {
            return;
        }

        setFn({ id: +id, name, type: type.toLowerCase() });
    }, [
        router.query.filterId,
        router.query.filterName,
        router.query.filterType,
    ]);

    useEffect(
        () =>
            setFilteredBuilds(
                builds.filter((b) => {
                    if (championFilter && b.championId !== championFilter.id) {
                        return false;
                    }

                    if (
                        itemFilter &&
                        ![b.item1Id, b.item2Id, b.item3Id].includes(
                            itemFilter.id
                        )
                    ) {
                        return false;
                    }

                    if (runeFilter && b.runeId !== runeFilter.id) {
                        return false;
                    }

                    if (!showBuildPaths && b.buildType === "BUILD_PATH") {
                        return false;
                    }

                    if (!showKeyStones && b.isKeystone) {
                        return false;
                    }

                    if (!showSmallRunes && b.isSmallRune) {
                        return false;
                    }

                    if (
                        onlyFavourites &&
                        favourites.find((f) => {
                            if (f.type === "CHAMPION") {
                                return f.id == b.championId;
                            } else if (f.type === "RUNE") {
                                return f.id == b.runeId;
                            } else if (f.type === "ITEM") {
                                return [
                                    b.item1Id,
                                    b.item2Id,
                                    b.item3Id,
                                ].includes(f.id);
                            }

                            return false;
                        }) == null
                    ) {
                        return false;
                    }

                    if (
                        only500Matches &&
                        (b.matches < 500 || b.previousMatches < 500)
                    ) {
                        return false;
                    }

                    return true;
                })
            ),
        [
            builds,
            showBuildPaths,
            showKeyStones,
            showSmallRunes,
            championFilter,
            itemFilter,
            runeFilter,
            onlyFavourites,
            only500Matches,
        ]
    );

    return (
        <div className="w-">
            <div className="mb-4 flex rounded bg-white p-3 shadow dark:bg-gray-900">
                <Popover className="relative">
                    {({}) => (
                        <>
                            <Popover.Button className="inline-flex items-center rounded-md px-3 py-2 font-medium dark:text-white">
                                <span>Filters</span>
                                <ChevronDownIcon className="ml-1 h-5 w-5" />
                            </Popover.Button>
                            <Popover.Panel className="absolute -left-4 z-10 w-96 px-4">
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="relative flex flex-col space-y-1 bg-white p-6 font-medium dark:bg-gray-800">
                                        <span>Items</span>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="mr-1"
                                                checked={showBuildPaths}
                                                onChange={toggleShowBuildPaths}
                                            />{" "}
                                            Build Paths
                                        </label>
                                        <span className="pt-4">Runes</span>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="mr-1"
                                                checked={showKeyStones}
                                                onChange={toggleShowKeyStones}
                                            />{" "}
                                            Keystones
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="mr-1"
                                                checked={showSmallRunes}
                                                onChange={toggleShowSmallRunes}
                                            />{" "}
                                            Small runes
                                        </label>
                                        <span className="pt-4">Favourites</span>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="mr-1"
                                                checked={onlyFavourites}
                                                onChange={toggleOnlyFavourites}
                                            />{" "}
                                            Only favourites
                                        </label>
                                        <span className="pt-4">Matches</span>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="mr-1"
                                                checked={only500Matches}
                                                onChange={toggleOnly500Matches}
                                            />{" "}
                                            Only 500+ matches
                                        </label>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </>
                    )}
                </Popover>

                <div className="ml-auto flex items-center">
                    <FilterSelector
                        filter={itemFilter}
                        setFilter={setItemFilter}
                        type="ITEM"
                    />
                    <FilterSelector
                        filter={runeFilter}
                        setFilter={setRuneFilter}
                        type="RUNE"
                    />
                    <FilterSelector
                        filter={championFilter}
                        setFilter={setChampionFilter}
                        type="CHAMPION"
                    />
                </div>
            </div>

            <BuildsTable builds={filteredBuilds} type="full" />
        </div>
    );
}

export function getStaticProps() {
    const runes = RuneApi.getAllRunes();
    const keystones = runes
        .map((r) => new RuneStats(r))
        .filter((r) => r.isKeystone())
        .map((r) => r.id);

    const builds = BuildsApi.getByWinrate().map((b) => ({
        ...b,
        isSmallRune: BuildStats.isSmallRune(b, keystones),
        isKeystone: BuildStats.isKeystone(b, keystones),
    }));

    return {
        props: {
            builds,
        },
    };
}

BuildsPage.pageName = "Builds";
