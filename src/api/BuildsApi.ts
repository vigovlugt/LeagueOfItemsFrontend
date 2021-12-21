import Api from "./DatasetApi";
import {
  getPlayrateIncreaseFromPlayRate,
  getWinrateIncrease,
} from "../utils/stats";

export default class BuildsApi {
  static getAllBuilds() {
    return Api.getDataset().builds;
  }

  static getByWinrate() {
    return this.getAllBuilds().sort(
      (a, b) => getWinrateIncrease(b) - getWinrateIncrease(a)
    );
  }

  static getByPlayrate() {
    return this.getAllBuilds().sort(
      (a, b) =>
        getPlayrateIncreaseFromPlayRate(b) - getPlayrateIncreaseFromPlayRate(a)
    );
  }
}
