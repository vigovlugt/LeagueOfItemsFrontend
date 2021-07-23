import Api from "./DatasetApi";

export default class RuneApi {
  static getAllRunes() {
    return Api.getDataset().runes;
  }

  static getRune(id) {
    return Api.getDataset().runes.find((r) => r.id == id);
  }

  static getTotalMatches() {
    return this.getAllRunes()
      .map((c) => c.matches)
      .reduce((a, b) => a + b, 0);
  }
}
