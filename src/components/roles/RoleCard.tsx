import Image from "next/image";
import { pickrate, winrate, winrateClass } from "../../utils/format";

export default function RoleCard({ role, wins, matches, totalMatches }) {
  return (
    <div className="block px-3 py-3 rounded text-center shadow bg-white dark:bg-gray-800">
      <Image
        height={46}
        width={46}
        src={`/images/roles/${role}.png`}
        className="role-image mb-1"
      />
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
