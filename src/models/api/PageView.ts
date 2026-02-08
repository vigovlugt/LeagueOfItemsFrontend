import mongoose, { type Model, Schema } from "mongoose";

export type PageViewType = "CHAMPION" | "ITEM" | "RUNE";

export type PageViewDoc = {
    type: PageViewType;
    id: number;
    user: string;
    createdAt?: Date;
    updatedAt?: Date;
};

const PageViewSchema = new Schema(
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

const PageViewModel =
    (mongoose.models.PageView as Model<PageViewDoc> | undefined) ||
    mongoose.model<PageViewDoc>("PageView", PageViewSchema);

export default PageViewModel;
