import ItemGridCell from "../components/items/ItemGridCell";
import ItemApi from "../api/ItemApi";
import { useMemo } from "react";
import ItemStats from "../models/items/ItemStats";
import RuneIcon from "../components/icons/RuneIcon";
import {NextSeo} from "next-seo";

export default function Index({ items }) {
  const { mythic, legendary } = useMemo(() => {
    items = items.map((i) => new ItemStats(i));

    const mythic = items.filter((i) => i.isMythic());
    const legendary = items.filter((i) => !i.isMythic());

    return { mythic, legendary };
  }, [items]);

  return (
    <div>
      <NextSeo
        title="Items"
      />

      <h2 className="font-header text-4xl mb-2">Mythic</h2>
      <div className="flex flex-wrap">
        {mythic.map((i) => (
          <ItemGridCell {...i} key={i.id} />
        ))}
      </div>

      <h2 className="font-header text-4xl mt-8 mb-2">Legendary</h2>
      <div className="flex flex-wrap">
        {legendary.map((i) => (
          <ItemGridCell {...i} key={i.id} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const items = await ItemApi.getAllItems();

  return {
    props: {
      items,
    },
  };
}

Index.pageName = "Items";
