import ChampionStats from "./ChampionStats";

export default class ItemStats {
  public id: number;
  public name: string;
  public description: string;
  public plaintext: string;
  public wins: number;
  public matches: number;
  public championStats: ChampionStats;

  constructor({ id, name, description, plaintext, wins, matches, championStats }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.plaintext = plaintext;
    this.wins = wins;
    this.matches = matches;
    this.championStats = championStats;
  }

  isMythic() {
    return this.description.includes("rarityMythic");
  }
}
