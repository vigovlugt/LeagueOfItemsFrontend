import RoleCard from "../roles/RoleCard";

export default function ChampionRoles({ roleStats }) {
  return (
    <div className="flex flex-row space-x-3 overflow-x-auto">
      {roleStats.map((stats) => (
        <RoleCard key={stats.role} {...stats} />
      ))}
    </div>
  );
}
