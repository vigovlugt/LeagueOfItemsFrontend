import fetch from "node-fetch";
import fs from "fs";
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const versionUrl = "https://ddragon.leagueoflegends.com/api/versions.json"
const champions = (version) => `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`;

export const getImage = async (url) => {
  const res = await fetch(url);

  return await res.buffer();
}

export const getVersion = async () => {
  const res = await fetch(versionUrl);
  const json = await res.json();

  return json[0];
}

export const getChampions = async (version) => {
  const res = await fetch(champions(version));
  const json = await res.json();

  return Object.values(json.data);
}

export const saveBuffer = (file, buffer) => {
  fs.writeFileSync(path.join(__dirname, file), buffer);
}