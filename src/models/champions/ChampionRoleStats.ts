import Role from "../roles/Role";

export default class ChampionRoleStats {
  public role: Role;
  public wins: number;
  public matches: number;

  constructor(data) {
    Object.assign(this, data);
  }
}
