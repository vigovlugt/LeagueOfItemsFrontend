import * as path from "path";
import * as fs from "fs";
import Api from "./Api";

export default class ChampionApi extends Api {
  static async getAllChampions() {
    return this.getDataset().champions;
  }

  static async getChampion(id) {
    return this.getDataset().champions.find(i => i.id == id);
  }
}
