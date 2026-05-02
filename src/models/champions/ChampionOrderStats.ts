import ChampionItemStats from "./ChampionItemStats";

export default class ChampionOrderStats {
    public order: number;
    public wins: number;
    public matches: number;
    public previousWins: number;
    public previousMatches: number;
    public itemStats: ChampionItemStats[];
    public title?: string;

    constructor({
        order,
        wins,
        matches,
        previousWins,
        previousMatches,
        itemStats,
        title,
    }) {
        this.order = order;
        this.wins = wins;
        this.matches = matches;
        this.previousWins = previousWins;
        this.previousMatches = previousMatches;
        this.itemStats = itemStats.map((s) => new ChampionItemStats(s));
        this.title = title;
    }
}
