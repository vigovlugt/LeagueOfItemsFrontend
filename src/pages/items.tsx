import ItemGridCell from "../components/items/ItemGridCell";
import ItemApi from "../api/ItemApi";
import { NextSeo } from "next-seo";

export default function Items({ items }) {
    return (
        <div>
            <NextSeo title="Items" />

            <div className="flex flex-wrap gap-[6px]">
                {items.map((i) => (
                    <ItemGridCell {...i} key={i.id} />
                ))}
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
