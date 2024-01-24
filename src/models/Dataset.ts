import ItemStats from "./items/ItemStats";
import RuneStats from "./runes/RuneStats";
import BuildStats from "./builds/BuildStats";

export default class Dataset {
    public items: ItemStats[];
    public runes: RuneStats[];
    public date: string;
    public version: string;

    constructor({ items, runes, date, version }) {
        this.items = items.map((i) => new ItemStats(i));
        this.runes = runes.map((r) => new RuneStats(r));
        this.date = date;
        this.version = version;
    }
}
