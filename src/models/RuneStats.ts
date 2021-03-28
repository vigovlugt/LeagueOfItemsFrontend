import ChampionStats from "./ChampionStats";

export default class RuneStats {
  public id: number;
  public name: string;
  public tier: number;
  public shortDescription: string;
  public longDescription: string;

  public wins: number;
  public matches: number;
  public championStats: ChampionStats[];
  public orderStats: ChampionStats[][];

  constructor({
    id,
    name,
    tier,
    shortDescription,
    longDescription,
    wins,
    matches,
    championStats,
  }) {
    this.id = id;
    this.name = name;
    this.tier = tier;

    this.shortDescription = shortDescription;
    this.longDescription = longDescription;

    this.wins = wins;
    this.matches = matches;
    this.championStats = (championStats || []).map((s) => new ChampionStats(s));
  }

  isKeystone() {
    return this.tier === 0;
  }
}
