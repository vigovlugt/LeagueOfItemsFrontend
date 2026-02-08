type AnalyticsEngineDatasetLike = {
    writeDataPoint: (dataPoint: {
        blobs?: string[];
        doubles?: number[];
        indexes?: string[];
    }) => void;
};

const corsHeaders: Record<string, string> = {
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    "Access-Control-Allow-Headers":
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
};

const toHex = (buf: ArrayBuffer) =>
    Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

const sha256Hex = async (data: string) => {
    const bytes = new TextEncoder().encode(data);
    const digest = await globalThis.crypto.subtle.digest("SHA-256", bytes);
    return toHex(digest);
};

type Env = {
    IP_HASH_SALT?: string;
    PAGEVIEWS?: AnalyticsEngineDatasetLike;
};

const getIp = (request: Request) => {
    const cfIp = request.headers.get("cf-connecting-ip");
    if (cfIp) return cfIp;

    const xff = request.headers.get("x-forwarded-for");
    if (!xff) return "localhost";
    return xff.split(",")[0].trim() || "localhost";
};

export const onRequest = async (context: { request: Request; env: Env }) => {
    const { request, env } = context;

    if (request.method === "OPTIONS") {
        return new Response(null, { status: 200, headers: corsHeaders });
    }

    if (request.method !== "POST") {
        return new Response(null, { status: 405, headers: corsHeaders });
    }

    const ipHashSalt = env.IP_HASH_SALT;
    const dataset = env.PAGEVIEWS;

    if (!ipHashSalt || !dataset) {
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

    const ip = getIp(request);
    const userAgent = request.headers.get("user-agent") ?? "";
    const user = await sha256Hex(ip + userAgent + ipHashSalt);

    dataset.writeDataPoint({
        blobs: [type, String(numericId)],
        doubles: [1],
        indexes: [user],
    });

    return new Response(null, { status: 200, headers: corsHeaders });
};
