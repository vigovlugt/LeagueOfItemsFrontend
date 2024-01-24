import RuneChampionStats from "./RuneChampionStats";

export default class RuneStats {
    public id: number;
    public name: string;
    public tier: number;
    public shortDescription: string;
    public longDescription: string;

    public wins: number;
    public matches: number;
    public previousWins: number;
    public previousMatches: number;

    public championStats: RuneChampionStats[];

    constructor({
        id,
        name,
        tier,
        shortDescription,
        longDescription,
        wins,
        matches,
        previousWins,
        previousMatches,
        championStats,
    }) {
        this.id = id;
        this.name = name;
        this.tier = tier;

        this.shortDescription = shortDescription;
        this.longDescription = longDescription;

        this.wins = wins;
        this.matches = matches;
        this.previousWins = previousWins;
        this.previousMatches = previousMatches;
        this.championStats = championStats.map((s) => new RuneChampionStats(s));
    }

    isKeystone() {
        return RuneStats.isKeystone(this);
    }

    static isKeystone(rune) {
        return rune.tier === 0;
    }
}
