import json from "../../data/dataset.json"

class DatasetApi {
    private _json: any = null;

    getDataset() {
        if (this._json) {
            return this._json;
        }

        this._json = json;

        return json;
    }

    getPatch() {
        return this.getDataset().version;
    }
}

const api = new DatasetApi();
export default api;
