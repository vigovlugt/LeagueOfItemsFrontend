import mongoose, { Schema } from "mongoose";

const PageView = new Schema(
    {
        type: {
            type: String,
            required: true,
        },
        id: {
            type: Number,
            required: true,
        },
        user: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);
export default mongoose.models.PageView || mongoose.model("PageView", PageView);
