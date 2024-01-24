import ItemGridCell from "../components/items/ItemGridCell";
import ItemApi from "../api/ItemApi";
import { useMemo } from "react";
import ItemStats from "../models/items/ItemStats";
import { NextSeo } from "next-seo";
import {
    GameBoostRectangleSm,
    GameBoostVertical,
} from "../components/ads/GameBoost";

export default function Items({ items }) {
    return (
        <div>
            <NextSeo title="Items" />

            <div className="flex flex-col md:flex-row-reverse gap-4">
                <GameBoostRectangleSm className="flex md:hidden" hd />
                <GameBoostVertical className="hidden md:flex self-start" />
                <div className="flex flex-wrap gap-[6px]">
                    {items.map((i) => (
                        <ItemGridCell {...i} key={i.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export async function getStaticProps(context) {
    const items = ItemApi.getAllItems().map(({ id, description }) => ({
        id,
        description,
    }));

    return {
        props: {
            items,
        },
    };
}

Items.pageName = "Items";
