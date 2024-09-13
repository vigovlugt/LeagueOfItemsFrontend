import RoleCard from "../roles/RoleCard";

export default function ChampionRoles({
    roleStats,
    totalMatches,
    previousTotalMatches,
}) {
    return (
        <div className="flex flex-row space-x-3 overflow-x-auto pb-2 lg:pb-0">
            {roleStats.map((stats) => (
                <RoleCard
                    key={stats.role}
                    {...stats}
                    totalMatches={totalMatches}
                    previousTotalMatches={previousTotalMatches}
                />
            ))}
        </div>
    );
}
