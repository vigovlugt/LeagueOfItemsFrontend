import ItemChampionStats from "./ItemChampionStats";

export default class ItemOrderStats {
    public order: number;
    public championStats: ItemChampionStats[];

    public wins: number;
    public matches: number;

    constructor({ order, wins, matches, championStats }) {
        this.order = order;
        this.wins = wins;
        this.matches = matches;
        this.championStats = championStats.map((s) => new ItemChampionStats(s));
    }
}
