import ItemApi from "../api/ItemApi";
import BuildsApi from "../api/BuildsApi";
import ComboTable from "../components/home/BuildsTable";
import RuneApi from "../api/RuneApi";
import RuneStats from "../models/runes/RuneStats";
import BuildStats from "../models/builds/BuildStats";
import { useEffect, useRef, useState } from "react";
import { Popover } from "@headlessui/react";
import { ChevronDownIcon, XIcon } from "@heroicons/react/solid";
import ItemStats from "../models/items/ItemStats";
import classNames from "classnames";
import getSearchResults from "../lib/search";
import useOuterClick from "../hooks/useOuterClick";

export default function BuildsPage({ builds }) {
  const [filteredBuilds, setFilteredBuilds] = useState(builds);

  const [showSmallRunes, setShowSmallRunes] = useState(false);
  const toggleShowSmallRunes = () => setShowSmallRunes(!showSmallRunes);
  const [showKeyStones, setShowKeyStones] = useState(true);
  const toggleShowKeyStones = () => setShowKeyStones(!showKeyStones);
  const [showMythics, setShowMythics] = useState(true);
  const toggleShowMythics = () => setShowMythics(!showMythics);
  const [showNonMythics, setShowNonMythics] = useState(true);
  const toggleShowNonMythics = () => setShowNonMythics(!showNonMythics);

  const [championFilter, setChampionFilter] = useState(null);

  const championInput = useRef<HTMLInputElement>();
  const [showChampionSelect, setShowChampionSelect] = useState(false);
  const onClickAllChampions = () => {
    setShowChampionSelect(true);
  };

  useEffect(() => {
    if (showChampionSelect) {
      championInput.current.focus();
      fetchDataset();
    }
  }, [showChampionSelect]);

  useEffect(
    () =>
      setFilteredBuilds(
        builds.filter((b) => {
          if (championFilter && b.championId !== championFilter.id) {
            return false;
          }

          if (!showMythics && b.isMythic) {
            return false;
          }

          if (!showNonMythics && b.isNonMythics) {
            return false;
          }

          if (!showKeyStones && b.isKeystone) {
            return false;
          }

          if (!showSmallRunes && b.isSmallRune) {
            return false;
          }

          return true;
        })
      ),
    [showMythics, showNonMythics, showKeyStones, showSmallRunes, championFilter]
  );

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const [dataset, setDataset] = useState({
    items: [],
    runes: [],
    champions: [],
  });
  const [hasFetchedDataset, setHasFetchedDataset] = useState(false);

  const outerClickRef = useOuterClick(() => {
    if (showChampionSelect) {
      setShowChampionSelect(false);
    }
  });

  const submit = (e) => {
    e.preventDefault();
    if (!results.length) {
      return;
    }

    onSubmit(results[0]);
  };

  const onSubmit = (champion) => {
    setChampionFilter(champion);
    setQuery("");
    setShowChampionSelect(false);
  };

  const fetchDataset = async () => {
    if (hasFetchedDataset) {
      return;
    }

    setHasFetchedDataset(true);

    const res = await fetch("/data/dataset.json");
    const dataset = await res.json();
    setDataset(dataset);
  };

  useEffect(() => {
    const results = getSearchResults(query, dataset).filter(
      (r) => r.type === "champion"
    );

    setResults(results);
  }, [query, dataset]);

  return (
    <div>
      <div className="flex rounded shadow bg-white p-3 mb-4 dark:bg-gray-900">
        <Popover className="relative">
          {({}) => (
            <>
              <Popover.Button className="px-3 py-2 rounded-md inline-flex items-center font-medium dark:text-white">
                <span>Combos</span>
                <ChevronDownIcon className="ml-1 h-5 w-5" />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-96 px-4 -left-4">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative p-6 bg-white dark:bg-gray-800 font-medium flex flex-col space-y-1">
                    <span>Items</span>
                    <label>
                      <input
                        type="checkbox"
                        className="mr-1"
                        checked={showMythics}
                        onChange={toggleShowMythics}
                      />{" "}
                      Mythics
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        className="mr-1"
                        checked={showNonMythics}
                        onChange={toggleShowNonMythics}
                      />{" "}
                      Non-mythics
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
                  </div>
                </div>
              </Popover.Panel>
            </>
          )}
        </Popover>

        <div className="ml-auto flex items-center">
          {showChampionSelect ? (
            <form
              className="relative h-full"
              onSubmit={submit}
              ref={outerClickRef as any}
            >
              <input
                ref={championInput}
                className={classNames(
                  "h-full border rounded-md px-3 text-sm w-72 xl:w-96 shadow-sm border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white"
                )}
                placeholder="Search champion"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
              />
              {results.length > 0 && (
                <div className="absolute rounded-md border py-2 w-full z-10 rounded-t-none bg-white border-gray-300 dark:bg-dark dark:border-gray-600">
                  {results.slice(0, 5).map((result) => (
                    <SearchResult
                      {...result}
                      key={result.id}
                      onClick={() => onSubmit(result)}
                    />
                  ))}
                </div>
              )}
            </form>
          ) : (
            <>
              <button
                className="px-1 py-2 rounded-md inline-flex items-center font-medium dark:text-white"
                onClick={onClickAllChampions}
              >
                <span>
                  {championFilter
                    ? "Only " + championFilter.name
                    : "All champions"}
                </span>
                <ChevronDownIcon className="ml-1 h-5 w-5" />
              </button>
              {championFilter && (
                <button
                  className="px-1 py-2 rounded-md inline-flex items-center font-medium dark:text-white"
                  onClick={() => setChampionFilter(null)}
                >
                  <XIcon className="h-5 w-5" />
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <ComboTable builds={filteredBuilds} type="full" />
    </div>
  );
}

function SearchResult({ name, id, onClick }) {
  return (
    <div
      className="cursor-pointer px-3 py-2 flex items-center justify-start hover:bg-gray-100 dark:hover:bg-gray-800"
      onClick={onClick}
    >
      <img
        src={`/images/champions/32/${id}.webp`}
        style={{
          width: "32px",
          height: "32px",
          minWidth: "32px",
          minHeight: "32px",
        }}
        alt="Search result image"
      />{" "}
      <span className="ml-2 font-bold">{name}</span>
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

  const builds = await BuildsApi.getByWinrate().map((b) => ({
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
