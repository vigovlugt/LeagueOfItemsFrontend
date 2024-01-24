import { getImage, getRunes, getVersion, saveBuffer } from "./utils.mjs";
import fetch from "node-fetch";

const wikiaUrl = (file) =>
    `https://leagueoflegends.fandom.com/wikia.php?controller=Lightbox&method=getMediaDetail&fileTitle=${file}&format=json`;

const getImageUrl = async (name) => {
    const res = await fetch(wikiaUrl(name));
    const json = await res.json();

    if (!json.exists) return null;

    return json.rawImageUrl;
};

const transformName = (name) => {
    return name.replace(":", "-");
};

const saveRuneImage = async (r) => {
    const imageUrl = await getImageUrl(transformName(r.name) + " rune.png");
    if (!imageUrl) {
        console.log("Image url not found for", r.name);
        return;
    }

    const image = await getImage(imageUrl);

    saveBuffer(`../../public/images/runes/${r.id}.png`, image);
};

async function main() {
    const version = await getVersion();
    console.log("Version:", version);

    const runes = await getRunes(version);
    console.log("Downloaded rune info");

    await Promise.all(runes.map(saveRuneImage));
    console.log("Done");
}

main();
