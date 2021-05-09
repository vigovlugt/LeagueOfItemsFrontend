import Api from "./Api";

export default class ItemApi {
  static getAllItems() {
    return Api.getDataset().items;
  }

  static getItem(id) {
    return Api.getDataset().items.find(i => i.id == id);
  }

  static getTotalMatches() {
    return this.getAllItems()
      .map((c) => c.matches)
      .reduce((a, b) => a + b, 0);
  }
}
