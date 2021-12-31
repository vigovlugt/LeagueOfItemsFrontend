import Champion from "./Champion";
import ChampionRuneStats from "./ChampionRuneStats";
import ChampionItemStats from "./ChampionItemStats";
import ChampionRoleStats from "./ChampionRoleStats";
import ChampionBuildPathStats from "./ChampionBuildPathStats";

export default class ChampionStats extends Champion {
  public wins: number;
  public matches: number;

  public previousWins: number;
  public previousMatches: number;

  public runeStats: ChampionRuneStats[];
  public itemStats: ChampionItemStats[];
  public roleStats: ChampionRoleStats[];
  public buildPathStats: ChampionBuildPathStats[];

  constructor(data) {
    super(data);

    this.wins = data.wins;
    this.matches = data.matches;
    this.previousWins = data.previousWins;
    this.previousMatches = data.previousMatches;

    this.runeStats = data.runeStats.map((s) => new ChampionRuneStats(s));
    this.itemStats = data.itemStats.map((s) => new ChampionItemStats(s));
    this.roleStats = data.roleStats.map((s) => new ChampionRoleStats(s));
    this.buildPathStats = data.buildPathStats.map((s) => new ChampionBuildPathStats(s));
  }
}
