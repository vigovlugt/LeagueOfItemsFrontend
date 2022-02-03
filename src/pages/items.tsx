import ItemGridCell from "../components/items/ItemGridCell";
import ItemApi from "../api/ItemApi";
import { useMemo } from "react";
import ItemStats from "../models/items/ItemStats";
import { NextSeo } from "next-seo";

export default function Items({ items }) {
  const { mythic, legendary } = useMemo(() => {
    const mythic = items.filter((i) => ItemStats.isMythic(i));
    const legendary = items.filter((i) => !ItemStats.isMythic(i));

    return { mythic, legendary };
  }, [items]);

  return (
    <div>
      <NextSeo title="Items" />

      <h2 className="mb-2 font-header text-4xl">Mythic</h2>
      <div className="flex flex-wrap">
        {mythic.map((i) => (
          <ItemGridCell {...i} key={i.id} className="mr-[6px] mb-[6px]" />
        ))}
      </div>

      <h2 className="mt-8 mb-2 font-header text-4xl">Legendary</h2>
      <div className="flex flex-wrap">
        {legendary.map((i) => (
          <ItemGridCell {...i} key={i.id} className="mr-[6px] mb-[6px]" />
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
