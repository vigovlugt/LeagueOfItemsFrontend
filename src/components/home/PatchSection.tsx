import Link from "next/link";
import { getPlayrateIncrease, getWinrateIncrease } from "../../utils/stats";
import { TrendingUpIcon } from "@heroicons/react/outline";
import { ArrowSmRightIcon, TrendingDownIcon } from "@heroicons/react/solid";
import ChampionGridCell from "../champions/ChampionGridCell";
import { percentage, winrateClass } from "../../utils/format";
import ItemGridCell from "../items/ItemGridCell";
import RuneGridCell from "../runes/RuneGridCell";
import { CHAMPIONS_PER_MATCH } from "../../constants/constants";
import TopIcon from "../icons/roles/TopIcon";
import Role from "../../models/roles/Role";
import JungleIcon from "../icons/roles/JungleIcon";
import MidIcon from "../icons/roles/MidIcon";
import BottomIcon from "../icons/roles/BottomIcon";
import SupportIcon from "../icons/roles/SupportIcon";
import styles from "./PatchSection.module.css";

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
  playrateRoles,
}) {
  return (
    <div className="rounded p-4 mt-24 bg-white dark:bg-gray-900">
      <Link
        href={`https://www.leagueoflegends.com/en-us/news/game-updates/patch-${dataset.version.replace(
          ".",
          "-"
        )}-notes/`}
        passHref
      >
        <a
          target="_blank"
          className="flex justify-center items-center w-full bg-white rounded-lg p-8 py-24 sm:py-32 shadow mb-8 dark:text-gray-50 dark:bg-dark relative overflow-hidden group"
        >
          <img
            src="/images/patches/patch-banner.webp"
            alt={""}
            className={
              "absolute inset-0 w-full h-full " + styles.patchOverviewImage
            }
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center font-header pointer-events-none text-center">
            <h2 className="text-4xl mt-8 group-hover:text-white">Patch {dataset.version} overview</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-4 group-hover:text-white">
              Patch notes <ArrowSmRightIcon className="w-6 inline" />
            </p>
          </div>
        </a>
      </Link>

      <PatchEntityChanges
        playrateData={playrateChampions}
        winrateData={winrateChampions}
        matches={championMatches / CHAMPIONS_PER_MATCH}
        previousMatches={previousChampionMatches / CHAMPIONS_PER_MATCH}
        rolePlayrateData={playrateRoles}
        type="CHAMPION"
      />

      <PatchEntityChanges
        playrateData={playrateItems}
        winrateData={winrateItems}
        matches={championMatches / CHAMPIONS_PER_MATCH}
        previousMatches={previousChampionMatches / CHAMPIONS_PER_MATCH}
        type="ITEM"
      />

      <PatchEntityChanges
        playrateData={playrateRunes}
        winrateData={winrateRunes}
        matches={championMatches / CHAMPIONS_PER_MATCH}
        previousMatches={previousChampionMatches / CHAMPIONS_PER_MATCH}
        type="RUNE"
      />
    </div>
  );
}

const PatchEntityChanges = ({
  playrateData,
  winrateData,
  matches,
  previousMatches,
  rolePlayrateData = [],
  type,
}) => {
  const title = {
    RUNE: "Runes",
    CHAMPION: "Champions",
    ITEM: "Items",
  }[type];

  const dataKey = type.toLowerCase(); // ITEM => item.

  return (
    <div>
      <h2 className="font-header text-4xl mb-2 mt-8">{title}</h2>
      <h2 className="font-header text-xl lg:text-2xl mb-2">
        Biggest playrate changes since last patch
      </h2>
      <div className="flex space-x-2 w-full overflow-x-auto pb-2">
        {playrateData.map((d) => (
          <DifferenceCard
            key={d.id}
            {...{ [dataKey]: d }}
            type="playrate"
            matches={matches}
            previousMatches={previousMatches}
          />
        ))}
      </div>
      <h2 className="font-header text-xl lg:text-2xl mt-4 mb-2">
        Biggest winrate changes since last patch
      </h2>
      <div className="flex space-x-2 w-full overflow-x-auto pb-2">
        {winrateData.map((d) => (
          <DifferenceCard key={d.id} {...{ [dataKey]: d }} />
        ))}
      </div>
      {rolePlayrateData.length > 0 && (
        <>
          <h2 className="font-header text-xl lg:text-2xl mt-4 mb-2">
            Role playrate increases since last patch
          </h2>
          <div className="flex space-x-2 w-full overflow-x-auto pb-2">
            {rolePlayrateData.map((d) => {
              const data = { ...d, id: d.championId };

              return (
                <DifferenceCard
                  key={d.championId + "-" + d.role}
                  champion={data}
                  type="playrate"
                  matches={d.totalMatches}
                  previousMatches={d.previousTotalMatches}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

const DifferenceCard = ({
  champion = null,
  item = null,
  rune = null,
  type = "winrate",
  matches = 0,
  previousMatches = 0,
  role = null,
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

  const RoleIcon = {
    [Role.Top]: TopIcon,
    [Role.Jungle]: JungleIcon,
    [Role.Mid]: MidIcon,
    [Role.Adc]: BottomIcon,
    [Role.Supp]: SupportIcon,
  }[entity.role];

  return (
    <div className="flex flex-col items-center bg-white rounded shadow text-gray-900 dark:text-gray-50 dark:bg-gray-800">
      <div className="relative h-32 w-32 flex justify-center items-center rounded-t overflow-hidden">
        {champion && <ChampionGridCell id={champion.id} />}
        {RoleIcon && (
          <RoleIcon className="absolute right-0 bottom-0 w-11 pointer-events-none bg-gray-800 pt-[4px] pl-[4px] rounded-tl-lg" />
        )}
        {item && <ItemGridCell id={item.id} />}
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
