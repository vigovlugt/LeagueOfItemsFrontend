import { CHAMPIONS_PER_MATCH } from "../constants/constants";
import Api from "./DatasetApi";

export default class MatchApi {
    static getChampionMatches() {
        return Api.getDataset().championMatches;
    }

    static getPreviousChampionMatches() {
        return Api.getDataset().previousChampionMatches;
    }

    static getTotalMatches() {
        return Math.round(this.getChampionMatches() / CHAMPIONS_PER_MATCH);
    }

    static getPreviousTotalMatches() {
        return Math.round(
            this.getPreviousChampionMatches() / CHAMPIONS_PER_MATCH
        );
    }
}
