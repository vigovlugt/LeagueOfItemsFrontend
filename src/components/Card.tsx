import { pickrate, winrate, winrateClass } from "../utils/format";
import Link from "next/link";

export default function Card({ type, id, wins, matches, totalMatches }) {
  return (
    <Link href={`/${type}s/${id}`} passHref>
      <a className="block px-3 py-3 rounded text-center shadow cursor-pointer bg-white dark:bg-gray-800">
        <img
          src={`/images/${type}s/64/${id}.webp`}
          style={{
            width: "64px",
            height: "64px",
            minHeight: "64px",
            minWidth: "64px",
          }}
          alt="Image"
        />

        {/*<p className="text-center text-xs font-medium uppercase tracking-wider mt-1 -mb-1 text-gray-500 dark:text-gray-400 whitespace-nowrap">Wins</p>*/}
        <p
          className={`text-center font-bold text-lg ${winrateClass(
            wins,
            matches
          )}`}
        >
          {winrate(wins, matches)}
        </p>
        {/*<p className="text-center text-xs font-medium uppercase tracking-wider -mb-1 text-gray-500 dark:text-gray-400 whitespace-nowrap">Matches</p>*/}
        <p
          className="text-center font-bold text-lg"
          title={pickrate(matches, totalMatches)}
        >
          {matches}
        </p>
      </a>
    </Link>
  );
}
