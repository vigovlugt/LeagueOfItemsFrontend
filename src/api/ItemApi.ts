import * as path from "path";
import * as fs from "fs";

export default class ItemApi {
  static getDataset() {
    const filePath = path.join(process.cwd(), "./data/dataset.json");

    const json = JSON.parse(fs.readFileSync(filePath).toString());

    return json;
  }

  static async getAllItems() {
    return this.getDataset().items;
  }

  static async getItem(id) {
    return this.getDataset().items.find(i => i.id == id);
  }
}
