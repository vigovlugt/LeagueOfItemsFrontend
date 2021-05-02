import Api from "./Api";

export default class RuneApi extends Api {
  static async getAllRunes() {
    return this.getDataset().runes;
  }

  static async getRune(id) {
    return this.getDataset().runes.find(r => r.id == id);
  }
}
