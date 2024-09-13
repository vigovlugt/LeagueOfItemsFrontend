import Role from "../roles/Role";

export interface IChampionRoleStats {
    role: Role;
    wins: number;
    matches: number;
    previousWins: number;
    previousMatches: number;
}

export default class ChampionRoleStats {
    public role: Role;
    public wins: number;
    public matches: number;
    public previousWins: number;
    public previousMatches: number;

    constructor(data) {
        Object.assign(this, data);
    }
}
