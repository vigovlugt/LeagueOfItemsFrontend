export default class RuneChampionStats {
    public championId: number;
    public wins: number;
    public matches: number;

    constructor(data) {
        Object.assign(this, data);
    }
}
