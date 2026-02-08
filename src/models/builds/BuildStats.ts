import ChampionRuneStats from "../champions/ChampionRuneStats";
import ChampionBuildPathStats from "../champions/ChampionBuildPathStats";
import Champion from "../champions/Champion";
import ChampionStats, { IChampionStats } from "../champions/ChampionStats";

export interface IBuildStats {
    buildType: string;

    championId: number;
    runeId?: number;
    item1Id?: number;
    item2Id?: number;
    item3Id?: number;

    wins: number;
    matches: number;
    totalMatches: number;

    previousWins: number;
    previousMatches: number;
    previousTotalMatches: number;
}

export default class BuildStats implements IBuildStats {
    public buildType: string;

    public championId: number;
    public runeId?: number;
    public item1Id?: number;
    public item2Id?: number;
    public item3Id?: number;

    public wins: number;
    public matches: number;
    public totalMatches: number;

    public previousWins: number;
    public previousMatches: number;
    public previousTotalMatches: number;

    constructor(data) {
        Object.assign(this, data);
    }

    public static fromChampionRuneStats(
        champion: IChampionStats,
        championRuneStats: ChampionRuneStats
    ) {
        return new BuildStats({
            buildType: "RUNE",
            championId: champion.id,
            totalMatches: champion.matches,
            previousTotalMatches: champion.previousMatches,
            ...championRuneStats,
        });
    }

    public toJSON() {
        const json: any = { ...this };

        for (const key of Object.keys(json)) {
            if (json[key] === undefined) {
                delete json[key];
            }
        }

        return json;
    }

    public static fromChampionBuildPathStats(
        champion: IChampionStats,
        championBuildPathStats: ChampionBuildPathStats
    ) {
        return new BuildStats({
            buildType: "BUILD_PATH",
            championId: champion.id,
            totalMatches: champion.buildPathStats.reduce(
                (sum, s) => sum + s.matches,
                0
            ),
            previousTotalMatches: champion.buildPathStats.reduce(
                (sum, s) => sum + s.previousMatches,
                0
            ),
            ...championBuildPathStats,
        });
    }

    public static isKeystone(buildStats: any, keyStoneIds: string[]) {
        return (
            buildStats.buildType === "RUNE" &&
            keyStoneIds.includes(buildStats.runeId)
        );
    }

    public static isSmallRune(buildStats: any, keyStoneIds: string[]) {
        return (
            buildStats.buildType === "RUNE" &&
            !keyStoneIds.includes(buildStats.runeId)
        );
    }
}
