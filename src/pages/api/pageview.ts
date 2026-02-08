import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../utils/database";
import PageView from "../../models/api/PageView";
import enableCors from "../../utils/cors";
const IP_HASH_SALT = process.env.IP_HASH_SALT;

const toHex = (buf: ArrayBuffer) =>
    Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

const sha256Hex = async (data: string) => {
    const bytes = new TextEncoder().encode(data);
    const digest = await globalThis.crypto.subtle.digest("SHA-256", bytes);
    return toHex(digest);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (enableCors(req, res)) {
        return;
    }

    if (req.method !== "POST") {
        return res.status(405).send(null);
    }

    await connect();

    const { type, id } = req.body;
    if (!["CHAMPION", "ITEM", "RUNE"].includes(type) || id == undefined) {
        return res.status(400).send(null);
    }

    const ipHeader = req.headers["x-forwarded-for"];
    const ip = Array.isArray(ipHeader) ? ipHeader[0] : ipHeader || "localhost";
    const userAgent = req.headers["user-agent"] ?? "";

    const user = await sha256Hex(ip + userAgent + IP_HASH_SALT);

    const fiveMinutesAgo = new Date(new Date().getTime() - 5 * 60000);

    const existingPageView = await PageView.findOne({
        type,
        id,
        user,
        createdAt: { $gt: fiveMinutesAgo },
    });

    if (!existingPageView)
        await PageView.create({
            type,
            id,
            user,
        });

    return res.status(200).send(null);
};
