import Image from "next/image";
import {winrate, winrateClass} from "../../utils/format";

export default function RoleCard({ role, wins, matches }) {
  return (
    <div className="block px-3 py-3 rounded text-center shadow bg-white dark:bg-dark">
      <Image height={46} width={46} src={`/images/roles/${role}.png`} className="role-image" />
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
