import ItemApi from "../api/ItemApi";
import BuildsApi from "../api/BuildsApi";
import ComboTable from "../components/home/BuildsTable";
import RuneApi from "../api/RuneApi";
import RuneStats from "../models/runes/RuneStats";
import BuildStats from "../models/builds/BuildStats";
import { useEffect, useRef, useState } from "react";
import { Popover } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import ItemStats from "../models/items/ItemStats";
import { useRouter } from "next/router";
import classNames from "classnames";

export default function ComboPage({ builds }) {
  const router = useRouter();

  const [filteredBuilds, setFilteredBuilds] = useState(builds);

  const [showSmallRunes, setShowSmallRunes] = useState(false);
  const toggleShowSmallRunes = () => setShowSmallRunes(!showSmallRunes);
  const [showKeyStones, setShowKeyStones] = useState(true);
  const toggleShowKeyStones = () => setShowKeyStones(!showKeyStones);
  const [showMythics, setShowMythics] = useState(true);
  const toggleShowMythics = () => setShowMythics(!showMythics);
  const [showNonMythics, setShowNonMythics] = useState(true);
  const toggleShowNonMythics = () => setShowNonMythics(!showNonMythics);

  const championInput = useRef<HTMLInputElement>();
  const [showChampionSelect, setShowChampionSelect] = useState(false);
  const onClickAllChampions = () => {
    setShowChampionSelect(true);
  };

  useEffect(() => {
    if (showChampionSelect) {
      championInput.current.focus();
    }
  }, [showChampionSelect]);

  useEffect(
    () =>
      setFilteredBuilds(
        builds.filter((b) => {
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
    [showMythics, showNonMythics, showKeyStones, showSmallRunes]
  );

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
            <input
              ref={championInput}
              onBlur={() => setShowChampionSelect(false)}
              className={classNames(
                "h-full border rounded-md px-3 text-sm w-72 xl:w-96 shadow-sm border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white"
              )}
              placeholder="Search champion"
            />
          ) : (
            <button
              className="px-3 py-2 rounded-md inline-flex items-center font-medium dark:text-white"
              onClick={onClickAllChampions}
            >
              <span>All champions</span>
              <ChevronDownIcon className="ml-1 h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <ComboTable builds={filteredBuilds} type="full" />
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
  const mythics = items
    .map((i) => new ItemStats(i))
    .filter((i) => i.isMythic())
    .map((i) => i.id);

  const builds = await BuildsApi.getByWinrate().map((b) => ({
    ...b,
    isSmallRune: BuildStats.isSmallRune(b, keystones),
    isMythic: BuildStats.isMythic(b, mythics),
    isNonMythics: BuildStats.isNonMythic(b, mythics),
    isKeystone: BuildStats.isKeystone(b, keystones),
  }));

  return {
    props: {
      builds,
    },
  };
}

ComboPage.pageName = "Combos";
