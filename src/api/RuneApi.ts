import Api from "./DatasetApi";
import { getPickrateIncrease, getWinrateIncrease } from "../utils/stats";

export default class RuneApi {
    static getAllRunes() {
        return Api.getDataset().runes.filter((r) => r.matches);
    }

    static getRune(id) {
        return Api.getDataset().runes.find((r) => r.id == id);
    }

    static getTotalMatches() {
        return this.getAllRunes()
            .map((c) => c.matches)
            .reduce((a, b) => a + b, 0);
    }

    static getPreviousTotalMatches() {
        return this.getAllRunes()
            .map((c) => c.previousMatches)
            .reduce((a, b) => a + b, 0);
    }

    static getByWinRateDifference() {
        return this.getAllRunes()
            .filter((i) => i.matches && i.previousMatches)
            .sort(
                (a, b) =>
                    Math.abs(getWinrateIncrease(b)) -
                    Math.abs(getWinrateIncrease(a))
            )
            .map(
                ({
                    id,
                    wins,
                    matches,
                    previousWins,
                    previousMatches,
                    tier,
                }) => ({
                    id,
                    wins,
                    matches,
                    previousWins,
                    previousMatches,
                    isKeystone: tier == 0,
                })
            );
    }

    static getByPlayRateDifference() {
        const matches = this.getTotalMatches();
        const previousMatches = this.getPreviousTotalMatches();

        return this.getAllRunes()
            .filter((i) => i.matches && i.previousMatches)
            .sort(
                (a, b) =>
                    Math.abs(getPickrateIncrease(b, matches, previousMatches)) -
                    Math.abs(getPickrateIncrease(a, matches, previousMatches))
            )
            .map(({ id, previousMatches, matches, tier }) => ({
                id,
                matches,
                previousMatches,
                isKeystone: tier === 0,
            }));
    }
}
