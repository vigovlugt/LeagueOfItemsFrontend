import Api from "./Api";

export default class ItemApi extends Api {
  static async getAllItems() {
    return this.getDataset().items;
  }

  static async getItem(id) {
    return this.getDataset().items.find(i => i.id == id);
  }
}
