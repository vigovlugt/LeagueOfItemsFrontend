export default class BuildStats {
  public championId: number;
  public buildType: string;
  public buildTypeId: number;
  public order?: number;
  public wins: number;
  public matches: number;
  public playRate: number;
  public previousWins: number;
  public previousMatches: number;
  public previousPlayRate: number;

  constructor(data) {
    Object.assign(this, data);
  }
}
