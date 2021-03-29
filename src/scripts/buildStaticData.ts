import ItemApi from "../api/ItemApi";
import RuneApi from "../api/RuneApi";
import * as fs from "fs";
import * as path from "path";

import fetch from "node-fetch";

global.fetch = fetch;
require("dotenv").config({ path: "./.env.local" });

async function main() {
  storeBuildInfo();
  await Promise.all([storeItemData(), storeRuneData()]);
}

async function storeItemData() {
  const items = await ItemApi.getAllItems();

  const simpleItems = items.map((i) => ({ name: i.name, id: i.id }));

  fs.writeFileSync(
    path.join(__dirname, "../temp/items.json"),
    JSON.stringify(simpleItems)
  );
}

async function storeRuneData() {
  const runes = await RuneApi.getAllRunes();

  const simpleRunes = runes.map((r) => ({ name: r.name, id: r.id }));

  fs.writeFileSync(
    path.join(__dirname, "../temp/runes.json"),
    JSON.stringify(simpleRunes)
  );
}

function storeBuildInfo() {
  const buildDate = new Date().toISOString();

  fs.writeFileSync(
    path.join(__dirname, "../temp/buildInfo.json"),
    JSON.stringify({ buildDate })
  );
}

main();
