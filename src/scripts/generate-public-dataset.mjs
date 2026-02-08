import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "../..");

const inputPath = path.join(projectRoot, "data", "dataset.json");
const outputDir = path.join(projectRoot, "public", "data");
const outputPath = path.join(outputDir, "dataset-index.json");

const pickNameIds = (list) => list.map(({ id, name }) => ({ id, name }));

try {
    const raw = await fs.readFile(inputPath, "utf8");
    const dataset = JSON.parse(raw);

    const publicDataset = {
        items: pickNameIds(dataset.items ?? []),
        runes: pickNameIds(dataset.runes ?? []),
        champions: pickNameIds(dataset.champions ?? []),
    };

    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(outputPath, JSON.stringify(publicDataset));
} catch (err) {
    console.error("Failed generating public/data/dataset-index.json");
    console.error(err);
    process.exitCode = 1;
}
