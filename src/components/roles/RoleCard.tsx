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
    <div className="block px-3 py-3 rounded text-center shadow bg-white dark:bg-gray-800">
      <Icon className="mb-1 text-gray-600 mx-auto dark:text-white" />
      {/*<p className="text-center text-xs font-medium uppercase tracking-wider -mb-1 text-gray-500 dark:text-gray-400 whitespace-nowrap">*/}
      {/*  Wins*/}
      {/*</p>*/}
      <p
        className={`text-center font-bold text-lg ${winrateClass(
          wins,
          matches
        )}`}
      >
        {winrate(wins, matches)}
      </p>
      {/*<p className="text-center text-xs font-medium uppercase tracking-wider -mb-1 text-gray-500 dark:text-gray-400 whitespace-nowrap">*/}
      {/*  Matches*/}
      {/*</p>*/}
      <p
        className="text-center font-bold text-lg"
        title={pickrate(matches, totalMatches)}
      >
        {matches}
      </p>
    </div>
  );
}
