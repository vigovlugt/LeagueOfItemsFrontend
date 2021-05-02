const fetch = require("node-fetch");
const fs = require("fs");
const sharp = require("sharp");
const {join} = require("path");

const versionUrl = "https://ddragon.leagueoflegends.com/api/versions.json"
const champions = (version) => `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`;
const wikiaUrl = (file) => `https://leagueoflegends.fandom.com/wikia.php?controller=Lightbox&method=getMediaDetail&fileTitle=${file}&format=json`;
const splashArtsPath = "../../public/images/champions/splashes/";

const getVersion = async () => {
  const res = await fetch(versionUrl);
  const json = await res.json();

  return json[0];
}

const getChampions = async (version) => {
  const res = await fetch(champions(version));
  const json = await res.json();

  return Object.values(json.data);
}

const transformName = (name) => name;

const getWikiaUrl = (name) => {
  if (name === "Amumu") {
    return wikiaUrl(name + "_OriginalCentered.jpg");
  }

  if (name === "Nunu & Willump") {
    return wikiaUrl("Nunu%20OriginalSkin%20HD.jpg");
  }

  if (name === "Morgana" || name === "Kayle") {
    return wikiaUrl("KayleMorgana+OriginalSkin+Unused+HD.jpg")
  }


  return wikiaUrl(name + " OriginalSkin HD.jpg");
}

const getImageUrl = async (name) => {
  const res = await fetch(getWikiaUrl(name));
  const json = await res.json();

  if (!json.exists) return null;

  return json.imageUrl.replace("/scale-to-width-down/1000", "/scale-to-height-down/1080");
}

const getImage = async (url) => {
  const res = await fetch(url);

  return await res.buffer();
}

const cropImage = async (image) => {
  const img = sharp(image);

  try {
    const {width, height} = await img.metadata();

    // return img.toBuffer();
    return img.extract({
      top: 0,
      left: Math.floor(width / 2 - (540 / 2)),
      width: 540,
      height
    }).toBuffer();
  } catch (e) {
    console.log(e);
  }

  return null;
}

const saveBuffer = (id, buffer) => {
  fs.writeFileSync(join(__dirname, splashArtsPath, `${id}.jpg`), buffer);
}

const saveSplashForChampion = async (champion) => {
  const imageUrl = await getImageUrl(transformName(champion.name));
  if (!imageUrl) {
    console.log("Image url not found for", champion.name);
    return;
  }

  const image = await getImage(imageUrl);

  const cropped = await cropImage(image);

  saveBuffer(champion.key, cropped);
}

async function main() {
  const version = await getVersion();
  console.log("Version:", version);

  const champions = await getChampions(version);
  console.log("Downloaded champion info");

  await Promise.all(champions.map(async c => {
    await saveSplashForChampion(c);
  }));

  console.log("Done");
}

main();
