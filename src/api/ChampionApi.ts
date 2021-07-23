import * as path from "path";
import * as fs from "fs";
import Api from "./DatasetApi";

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
}
