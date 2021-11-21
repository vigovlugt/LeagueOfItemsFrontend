import ChampionApi from "./ChampionApi";
import { CHAMPIONS_PER_MATCH } from "../constants/constants";
import Api from "./DatasetApi";

export default class MatchApi {
  static getTotalMatches() {
    return Math.round(Api.getDataset().championMatches / CHAMPIONS_PER_MATCH);
  }

  static getChampionMatches() {
    return Api.getDataset().championMatches;
  }

  static getPreviousChampionMatches() {
    return Api.getDataset().previousChampionMatches;
  }
}
