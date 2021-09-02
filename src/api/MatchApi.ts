import ChampionApi from "./ChampionApi";
import { CHAMPIONS_PER_MATCH } from "../constants/constants";
import Api from "./DatasetApi";

export default class MatchApi {
  static getTotalMatches() {
    return (
      Api.getDataset().championMatches / CHAMPIONS_PER_MATCH
    );
  }
}
