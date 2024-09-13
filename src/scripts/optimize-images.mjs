import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basePath = path.join(__dirname, "../../public/images/");

import config from "./optimize.config.mjs";

const runForSet = async (set) => {
    const setPath = path.join(basePath, set.path);
    const images = fs
        .readdirSync(setPath, { withFileTypes: true })
        .filter((d) => d.isFile())
        .map((d) => d.name);

    for (const section of set.results) {
        const { size, quality } = section;

        for (const fileName of images) {
            const scaledImage = await getScaledImage(
                path.join(setPath, fileName),
                size,
                quality
            );

            saveBuffer(scaledImage, set.path, fileName, size);
        }
    }
};

const getScaledImage = async (path, size, quality) => {
    return await sharp(path)
        .resize({ width: size })
        .webp({ quality })
        .toBuffer();
};

const saveBuffer = (buffer, sectionPath, fileName, size) => {
    const dirPath = path.join(basePath, sectionPath, size.toString());

    fs.mkdirSync(dirPath, { recursive: true });

    const fullPath = path.join(dirPath, replaceExt(fileName, "webp"));

    fs.writeFileSync(fullPath, buffer);
};

const replaceExt = (fileName, ext) => {
    return fileName.substr(0, fileName.lastIndexOf(".")) + "." + ext;
};

async function main() {
    for (const set of config) {
        console.log(`Running for set: ${set.path}`);
        await runForSet(set);
    }
}

main();
