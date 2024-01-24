import * as path from "path";
import * as fs from "fs";

class DatasetApi {
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

    getPatch() {
        return this.getDataset().version;
    }
}

const api = new DatasetApi();
export default api;
