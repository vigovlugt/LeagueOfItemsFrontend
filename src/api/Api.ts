import * as path from "path";
import * as fs from "fs";

class Api {
  private _json: string = null;

  getDataset() {
    if (this._json) {
      return this._json;
    }

    const filePath = path.join(process.cwd(), "./data/dataset.json");

    const json = JSON.parse(fs.readFileSync(filePath).toString());

    this._json = json;

    return json;
  }
}

const api = new Api();
export default api;