import path from "path";
import fs from "fs";

export default class RuneApi {
  static getDataset() {
    const filePath = path.join(process.cwd(), "./data/dataset.json");

    const json = JSON.parse(fs.readFileSync(filePath).toString());

    return json;
  }

  static async getAllRunes() {
    return this.getDataset().runes;
  }

  static async getRune(id) {
    return this.getDataset().runes.find(r => r.id == id);
  }
}
