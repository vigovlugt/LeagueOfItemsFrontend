import {
    __dirname,
    getImage,
    getItems,
    getVersion,
    saveBuffer,
} from "./utils.mjs";
import fetch from "node-fetch";
import * as fs from "fs";
import path from "path";

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

const saveItemImage = async (i) => {
    if (
        fs.existsSync(
            path.join(__dirname, `../../public/images/items/${i.id}.png`)
        )
    ) {
        return;
    }

    const imageUrl = await getImageUrl(transformName(i.name) + " item_HD.png");
    if (!imageUrl) {
        console.log("Image url not found for", i.name);
        return;
    }

    const image = await getImage(imageUrl.replace());
    saveBuffer(`../../public/images/items/${i.id}.png`, image);
};

async function main() {
    const version = await getVersion();
    console.log("Version:", version);

    const items = await getItems(version);
    console.log("Downloaded item info");

    await Promise.all(items.map(saveItemImage));
    console.log("Done");
}

main();
