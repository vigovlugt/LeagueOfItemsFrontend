export default class ItemChampionStats {
    public championId: number;
    public wins: number;
    public matches: number;

    constructor(data) {
        Object.assign(this, data);
    }
}
