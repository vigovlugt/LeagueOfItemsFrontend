export const getPickrateIncreaseFromPlayRate = (build) =>
    build.playRate - build.previousPlayRate;

export const getWinrateIncrease = (s) => {
    if (s.previousMatches == 0 || s.matches == 0) {
        return 0;
    }

    return s.wins / s.matches - s.previousWins / s.previousMatches;
};

export const getPickrateIncrease = (c, totalMatches, previousTotalMatches) => {
    return getIncrease(
        c.matches,
        c.previousMatches,
        totalMatches,
        previousTotalMatches
    );
};

export const getIncrease = (value, previousValue, total, previousTotal) => {
    if (total == 0 || previousTotal == 0) {
        return 0;
    }

    return value / total - previousValue / previousTotal;
};
