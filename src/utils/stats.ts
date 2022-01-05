export const getPickrateIncreaseFromPlayRate = (build) =>
  build.playRate - build.previousPlayRate;

export const getWinrateIncrease = (s) => {
  if (s.previousMatches == 0 || s.matches == 0) {
    return 0;
  }

  return s.wins / s.matches - s.previousWins / s.previousMatches;
};

export const getPickrateIncrease = (c, totalMatches, previousTotalMatches) => {
  if (totalMatches == 0 || previousTotalMatches == 0) {
    return 0;
  }

  return c.matches / totalMatches - c.previousMatches / previousTotalMatches;
};