import ItemOrderStats from "./ItemOrderStats";
import ItemChampionStats from "./ItemChampionStats";

export default class ItemStats {
  public id: number;
  public name: string;
  public description: string;
  public plaintext: string;
  public wins: number;
  public matches: number;
  public championStats: ItemChampionStats[];
  public orderStats: ItemOrderStats[];

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
    this.championStats = championStats.map((s) => new ItemChampionStats(s));
    this.orderStats = orderStats.map((stats) => new ItemOrderStats(stats));
  }

  isMythic() {
    return this.description.includes("rarityMythic");
  }
}
