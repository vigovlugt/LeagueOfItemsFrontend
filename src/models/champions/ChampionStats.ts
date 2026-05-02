import Champion from "./Champion";
import ChampionRuneStats from "./ChampionRuneStats";
import ChampionItemStats from "./ChampionItemStats";
import ChampionRoleStats from "./ChampionRoleStats";
import ChampionBuildPathStats from "./ChampionBuildPathStats";
import ChampionOrderStats from "./ChampionOrderStats";

export interface IChampionStats {
    id: number;

    wins: number;
    bans: number;
    matches: number;

    previousWins: number;
    previousBans: number;
    previousMatches: number;

    runeStats: ChampionRuneStats[];
    itemStats: ChampionItemStats[];
    bootsStats: ChampionItemStats[];
    roleStats: ChampionRoleStats[];
    buildPathStats: ChampionBuildPathStats[];
    orderStats: ChampionOrderStats[];
}

export default class ChampionStats extends Champion implements IChampionStats {
    public wins: number;
    public bans: number;
    public matches: number;

    public previousWins: number;
    public previousBans: number;
    public previousMatches: number;

    public runeStats: ChampionRuneStats[];
    public itemStats: ChampionItemStats[];
    public bootsStats: ChampionItemStats[];
    public roleStats: ChampionRoleStats[];
    public buildPathStats: ChampionBuildPathStats[];
    public orderStats: ChampionOrderStats[];

    constructor(data) {
        super(data);

        this.wins = data.wins;
        this.matches = data.matches;
        this.previousWins = data.previousWins;
        this.previousMatches = data.previousMatches;

        this.runeStats = data.runeStats.map((s) => new ChampionRuneStats(s));
        this.itemStats = data.itemStats.map((s) => new ChampionItemStats(s));
        this.bootsStats = data.bootsStats.map((s) => new ChampionItemStats(s));
        this.roleStats = data.roleStats.map((s) => new ChampionRoleStats(s));
        this.buildPathStats = data.buildPathStats.map(
            (s) => new ChampionBuildPathStats(s)
        );
        this.orderStats = data.orderStats.map((s) => new ChampionOrderStats(s));
    }

    get itemAndBootsStats() {
        return [...this.itemStats, ...this.bootsStats];
    }

    get itemOrderStatsWithBoots() {
        const bootsOrderStats = this.bootsStats.reduce(
            (agg, stats) => ({
                ...agg,
                wins: agg.wins + stats.wins,
                matches: agg.matches + stats.matches,
                previousWins: agg.previousWins + stats.previousWins,
                previousMatches: agg.previousMatches + stats.previousMatches,
            }),
            {
                order: this.orderStats.length,
                title: "Boots",
                wins: 0,
                matches: 0,
                previousWins: 0,
                previousMatches: 0,
                itemStats: this.bootsStats,
            }
        );

        return [...this.orderStats, new ChampionOrderStats(bootsOrderStats)];
    }
}
