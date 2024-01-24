import Api from "./DatasetApi";
import IPatchNotesDataset from "../models/patchnotes/IPatchNotesDataset";
import IPatchNotesChange from "../models/patchnotes/IPatchNotesChange";
import IPatchNotesStats, {
    IPatchNotesChampionStats,
    IPatchNotesItemStats,
    IPatchNotesRuneStats,
} from "../models/patchnotes/IPatchNotesStats";
import ChampionApi from "./ChampionApi";
import RuneApi from "./RuneApi";
import ItemApi from "./ItemApi";
import BuildsApi from "./BuildsApi";
import BuildStats, { IBuildStats } from "../models/builds/BuildStats";
import RuneStats from "../models/runes/RuneStats";
import { getPickrateIncrease, getWinrateIncrease } from "../utils/stats";

export default class PatchNotesApi {
    static getPatchNotes(): IPatchNotesDataset {
        return Api.getDataset().patchNotes;
    }

    static getPatchNotesStats(): IPatchNotesStats {
        const { champions, items, runes } = this.getEntitiesFromPatchNotes();
        const allRunes = RuneApi.getAllRunes();
        const keystones = allRunes
            .map((r) => new RuneStats(r))
            .filter((r) => r.isKeystone())
            .map((r) => r.id);

        const buildStats = BuildsApi.getByPickrate();

        return {
            champions: champions.reduce(
                (obj, id) => ({
                    ...obj,
                    [id]: this.getPatchNotesChampionStats(
                        id,
                        keystones,
                        buildStats
                    ),
                }),
                {}
            ),
            runes: runes.reduce(
                (obj, id) => ({
                    ...obj,
                    [id]: this.getPatchNotesRuneStats(id, buildStats),
                }),
                {}
            ),
            items: items.reduce(
                (obj, id) => ({
                    ...obj,
                    [id]: this.getPatchNotesItemStats(id, buildStats),
                }),
                {}
            ),
        };
    }

    static getPatchNotesChampionStats(
        championId: number,
        keystones: string[],
        buildStats: IBuildStats[]
    ): IPatchNotesChampionStats {
        let {
            wins,
            bans,
            matches,
            previousWins,
            previousBans,
            previousMatches,
            roleStats,
        } = ChampionApi.getChampion(championId);

        buildStats = buildStats
            .filter(
                (b) =>
                    b.championId == championId &&
                    !BuildStats.isSmallRune(b, keystones)
            )
            .filter(
                (s) =>
                    getPickrateIncrease(
                        s,
                        s.totalMatches,
                        s.previousTotalMatches
                    ) > 0.05
            )
            .slice(0, 5);

        roleStats = roleStats
            .filter(
                (s) =>
                    Math.abs(getPickrateIncrease(s, matches, previousMatches)) >
                        0.05 || Math.abs(getWinrateIncrease(s)) > 0.05
            )
            .sort((a, b) => b.matches - a.matches);

        return {
            wins,
            bans,
            matches,
            previousWins,
            previousBans,
            previousMatches,
            buildStats,
            roleStats,
        };
    }

    static getPatchNotesRuneStats(
        runeId: number,
        buildStats: IBuildStats[]
    ): IPatchNotesRuneStats {
        const { wins, matches, previousWins, previousMatches } =
            RuneApi.getRune(runeId);

        buildStats = buildStats
            .filter((b) => b.runeId === runeId)
            .filter(
                (s) =>
                    Math.abs(
                        getPickrateIncrease(
                            s,
                            s.totalMatches,
                            s.previousTotalMatches
                        )
                    ) > 0.05
            )
            .sort(
                (a, b) =>
                    Math.abs(
                        getPickrateIncrease(
                            b,
                            b.totalMatches,
                            b.previousTotalMatches
                        )
                    ) -
                    Math.abs(
                        getPickrateIncrease(
                            a,
                            a.totalMatches,
                            a.previousTotalMatches
                        )
                    )
            )
            .slice(0, 5);

        return {
            wins,
            matches,
            previousWins,
            previousMatches,
            buildStats,
        };
    }

    static getPatchNotesItemStats(
        itemId: number,
        buildStats: IBuildStats[]
    ): IPatchNotesItemStats {
        const { wins, matches, previousWins, previousMatches } =
            ItemApi.getItem(itemId);

        buildStats = buildStats
            .filter((b) => [b.item1Id, b.item2Id, b.item3Id].includes(itemId))
            .filter(
                (s) =>
                    Math.abs(
                        getPickrateIncrease(
                            s,
                            s.totalMatches,
                            s.previousTotalMatches
                        )
                    ) > 0.05
            )
            .sort(
                (a, b) =>
                    Math.abs(
                        getPickrateIncrease(
                            b,
                            b.totalMatches,
                            b.previousTotalMatches
                        )
                    ) -
                    Math.abs(
                        getPickrateIncrease(
                            a,
                            a.totalMatches,
                            a.previousTotalMatches
                        )
                    )
            )
            .slice(0, 5);

        return {
            wins,
            matches,
            previousWins,
            previousMatches,
            buildStats,
        };
    }

    static getEntitiesFromPatchNotes() {
        const patchNotes = this.getPatchNotes();

        const entities = patchNotes.groups
            .reduce<IPatchNotesChange[]>((arr, g) => [...arr, ...g.changes], [])
            .reduce(
                (obj, e) => {
                    const key = {
                        CHAMPION: "champions",
                        RUNE: "runes",
                        ITEM: "items",
                    }[e.type];

                    obj[key].push(e.id);

                    return obj;
                },
                { champions: [], items: [], runes: [] }
            );

        return entities;
    }
}
