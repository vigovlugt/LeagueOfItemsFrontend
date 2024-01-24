import Api from "./DatasetApi";
import {
    getIncrease,
    getPickrateIncrease,
    getWinrateIncrease,
} from "../utils/stats";
import { IChampionStats } from "../models/champions/ChampionStats";

export default class ChampionApi {
    static getAllChampions() {
        return Api.getDataset().champions;
    }

    static getChampion(id): IChampionStats {
        return Api.getDataset().champions.find((i) => i.id == id);
    }

    static getTotalMatches() {
        return this.getAllChampions()
            .map((c) => c.matches)
            .reduce((a, b) => a + b, 0);
    }

    static getChampionsByWinRateDifference() {
        return Api.getDataset()
            .champions.sort(
                (a, b) =>
                    Math.abs(getWinrateIncrease(b)) -
                    Math.abs(getWinrateIncrease(a))
            )
            .map(({ id, wins, matches, previousWins, previousMatches }) => ({
                id,
                wins,
                matches,
                previousWins,
                previousMatches,
            }));
    }

    static getChampionsByPickrateDifference() {
        const dataset = Api.getDataset();

        return dataset.champions
            .sort(
                (a, b) =>
                    Math.abs(
                        getPickrateIncrease(
                            b,
                            dataset.championMatches,
                            dataset.previousChampionMatches
                        )
                    ) -
                    Math.abs(
                        getPickrateIncrease(
                            a,
                            dataset.championMatches,
                            dataset.previousChampionMatches
                        )
                    )
            )
            .map(({ id, previousMatches, matches }) => ({
                id,
                matches,
                previousMatches,
            }));
    }

    static getChampionRolesByPickrateIncrease() {
        const dataset = Api.getDataset();

        const roleStats = dataset.champions
            .map((c) => c.roleStats.map((r) => [c, r]))
            .flat();

        return roleStats
            .sort(
                ([aChampion, aRoleStats], [bChampion, bRoleStats]) =>
                    getPickrateIncrease(
                        bRoleStats,
                        bChampion.matches,
                        bChampion.previousMatches
                    ) -
                    getPickrateIncrease(
                        aRoleStats,
                        aChampion.matches,
                        aChampion.previousMatches
                    )
            )
            .map(([champ, roleStats]) => ({
                championId: champ.id,
                role: roleStats.role,
                matches: roleStats.matches,
                previousMatches: roleStats.previousMatches,
                totalMatches: champ.matches,
                previousTotalMatches: champ.previousMatches,
            }));
    }

    static getChampionsByBanrateDifference() {
        const dataset = Api.getDataset();

        return (dataset.champions as IChampionStats[])
            .sort(
                (a, b) =>
                    Math.abs(
                        getIncrease(
                            b.bans,
                            b.previousBans,
                            dataset.championMatches,
                            dataset.previousChampionMatches
                        )
                    ) -
                    Math.abs(
                        getIncrease(
                            a.bans,
                            a.previousBans,
                            dataset.championMatches,
                            dataset.previousChampionMatches
                        )
                    )
            )
            .map(({ id, bans, previousBans }) => ({
                id,
                bans,
                previousBans,
            }));
    }

    static getMatchesByChampion() {
        return this.getAllChampions().reduce(
            (agg, c) => ({ ...agg, [c.id]: c.matches }),
            {}
        );
    }

    static getPreviousMatchesByChampion() {
        return this.getAllChampions().reduce(
            (agg, c) => ({ ...agg, [c.id]: c.previousMatches }),
            {}
        );
    }

    static getOrderMatchesByChampion() {
        return this.getAllChampions().reduce(
            (agg, c) => ({
                ...agg,
                [c.id]: c.orderStats.map((s) => s.matches),
            }),
            {}
        );
    }

    static getPreviousOrderMatchesByChampion() {
        return this.getAllChampions().reduce(
            (agg, c) => ({
                ...agg,
                [c.id]: c.orderStats.map((s) => s.previousMatches),
            }),
            {}
        );
    }
}
