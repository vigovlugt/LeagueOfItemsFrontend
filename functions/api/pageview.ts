import crypto from "crypto";
import mongoose from "mongoose";

import PageView from "../../src/models/api/PageView";

const corsHeaders: Record<string, string> = {
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    "Access-Control-Allow-Headers":
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
};

const md5 = (data: string) =>
    crypto.createHash("md5").update(data).digest("hex");

type MongooseCache = {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
};

const getMongooseCache = () => {
    const globalForMongoose = globalThis as unknown as {
        __leagueOfItemsMongoose?: MongooseCache;
    };

    if (!globalForMongoose.__leagueOfItemsMongoose) {
        globalForMongoose.__leagueOfItemsMongoose = {
            conn: null,
            promise: null,
        };
    }

    return globalForMongoose.__leagueOfItemsMongoose;
};

const connectMongo = async (mongoUrl: string) => {
    const cache = getMongooseCache();
    if (cache.conn) return cache.conn;

    if (!cache.promise) {
        cache.promise = mongoose.connect(mongoUrl);
    }

    cache.conn = await cache.promise;
    return cache.conn;
};

const getIp = (request: Request) => {
    const cfIp = request.headers.get("cf-connecting-ip");
    if (cfIp) return cfIp;

    const xff = request.headers.get("x-forwarded-for");
    if (!xff) return "localhost";
    return xff.split(",")[0].trim() || "localhost";
};

export const onRequest = async (context: {
    request: Request;
    env: Record<string, string | undefined>;
}) => {
    const { request, env } = context;

    if (request.method === "OPTIONS") {
        return new Response(null, { status: 200, headers: corsHeaders });
    }

    if (request.method !== "POST") {
        return new Response(null, { status: 405, headers: corsHeaders });
    }

    const mongoUrl = env.MONGODB_URL;
    const ipHashSalt = env.IP_HASH_SALT;
    if (!mongoUrl || !ipHashSalt) {
        return new Response(null, { status: 500, headers: corsHeaders });
    }

    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return new Response(null, { status: 400, headers: corsHeaders });
    }

    const { type, id } = (body ?? {}) as {
        type?: string;
        id?: unknown;
    };

    if (!type || !["CHAMPION", "ITEM", "RUNE"].includes(type) || id == null) {
        return new Response(null, { status: 400, headers: corsHeaders });
    }

    const numericId = typeof id === "number" ? id : Number(id);
    if (!Number.isFinite(numericId)) {
        return new Response(null, { status: 400, headers: corsHeaders });
    }

    await connectMongo(mongoUrl);

    const ip = getIp(request);
    const userAgent = request.headers.get("user-agent") ?? "";
    const user = md5(ip + userAgent + ipHashSalt);

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60_000);

    const existingPageView = await PageView.findOne({
        type,
        id: numericId,
        user,
        createdAt: { $gt: fiveMinutesAgo },
    }).lean();

    if (!existingPageView) {
        await PageView.create({
            type,
            id: numericId,
            user,
        });
    }

    return new Response(null, { status: 200, headers: corsHeaders });
};
