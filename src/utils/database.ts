import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { connection: null, promise: null };
}

export default async function connect() {
    if (cached.connection) {
        return cached.connection;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URL);
    }

    cached.conn = await cached.promise;

    return cached.conn;
}
