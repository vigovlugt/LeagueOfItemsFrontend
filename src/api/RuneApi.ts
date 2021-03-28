export default class RuneApi {
  static async getAllRunes() {
    const res = await fetch(process.env.API_URL + "/api/runes");
    const runes = await res.json();

    return runes;
  }

  static async getRune(id) {
    const res = await fetch(`${process.env.API_URL}/api/runes/${id}`);
    const rune = await res.json();

    return rune;
  }
}
