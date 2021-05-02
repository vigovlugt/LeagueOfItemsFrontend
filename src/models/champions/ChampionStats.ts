import Champion from "./Champion";
import ChampionRuneStats from "./ChampionRuneStats";
import ChampionItemStats from "./ChampionItemStats";
import ChampionRoleStats from "./ChampionRoleStats";

export default class ChampionStats extends Champion {
  public wins: number;
  public matches: number;

  public runeStats: ChampionRuneStats[];
  public itemStats: ChampionItemStats[];
  public roleStats: ChampionRoleStats[];

  constructor(data) {
    super(data);

    this.wins = data.wins;
    this.matches = data.matches;

    this.runeStats = data.runeStats.map((s) => new ChampionRuneStats(s));
    this.itemStats = data.itemStats.map((s) => new ChampionItemStats(s));
    this.roleStats = data.roleStats.map((s) => new ChampionRoleStats(s));
  }
}
