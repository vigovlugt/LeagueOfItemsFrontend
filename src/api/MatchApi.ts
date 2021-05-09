import ChampionApi from "./ChampionApi";
import { CHAMPIONS_PER_MATCH } from "../constants/constants";

export default class MatchApi {
  static getTotalMatches() {
    return (
      ChampionApi.getAllChampions()
        .map((c) => c.matches)
        .reduce((a, b) => a + b, 0) / CHAMPIONS_PER_MATCH
    );
  }
}
