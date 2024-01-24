import { getChampions, getImage, getVersion, saveBuffer } from "./utils.mjs";

const saveTileForChampion = async (c) => {
    const id = c.id === "Fiddlesticks" ? "FiddleSticks" : c.id;

    const imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${id}_0.jpg`;

    const image = await getImage(imageUrl);

    saveBuffer(`../../public/images/champions/tiles/${c.key}.jpg`, image);
};

const saveImgForChampion = async (version, c) => {
    const imageUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${c.id}.png`;

    const image = await getImage(imageUrl);

    saveBuffer(`../../public/images/champions/${c.key}.png`, image);
};

async function main() {
    const version = await getVersion();
    console.log("Version:", version);

    const champions = await getChampions(version);
    console.log("Downloaded champion info");

    await Promise.all(champions.map((c) => saveImgForChampion(version, c)));
    await Promise.all(champions.map(saveTileForChampion));
    console.log("Done");
}

main();
