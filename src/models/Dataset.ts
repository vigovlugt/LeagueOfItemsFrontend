import ItemStats from "./items/ItemStats";
import RuneStats from "./runes/RuneStats";
import BuildStats from "./builds/BuildStats";

export default class Dataset {
  public items: ItemStats[];
  public runes: RuneStats[];
  public date: string;
  public version: string;
  public builds: BuildStats[];

  constructor({
                items,
                runes,
                date,
                version,
                builds
              }) {
    this.items = items.map(i => new ItemStats(i));
    this.runes = runes.map(r => new RuneStats(r));
    this.builds = builds.map(b => new BuildStats(b))
    this.date = date;
    this.version = version;
  }
}