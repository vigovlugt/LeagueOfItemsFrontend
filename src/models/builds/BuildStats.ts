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

  public static isKeystone(buildStats: any, keyStoneIds: string[]) {
    return (
      buildStats.buildType === "RUNE" &&
      keyStoneIds.includes(buildStats.buildTypeId)
    );
  }

  public static isSmallRune(buildStats: any, keyStoneIds: string[]) {
    return (
      buildStats.buildType === "RUNE" &&
      !keyStoneIds.includes(buildStats.buildTypeId)
    );
  }

  public static isMythic(buildStats: any, mythicIds: string[]) {
    return (
      buildStats.buildType === "ITEM" &&
      mythicIds.includes(buildStats.buildTypeId)
    );
  }

  public static isNonMythic(buildStats: any, mythicIds: string[]) {
    return (
      buildStats.buildType === "ITEM" &&
      !mythicIds.includes(buildStats.buildTypeId)
    );
  }
}
