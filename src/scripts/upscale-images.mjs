import waifu2x from "waifu2x";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upscale = async (file) => {
    const img = sharp(file);
    const { width, height } = await img.metadata();

    if (width > 200 && height > 200) {
        return;
    }

    console.log("Upscaling", file.split("/")[file.split("/").length - 1]);
    await waifu2x.default.upscaleImage(file, file, {
        noise: 2,
        scale: 2.0,
    });
};

async function upscaleRunes() {
    const dir = path.join(__dirname, "../../public/images/runes/");
    const files = fs.readdirSync(dir);

    for (const file of files) {
        try {
            await upscale(path.join(dir, file));
        } catch (e) {
            console.error(e);
        }
    }
}

async function upscaleItems() {
    const dir = path.join(__dirname, "../../public/images/items/");
    const files = fs.readdirSync(dir);

    for (const file of files) {
        try {
            await upscale(path.join(dir, file));
        } catch (e) {
            console.error(e);
        }
    }
}

async function main() {
    await upscaleRunes();

    await upscaleItems();
}

main();
