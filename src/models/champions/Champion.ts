export default class Champion {
    public id: number;
    public name: string;
    public title: string;
    public blurb: string;
    public lore: string;
    public riotId: string;

    constructor(data) {
        Object.assign(this, data);
    }
}
