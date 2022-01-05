import Api from "./DatasetApi";
import {
  getPickrateIncrease,
  getPickrateIncreaseFromPlayRate,
  getWinrateIncrease,
} from "../utils/stats";
import BuildStats from "../models/builds/BuildStats";

export default class BuildsApi {
  static getAllBuilds() {
    return Api.getDataset()
      .champions.map((c) => {
        return [
          ...c.runeStats.map((s) =>
            BuildStats.fromChampionRuneStats(c, s).toJSON()
          ),
          ...c.buildPathStats.map((s) =>
            BuildStats.fromChampionBuildPathStats(c, s).toJSON()
          ),
        ];
      })
      .flat();
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
