export default class ChampionItemStats {
    public itemId: number;
    public wins: number;
    public matches: number;

    constructor(data) {
        Object.assign(this, data);
    }
}
