export const getPlayrateIncrease = (build) =>
  build.playRate - build.previousPlayRate;

export const getPlayrateIncreasePercentage = (build) =>
  build.playRate / build.previousPlayRate;

export const getWinrateIncrease = (build) =>
  build.wins / build.matches - build.previousWins / build.previousMatches;
