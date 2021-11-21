import Api from "./DatasetApi";
import { getPlayrateIncrease, getWinrateIncrease } from "../utils/stats";

export default class ItemApi {
  static getAllItems() {
    return Api.getDataset().items;
  }

  static getItem(id) {
    return Api.getDataset().items.find((i) => i.id == id);
  }

  static getTotalMatches() {
    return this.getAllItems()
      .map((c) => c.matches)
      .reduce((a, b) => a + b, 0);
  }

  static getPreviousTotalMatches() {
    return this.getAllItems()
      .map((c) => c.previousMatches)
      .reduce((a, b) => a + b, 0);
  }

  static getByWinRateDifference() {
    return this.getAllItems()
      .filter((i) => i.matches && i.previousMatches)
      .sort(
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

  static getByPlayRateDifference() {
    const matches = this.getTotalMatches();
    const previousMatches = this.getPreviousTotalMatches();

    return this.getAllItems()
      .filter((i) => i.matches && i.previousMatches)
      .sort(
        (a, b) =>
          Math.abs(getPlayrateIncrease(b, matches, previousMatches)) -
          Math.abs(getPlayrateIncrease(a, matches, previousMatches))
      )
      .map(({ id, previousMatches, matches }) => ({
        id,
        matches,
        previousMatches,
      }));
  }
}
