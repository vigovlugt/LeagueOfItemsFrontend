export function getPatchNotesUrl(patch: string) {
    const [major, minor] = patch.split(".").map(Number);

    const season = major + 10;
    const seasonSplit = Math.floor((minor - 1) / 8) + 1;
    const splitPatch = ((minor - 1) % 8) + 1;

    return `https://www.leagueoflegends.com/en-us/news/game-updates/patch-${season}-s${seasonSplit}-${splitPatch}-notes/`;
}
