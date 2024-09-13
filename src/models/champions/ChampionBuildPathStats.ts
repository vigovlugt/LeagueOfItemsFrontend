export default class ChampionBuildPathStats {
    public item1Id: number;
    public item2Id: number;
    public item3Id: number;
    public wins: number;
    public matches: number;
    public previousWins: number;
    public previousMatches: number;

    constructor(data) {
        Object.assign(this, data);
    }
}
