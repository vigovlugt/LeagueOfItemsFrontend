import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const versionUrl = "https://ddragon.leagueoflegends.com/api/versions.json";
const champions = (version) =>
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`;
const runes = (version) =>
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/runesReforged.json`;
const items = (version) =>
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/item.json`;

export const getImage = async (url) => {
    const res = await fetch(url);

    return await res.arrayBuffer();
};

export const getVersion = async () => {
    const res = await fetch(versionUrl);
    const json = await res.json();

    return json[0];
};

export const getChampions = async (version) => {
    const res = await fetch(champions(version));
    const json = await res.json();

    return Object.values(json.data);
};

export const getItems = async (version) => {
    const res = await fetch(items(version));
    const json = await res.json();

    return Object.keys(json.data).map((key) => ({
        ...json.data[key],
        id: key,
    }));
};

export const getRunes = async (version) => {
    const res = await fetch(runes(version));
    const json = await res.json();

    return Object.values(
        json
            .map((x) => x.slots.map((x) => x.runes))
            .flat()
            .flat()
    );
};

export const saveBuffer = (file, buffer) => {
    fs.writeFileSync(path.join(__dirname, file), Buffer.from(buffer));
};
