export default class ChampionRuneStats {
  public runeId: number;
  public wins: number;
  public matches: number;

  constructor(data) {
    Object.assign(this, data);
  }
}
