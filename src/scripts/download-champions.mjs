import { getChampions, getImage, getVersion, saveBuffer } from "./utils.mjs";

const saveTileForChampion = async (version, c) => {
  const id = c.id;

  const imageUrl = `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${id}.png`;
  const image = await getImage(imageUrl);

  saveBuffer(`../../public/images/champions/${c.key}.png`, image);
};

async function main() {
  const version = await getVersion();
  console.log("Version:", version);

  const champions = await getChampions(version);
  console.log("Downloaded champion info");

  await Promise.all(champions.map((c) => saveTileForChampion(version, c)));
  console.log("Done");
}

main();
