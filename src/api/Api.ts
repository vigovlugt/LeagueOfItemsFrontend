import * as path from "path";
import * as fs from "fs";

export default class Api {
  static getDataset() {
    const filePath = path.join(process.cwd(), "./data/dataset.json");

    const json = JSON.parse(fs.readFileSync(filePath).toString());

    return json;
  }
}
