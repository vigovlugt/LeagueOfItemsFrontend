import ChampionRuneStats from "../champions/ChampionRuneStats";
import ChampionBuildPathStats from "../champions/ChampionBuildPathStats";
import Champion from "../champions/Champion";
import ChampionStats from "../champions/ChampionStats";

export default class BuildStats {
  public buildType: string;

  public championId: number;
  public runeId?: number;
  public item1Id?: number;
  public item2Id?: number;
  public item3Id?: number;

  public wins: number;
  public matches: number;
  public totalMatches: number;

  public previousWins: number;
  public previousMatches: number;
  public previousTotalMatches: number;

  constructor(data) {
    Object.assign(this, data);
  }

  public static fromChampionRuneStats(
    champion: ChampionStats,
    championRuneStats: ChampionRuneStats
  ) {
    return new BuildStats({
      buildType: "RUNE",
      championId: champion.id,
      totalMatches: champion.matches,
      previousTotalMatches: champion.previousMatches,
      ...championRuneStats,
    });
  }

  public toJSON() {
    return { ...this };
  }

  public static fromChampionBuildPathStats(
    champion: ChampionStats,
    championBuildPathStats: ChampionBuildPathStats
  ) {
    return new BuildStats({
      buildType: "BUILD_PATH",
      championId: champion.id,
      totalMatches: champion.buildPathStats.reduce((sum, s) => sum + s.matches, 0),
      previousTotalMatches: champion.buildPathStats.reduce((sum, s) => sum + s.previousMatches, 0),
      ...championBuildPathStats,
    });
  }

  public static isKeystone(buildStats: any, keyStoneIds: string[]) {
    return (
      buildStats.buildType === "RUNE" && keyStoneIds.includes(buildStats.runeId)
    );
  }

  public static isSmallRune(buildStats: any, keyStoneIds: string[]) {
    return (
      buildStats.buildType === "RUNE" &&
      !keyStoneIds.includes(buildStats.runeId)
    );
  }
}
