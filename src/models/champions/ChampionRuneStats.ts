export default class ChampionRuneStats {
    public runeId: number;
    public wins: number;
    public matches: number;
    public previousWins: number;
    public previousMatches: number;

    constructor(data) {
        Object.assign(this, data);
    }
}
