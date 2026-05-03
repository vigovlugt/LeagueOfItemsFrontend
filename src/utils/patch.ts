export function getPatchNotesUrl(patch: string) {
    const [major, minor] = patch.split(".").map(Number);

    return `https://www.leagueoflegends.com/en-us/news/game-updates/league-of-legends-patch-${major}-${minor}-notes/`;
}
