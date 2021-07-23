import Api from "./DatasetApi";
import { getPlayrateIncrease, getWinrateIncrease } from "../utils/builds";

export default class BuildsApi {
  static getAllBuilds() {
    return Api.getDataset().builds;
  }

  static getByWinrate() {
    return Api.getDataset().builds.sort(
      (a, b) => getWinrateIncrease(b) - getWinrateIncrease(a)
    );
  }

  static getByPlayrate() {
    return Api.getDataset().builds.sort(
      (a, b) => getPlayrateIncrease(b) - getPlayrateIncrease(a)
    );
  }
}
