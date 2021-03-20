import ItemGridCell from "../components/ItemGridCell";
import ItemApi from "../api/ItemApi";
import { useMemo } from "react";
import ItemStats from "../models/ItemStats";

export default function Index({ items }) {
  const { mythic, legendary } = useMemo(() => {
    items = items.map((i) => new ItemStats(i));

    const mythic = items.filter((i) => i.isMythic());
    const legendary = items.filter((i) => !i.isMythic());

    return { mythic, legendary };
  }, [items]);

  return (
    <div>
      <h2 className="font-header text-4xl mb-2">Mythic</h2>
      <div className="grid grid-cols-12 gap-2">
        {mythic.map((i) => (
          <ItemGridCell {...i} key={i.id} />
        ))}
      </div>

      <h2 className="font-header text-4xl mt-8 mb-2">Legendary</h2>
      <div className="grid grid-cols-12 gap-2">
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
