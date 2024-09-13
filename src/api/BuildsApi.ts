import Api from "./DatasetApi";
import {
    getPickrateIncrease,
    getPickrateIncreaseFromPlayRate,
    getWinrateIncrease,
} from "../utils/stats";
import BuildStats, { IBuildStats } from "../models/builds/BuildStats";
import { IChampionStats } from "../models/champions/ChampionStats";

export default class BuildsApi {
    private static _builds;

    static getAllBuilds(): IBuildStats[] {
        if (BuildsApi._builds) {
            return BuildsApi._builds;
        }

        const builds = Api.getDataset()
            .champions.map((c) => {
                return this.getBuildsForChampion(c);
            })
            .flat();

        BuildsApi._builds = builds;
        return builds;
    }

    static getBuildsForChampion(champion: IChampionStats): IBuildStats[] {
        return [
            ...champion.runeStats.map((s) =>
                BuildStats.fromChampionRuneStats(champion, s).toJSON()
            ),
            ...champion.buildPathStats.map((s) =>
                BuildStats.fromChampionBuildPathStats(champion, s).toJSON()
            ),
        ];
    }

    static getByWinrate() {
        return this.getAllBuilds().sort(
            (a, b) => getWinrateIncrease(b) - getWinrateIncrease(a)
        );
    }

    static getByPickrate() {
        return this.getAllBuilds().sort(
            (a, b) =>
                getPickrateIncrease(b, b.totalMatches, b.previousTotalMatches) -
                getPickrateIncrease(a, a.totalMatches, a.previousTotalMatches)
        );
    }
}
