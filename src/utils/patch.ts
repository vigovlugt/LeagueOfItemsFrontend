export function getPatchNotesUrl(patch: string) {
    const [major, minor] = patch.split(".").map(Number);

    const season = major + 10;

    return `https://www.leagueoflegends.com/en-us/news/game-updates/league-of-legends-patch-${season}-${minor}-notes/`;
}
