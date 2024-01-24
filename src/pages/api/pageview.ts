import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../../utils/database";
import PageView from "../../models/api/PageView";
import enableCors from "../../utils/cors";
import crypto from "crypto";

const IP_HASH_SALT = process.env.IP_HASH_SALT;

const md5 = (data) => crypto.createHash("md5").update(data).digest("hex");

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

    const ip = req.headers["x-forwarded-for"] || "localhost";
    const userAgent = req.headers["user-agent"];

    const user = md5(ip + userAgent + IP_HASH_SALT);

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
