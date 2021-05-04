import ChampionIcon from "./ChampionIcon";
import { winrate, winrateClass } from "../utils/format";
import Image from "next/image";
import Link from "next/link";

export default function Card({ type, id, wins, matches }) {
  return (
    <Link href={`/${type}s/${id}`} passHref>
      <a className="block px-3 py-3 bg-white rounded text-center shadow cursor-pointer">
        {/*<h3 className="font-header mb-1">{championId}</h3>*/}
        {type === "champion" ? (
          <ChampionIcon id={id} />
        ) : (
          <div className="w-[64px] h-[64px]">
            <Image height={64} width={64} src={`/images/${type}s/${id}.png`} />
          </div>

        )}

        <p
          className={`text-center font-bold text-lg ${winrateClass(
            wins,
            matches
          )}`}
        >
          {winrate(wins, matches)}
        </p>
        <p className="text-center font-bold text-lg">{matches}</p>
      </a>
    </Link>
  );
}
