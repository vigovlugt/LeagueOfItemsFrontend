import { IBuildStats } from "../builds/BuildStats";
import { IChampionRoleStats } from "../champions/ChampionRoleStats";

export default interface IPatchNotesStats {
    champions: Record<number, IPatchNotesChampionStats>;
    runes: Record<number, IPatchNotesRuneStats>;
    items: Record<number, IPatchNotesItemStats>;
}

export interface IPatchNotesBaseStats {
    matches: number;
    wins: number;
    previousMatches: number;
    previousWins: number;
    buildStats: IBuildStats[];
}

export interface IPatchNotesChampionStats extends IPatchNotesBaseStats {
    roleStats: IChampionRoleStats[];
    bans: number;
    previousBans: number;
}

export interface IPatchNotesItemStats extends IPatchNotesBaseStats {}

export interface IPatchNotesRuneStats extends IPatchNotesBaseStats {}
