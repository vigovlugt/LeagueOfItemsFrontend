import * as path from "path";
import * as fs from "fs";
import Api from "./DatasetApi";
import {
  getChampionPlayrateIncrease,
  getPlayrateIncrease,
  getWinrateIncrease,
} from "../utils/stats";

export default class ChampionApi {
  static getAllChampions() {
    return Api.getDataset().champions;
  }

  static getChampion(id) {
    return Api.getDataset().champions.find((i) => i.id == id);
  }

  static getTotalMatches() {
    return this.getAllChampions()
      .map((c) => c.matches)
      .reduce((a, b) => a + b, 0);
  }

  static getChampionsByWinRateDifference() {
    return Api.getDataset()
      .champions.sort(
        (a, b) =>
          Math.abs(getWinrateIncrease(b)) - Math.abs(getWinrateIncrease(a))
      )
      .map(({ id, wins, matches, previousWins, previousMatches }) => ({
        id,
        wins,
        matches,
        previousWins,
        previousMatches,
      }));
  }

  static getChampionsByPlayRateDifference() {
    const dataset = Api.getDataset();

    return dataset.champions
      .sort(
        (a, b) =>
          Math.abs(
            getChampionPlayrateIncrease(
              b,
              dataset.championMatches,
              dataset.previousChampionMatches
            )
          ) -
          Math.abs(
            getChampionPlayrateIncrease(
              a,
              dataset.championMatches,
              dataset.previousChampionMatches
            )
          )
      )
      .map(({ id, previousMatches, matches }) => ({
        id,
        matches,
        previousMatches,
      }));
  }
}
