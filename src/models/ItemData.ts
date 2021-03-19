export default class ItemData {
  championId: number;
  region: number;
  rank: number;
  role: number;
  order: number;
  wins: number;
  matches: number;

  constructor({ championId, region, rank, role, order, wins, matches }) {
    this.championId = championId;
    this.region = region;
    this.rank = rank;
    this.role = role;
    this.order = order;
    this.wins = wins;
    this.matches = matches;
  }
}
