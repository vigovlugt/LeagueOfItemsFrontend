const filterFunction = (query, x) => {
    const name = x.name.toLowerCase().replaceAll("'", "");
    const searchQuery = query.toLowerCase().replaceAll("'", "");

    const firstLetters = name
        .split(" ")
        .map((str) => str.substr(0, 1))
        .join("");

    return name.includes(searchQuery) || firstLetters.includes(searchQuery);
};

export default function getSearchResults(query, dataset) {
    const itemResults = query
        ? dataset.items
              .filter((i) => filterFunction(query, i))
              .map((i) => ({ id: i.id, name: i.name, type: "item" }))
        : [];

    const runeResults = query
        ? dataset.runes
              .filter((r) => filterFunction(query, r))
              .map((r) => ({ id: r.id, name: r.name, type: "rune" }))
        : [];

    const championResults = query
        ? dataset.champions
              .filter((c) => filterFunction(query, c))
              .map((r) => ({ id: r.id, name: r.name, type: "champion" }))
        : [];

    return [...itemResults, ...runeResults, ...championResults];
}
