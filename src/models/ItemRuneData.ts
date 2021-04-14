import ItemStats from "./ItemStats";
import RuneStats from "./RuneStats";

export default class ItemRuneDataset {
  public items: ItemStats[];
  public runes: RuneStats[];
  public date: string;

  constructor({
                items,
                runes,
                date
              }) {
    this.items = items.map(i => new ItemStats(i));
    this.runes = runes.map(r => new RuneStats(r));
    this.date = date;
  }
}