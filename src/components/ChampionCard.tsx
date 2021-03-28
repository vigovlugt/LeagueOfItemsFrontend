import ChampionIcon from "./ChampionIcon";
import {winrate, winrateClass} from "../utils/format";

export default function ChampionCard({ championId, wins, matches }) {
  return (
    <div
      className="px-3 py-3 bg-white rounded text-center shadow"
      key={championId}
    >
      {/*<h3 className="font-header mb-1">{championId}</h3>*/}
      <ChampionIcon id={championId} />
      <p
        className={`text-center font-bold text-lg ${winrateClass(
          wins,
          matches
        )}`}
      >
        {winrate(wins, matches)}
      </p>
      <p className="text-center font-bold text-lg">{matches}</p>
    </div>
  );
}