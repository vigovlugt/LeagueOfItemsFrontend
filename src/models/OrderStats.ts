import ChampionStats from "./ChampionStats";

export default class OrderStats {
  public order: number;
  public championStats: ChampionStats[];

  public wins: number;
  public matches: number;

  constructor({ order, wins, matches, championStats }) {
    this.order = order;
    this.wins = wins;
    this.matches = matches;
    this.championStats = championStats.map((s) => new ChampionStats(s));
  }
}
