import ItemData from "./ItemData";

export default class Item {
  public id: number;
  public name: string;
  public description: string;
  public plaintext: string;
  public wins?: number;
  public matches?: number;
  public itemData: ItemData[];

  private _itemDataByChampion?: { [championId: number]: ItemData[] };

  constructor({ id, name, description, plaintext, wins, matches, itemData }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.plaintext = plaintext;
    this.itemData = itemData && itemData.map((id) => new ItemData(id));

    this.wins =
      wins ?? this.itemData.map((i) => i.wins).reduce((a, b) => a + b);
    this.matches =
      matches ?? this.itemData.map((i) => i.matches).reduce((a, b) => a + b);
  }

  isMythic() {
    return this.description.includes("rarityMythic");
  }

  getWinrate() {
    return parseFloat(((this.wins / this.matches) * 100).toFixed(2));
  }

  getItemDataByChampion(id?: number) {
    if (this._itemDataByChampion) {
      if (id) {
        return this._itemDataByChampion[id];
      }
      return this._itemDataByChampion;
    }

    this._itemDataByChampion = this.itemData.reduce((acc, data) => {
      if (data.championId in acc) {
        acc[data.championId].push(data);
      } else {
        acc[data.championId] = [data];
      }

      return acc;
    }, {});

    if (id) {
      return this._itemDataByChampion[id];
    }
    return this._itemDataByChampion;
  }

  getChampionWinrates() {
    const MIN_MATCHES = 100;

    const itemDataByChampion = this.getItemDataByChampion();

    const data = Object.entries(itemDataByChampion)
      .map(([championId, itemData]) => {
        let wins = 0;
        let matches = 0;

        for (let data of itemData) {
          wins += data.wins;
          matches += data.matches;
        }

        const winRate = wins / matches;

        return { championId: +championId, wins, matches, winRate };
      })
      .sort((a, b) => b.winRate - a.winRate)
      .filter((d) => d.matches > MIN_MATCHES);

    return data;
  }
}
