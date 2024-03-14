import ItemGridCell from "../components/items/ItemGridCell";
import ItemApi from "../api/ItemApi";
import { useMemo } from "react";
import ItemStats from "../models/items/ItemStats";
import { NextSeo } from "next-seo";
import {
    AdRectangleSm,
    AdVertical,
    SponsorLayout,
} from "../components/ads/Ads";

export default function Items({ items }) {
    return (
        <div>
            <NextSeo title="Items" />

            <SponsorLayout>
                <div className="flex flex-wrap gap-[6px]">
                    {items.map((i) => (
                        <ItemGridCell {...i} key={i.id} />
                    ))}
                </div>
            </SponsorLayout>
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
