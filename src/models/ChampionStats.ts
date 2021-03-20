export default class ChampionStats {
  public championId: number;
  public wins: number;
  public matches: number;

  constructor({ championId, wins, matches }) {
    this.championId = championId;
    this.wins = wins;
    this.matches = matches;
  }
}
