import ChampionStats from "./ChampionStats";
import OrderStats from "./OrderStats";

export default class ItemStats {
  public id: number;
  public name: string;
  public description: string;
  public plaintext: string;
  public wins: number;
  public matches: number;
  public championStats: ChampionStats[];
  public orderStats: ChampionStats[][];

  constructor({
    id,
    name,
    description,
    plaintext,
    wins,
    matches,
    championStats,
    orderStats,
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.plaintext = plaintext;
    this.wins = wins;
    this.matches = matches;
    this.championStats = championStats.map((s) => new ChampionStats(s));
    this.orderStats = orderStats.map((stats) => new OrderStats(stats));
  }

  isMythic() {
    return this.description.includes("rarityMythic");
  }
}
