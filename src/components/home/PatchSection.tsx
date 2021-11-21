import Link from "next/link";
import { getPlayrateIncrease, getWinrateIncrease } from "../../utils/stats";
import { TrendingUpIcon } from "@heroicons/react/outline";
import { ArrowSmRightIcon, TrendingDownIcon } from "@heroicons/react/solid";
import ChampionGridCell from "../champions/ChampionGridCell";
import { percentage, winrateClass } from "../../utils/format";
import ItemGridCell from "../items/ItemGridCell";
import RuneGridCell from "../runes/RuneGridCell";

export default function PatchSection({
  dataset,
  winrateChampions,
  playrateChampions,
  winrateItems,
  playrateItems,
  winrateRunes,
  playrateRunes,
  championMatches,
  previousChampionMatches,
  itemMatches,
  previousItemMatches,
  runeMatches,
  previousRuneMatches,
}) {
  return (
    <div>
      <Link
        href={`https://www.leagueoflegends.com/en-us/news/game-updates/patch-${dataset.version.replace(
          ".",
          "-"
        )}-notes/`}
        passHref
      >
        <a
          target="_blank"
          className="flex justify-center items-center w-full bg-white rounded-lg p-8 py-32 shadow mb-8 dark:text-gray-50 dark:bg-dark relative overflow-hidden"
        >
          <img
            src="https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt2161d99d433ee6fd/6189caf9cc735f786653bb6e/patch-10-24-banner.jpg"
            alt={""}
            style={{
              objectFit: "cover",
              objectPosition: "center",
              filter: "saturate(0) opacity(0.3)",
            }}
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 flex justify-center items-center">
            <h2 className="font-header text-4xl">Patch {dataset.version}</h2>
          </div>
        </a>
      </Link>

      <h2 className="font-header text-4xl mb-2 mt-8">Champions</h2>
      <h2 className="font-header text-2xl mb-2">Biggest winrate changes</h2>
      <div className="flex space-x-2 w-full overflow-x-auto pb-2">
        {winrateChampions.map((c) => (
          <DifferenceCard key={c.id} champion={c} />
        ))}
      </div>
      <h2 className="font-header text-2xl mb-2 mt-8">
        Biggest playrate changes
      </h2>
      <div className="flex space-x-2 w-full overflow-x-auto pb-2">
        {playrateChampions.map((c) => (
          <DifferenceCard
            key={c.id}
            champion={c}
            type="playrate"
            matches={championMatches}
            previousMatches={previousChampionMatches}
          />
        ))}
      </div>

      <h2 className="font-header text-4xl mb-2 mt-8">Items</h2>
      <h2 className="font-header text-2xl mb-2">Biggest winrate changes</h2>
      <div className="flex space-x-2 w-full overflow-x-auto pb-2">
        {winrateItems.map((i) => (
          <DifferenceCard key={i.id} item={i} />
        ))}
      </div>
      <h2 className="font-header text-2xl mb-2 mt-8">
        Biggest playrate changes
      </h2>
      <div className="flex space-x-2 w-full overflow-x-auto pb-2">
        {playrateItems.map((i) => (
          <DifferenceCard
            key={i.id}
            item={i}
            type="playrate"
            matches={itemMatches}
            previousMatches={previousItemMatches}
          />
        ))}
      </div>

      <h2 className="font-header text-4xl mb-2 mt-8">Runes</h2>
      <h2 className="font-header text-2xl mb-2">Biggest winrate changes</h2>
      <div className="flex space-x-2 w-full overflow-x-auto pb-2">
        {winrateRunes.map((i) => (
          <DifferenceCard key={i.id} rune={i} />
        ))}
      </div>
      <h2 className="font-header text-2xl mb-2 mt-8">
        Biggest playrate changes
      </h2>
      <div className="flex space-x-2 w-full overflow-x-auto pb-2">
        {playrateRunes.map((i) => (
          <DifferenceCard
            key={i.id}
            rune={i}
            type="playrate"
            matches={runeMatches}
            previousMatches={previousRuneMatches}
          />
        ))}
      </div>
    </div>
  );
}

const DifferenceCard = ({
  champion = null,
  item = null,
  rune = null,
  type = "winrate",
  matches = 0,
  previousMatches = 0,
}) => {
  const isWinrate = type === "winrate";

  const entity = champion ?? item ?? rune;

  const increase = isWinrate
    ? getWinrateIncrease(entity)
    : getPlayrateIncrease(entity, matches, previousMatches);

  const current = isWinrate
    ? entity.wins / entity.matches
    : entity.matches / matches;

  const previous = isWinrate
    ? entity.previousWins / entity.previousMatches
    : entity.previousMatches / previousMatches;

  const TrendingIcon = increase > 0 ? TrendingUpIcon : TrendingDownIcon;

  return (
    <div className="flex flex-col items-center bg-white rounded shadow dark:text-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50">
      <div className="h-32 w-32 flex justify-center items-center">
        {champion && <ChampionGridCell id={champion.id} />}
        {item && <ItemGridCell id={item.id} className="mr-0 mb-0" />}
        {rune && (
          <RuneGridCell
            id={rune.id}
            className="mr-0 mb-0"
            size={rune.isKeystone ? "md" : "sm"}
          />
        )}
      </div>

      <div
        className={`flex items-center font-semibold ${
          rune !== null ? "mb-1" : "my-1"
        } ${winrateClass(0.5 + increase, undefined, true)}`}
      >
        <TrendingIcon className="w-8 inline mr-2" />
        <span className="text-xl font-header">{percentage(increase)}</span>
      </div>
      <div className="flex items-center mb-2 font-semibold text-xs ">
        <span className="text-gray-600 dark:text-gray-400">
          {" "}
          {percentage(previous)}
        </span>
        <ArrowSmRightIcon className="h-4 inline text-gray-600 dark:text-gray-400" />{" "}
        <span>{percentage(current)}</span>
      </div>
    </div>
  );
};
