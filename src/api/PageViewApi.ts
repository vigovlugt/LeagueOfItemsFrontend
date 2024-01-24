import Api from "./DatasetApi";

export default class PageViewApi {
    static getDataset() {
        return Api.getDataset().pageView;
    }
}
