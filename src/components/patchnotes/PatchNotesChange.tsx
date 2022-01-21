import GridCell from "../GridCell";
import PatchNotesChangeDetail from "./PatchNotesChangeDetail";
import { percentage, winrateClass } from "../../utils/format";
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
import {decode} from "html-entities";

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
  const key = {
    CHAMPION: "champions",
    RUNE: "runes",
    ITEM: "items",
  }[patchNotesChange.type];
  const entity: IPatchNotesBaseStats =
    patchNotesStats[key][patchNotesChange.id];

  const matches =
    patchNotesChange.type === "CHAMPION"
      ? championMatches
      : championMatches / 10;
  const previousMatches =
    patchNotesChange.type === "CHAMPION"
      ? previousChampionMatches
      : previousChampionMatches / 10;

  return (
    <div className="pt-4 border-t-[2px] border-gray-300 dark:border-gray-700 min-w-0">
      <div className="flex mb-2">
        <GridCell type={patchNotesChange.type} id={patchNotesChange.id} />
        <div className="ml-4">
          <h3 className="font-header text-2xl mb-2">
            {patchNotesChange.title}
          </h3>
          {patchNotesChange.summary && (
            <p className="font-medium max-w-[65ch] mb-2">
              {decode(patchNotesChange.summary)}
            </p>
          )}
          {/*{patchNotesChange.quote && (*/}
          {/*  <p className="hidden sm:block font-medium max-w-[65ch] mb-2 italic text-gray-400">*/}
          {/*    “{patchNotesChange.quote}”*/}
          {/*  </p>*/}
          {/*)}*/}
        </div>
      </div>
      {patchNotesChange.quote && (
        <p className="font-medium mb-2 italic text-gray-600 dark:text-gray-400">
          “{decode(patchNotesChange.quote)}”
        </p>
      )}
      <div>
        {patchNotesChange.details.map((d, i) => (
          <PatchNotesChangeDetail key={i} {...d} />
        ))}
      </div>

      <div className="flex mt-8 mb-4 space-x-4">
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
      </div>

      {entity.buildStats.length > 0 && (
        <div className="mb-4 max-w-[512px]">
          <h4 className="font-header text-xl mb-2">
            Build pickrate {patchNotesChange.type === "CHAMPION" ? "increase" : "change"} <HelpHover text={patchNotesChange.type === "CHAMPION" ? "Increase >5%" : "Change >5%"} />
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

      {patchNotesChange.type === "CHAMPION" && (
        <ChampionStats championStats={entity as IPatchNotesChampionStats} />
      )}
    </div>
  );
}

function ChampionStats({
  championStats,
}: {
  championStats: IPatchNotesChampionStats;
}) {
  return (
    <div>
      {championStats.roleStats.length > 0 && (
        <>
          <h4 className="font-header text-xl mb-2">Role pickrate increases <HelpHover text="Increase >5%" /></h4>
          <div className="flex space-x-4 overflow-x-scroll pb-2">
            {championStats.roleStats.map((s) => (
              <RoleDifferenceCard
                key={s.role}
                current={s.matches / championStats.matches}
                previous={s.previousMatches / championStats.previousMatches}
                role={s.role}
              />
            ))}
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
    <div className="flex items-center rounded p-4 text-lg font-bold shadow bg-white text-gray-600 dark:text-gray-300 dark:bg-gray-800 w-1/2">
      <div className="sm:flex align-center items-center mx-auto">
        <div className="flex flex-col items-center">
          <div
            className={`flex items-center font-semibold ${winrateClass(
              0.5 + increase,
              undefined,
              true
            )}`}
          >
            <span className="text-xl font-header">
              <TrendingIcon className="w-8 inline mr-2" />
              {percentage(increase)}
            </span>
          </div>
          <div className="flex items-center mb-2 font-semibold text-xs">
            <span className="text-gray-600 dark:text-gray-400">
              {" "}
              {percentage(previous)}
            </span>
            <ArrowSmRightIcon className="h-4 inline text-gray-600 dark:text-gray-400" />{" "}
            <span>{percentage(current)}</span>
          </div>
        </div>
        <span className="ml-4">{text}</span>
      </div>
    </div>
  );
}

const RoleDifferenceCard = ({ current, previous, role }) => {
  const increase = current - previous;

  const TrendingIcon = increase > 0 ? TrendingUpIcon : TrendingDownIcon;

  const RoleIcon = {
    [Role.Top]: TopIcon,
    [Role.Jungle]: JungleIcon,
    [Role.Mid]: MidIcon,
    [Role.Adc]: BottomIcon,
    [Role.Supp]: SupportIcon,
  }[role];

  return (
    <div className="flex flex-col items-center bg-white rounded shadow text-gray-900 dark:text-gray-50 dark:bg-gray-800">
      <div className="h-16 w-32 flex justify-center items-center rounded-t overflow-hidden">
        <RoleIcon className="w-12" />
      </div>

      <div
        className={`flex items-center font-semibold ${winrateClass(
          0.5 + increase,
          undefined,
          true
        )}`}
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
