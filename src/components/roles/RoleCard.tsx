import Image from "next/image";
import { pickrate, winrate, winrateClass } from "../../utils/format";

export default function RoleCard({ role, wins, matches, totalMatches }) {
  return (
    <div className="block px-3 py-3 rounded text-center shadow bg-white dark:bg-gray-800 relative">
      <div
        className="absolute inset-0 rounded bg-gray-200 opacity-70 dark:bg-gray-900 dark:opacity-100"
        style={{
          top: "initial",
          height: pickrate(matches, totalMatches),
        }}
      />

      <div className="relative">
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
    </div>
  );
}
