import { pickrate, winrate, winrateClass } from "../../utils/format";
import TopIcon from "../icons/roles/TopIcon";
import Role from "../../models/roles/Role";
import JungleIcon from "../icons/roles/JungleIcon";
import MidIcon from "../icons/roles/MidIcon";
import BottomIcon from "../icons/roles/BottomIcon";
import SupportIcon from "../icons/roles/SupportIcon";

export default function RoleCard({ role, wins, matches, totalMatches }) {
  const Icon = {
    [Role.Top]: TopIcon,
    [Role.Jungle]: JungleIcon,
    [Role.Mid]: MidIcon,
    [Role.Adc]: BottomIcon,
    [Role.Supp]: SupportIcon,
  }[role];

  return (
    <div className="flex flex-col justify-center rounded bg-white px-3 py-3 text-center shadow dark:bg-gray-800">
      <Icon className="mx-auto mb-1 w-[46px] text-gray-600 dark:text-white" />
      {/*<p className="text-center text-xs font-medium uppercase tracking-wider -mb-1 text-gray-500 dark:text-gray-400 whitespace-nowrap">*/}
      {/*  Wins*/}
      {/*</p>*/}
      <p
        className={`text-center text-lg font-bold ${winrateClass(
          wins,
          matches
        )}`}
      >
        {winrate(wins, matches)}
      </p>
      {/*<p className="text-center text-xs font-medium uppercase tracking-wider -mb-1 text-gray-500 dark:text-gray-400 whitespace-nowrap">*/}
      {/*  Matches*/}
      {/*</p>*/}
      <p className="text-center text-lg font-bold" title={matches + " matches"}>
        {pickrate(matches, totalMatches)}
      </p>
    </div>
  );
}
