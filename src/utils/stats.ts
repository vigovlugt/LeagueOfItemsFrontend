export const getPlayrateIncreaseFromPlayRate = (build) =>
  build.playRate / build.previousPlayRate;

export const getWinrateIncrease = (s) =>
  (s.wins / s.matches) - (s.previousWins / s.previousMatches);

export const getPlayrateIncrease = (
  c,
  totalMatches,
  previousTotalMatches
) => (c.matches / totalMatches) / (c.previousMatches / previousTotalMatches) - 1;