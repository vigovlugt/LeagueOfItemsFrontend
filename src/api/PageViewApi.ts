import Api from "./DatasetApi";

class PageViewApi {
  async getDataset() {
    return Api.getDataset().pageView;
  }
}

const api = new PageViewApi();
export default api;
