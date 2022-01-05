import { StarIcon } from "@heroicons/react/outline";
import useFavourites from "../../hooks/useFavourites";
import GridCell from "../GridCell";

export default function FavouritesSection() {
  const { favourites, hasFavourites } = useFavourites();

  return (
    <div>
      <h2 className="font-header text-3xl lg:text-4xl mb-2">My favourites</h2>
      {hasFavourites ? (
        <div className="flex w-full overflow-x-auto pb-2 space-x-4">
          {favourites.map((f) => (
            <GridCell key={f.type + "-" + f.id} type={f.type} id={f.id} />
          ))}
        </div>
      ) : (
        <div className="p-4 h-32 flex justify-center items-center bg-white rounded text-lg shadow mt-4 dark:text-gray-50 dark:bg-gray-900 font-header">
          <span>
            Add favourites by pressing the <StarIcon className="w-6 inline" />{" "}
            icon in the menu bar on any item, rune or champion page.
          </span>
        </div>
      )}
    </div>
  );
}
