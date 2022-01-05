import * as path from "path";
import * as fs from "fs";
import Api from "./DatasetApi";
import {
  getPlayrateIncrease,
  getPlayrateIncreaseFromPlayRate,
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
            getPlayrateIncrease(
              b,
              dataset.championMatches,
              dataset.previousChampionMatches
            )
          ) -
          Math.abs(
            getPlayrateIncrease(
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

  static getChampionRolesByPlayrateIncrease() {
    const dataset = Api.getDataset();

    const roleStats = dataset.champions
      .map((c) => c.roleStats.map((r) => [c, r]))
      .flat();

    return roleStats
      .sort(
        ([aChampion, aRoleStats], [bChampion, bRoleStats]) =>
          getPlayrateIncrease(
            bRoleStats,
            bChampion.matches,
            bChampion.previousMatches
          ) -
          getPlayrateIncrease(
            aRoleStats,
            aChampion.matches,
            aChampion.previousMatches
          )
      )
      .map(([champ, roleStats]) => ({
        championId: champ.id,
        role: roleStats.role,
        matches: roleStats.matches,
        previousMatches: roleStats.previousMatches,
        totalMatches: champ.matches,
        previousTotalMatches: champ.previousMatches,
      }));
  }

  static getMatchesByChampion() {
    return this.getAllChampions().reduce(
      (agg, c) => ({ ...agg, [c.id]: c.matches }),
      {}
    );
  }
  static getOrderMatchesByChampion() {
    return this.getAllChampions().reduce(
      (agg, c) => ({ ...agg, [c.id]: c.orderStats.map(s => s.matches) }),
      {}
    );
  }
}
