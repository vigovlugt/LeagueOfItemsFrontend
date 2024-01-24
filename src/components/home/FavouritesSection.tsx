import { StarIcon } from "@heroicons/react/outline";
import useFavourites from "../../hooks/useFavourites";
import GridCell from "../GridCell";

export default function FavouritesSection() {
    const { favourites, hasFavourites } = useFavourites();

    return (
        <div>
            <h2 className="mb-2 font-header text-3xl lg:text-4xl">
                My favourites
            </h2>
            {hasFavourites ? (
                <div className="flex w-full space-x-4 overflow-x-auto pb-2">
                    {favourites.map((f) => (
                        <GridCell
                            key={f.type + "-" + f.id}
                            type={f.type}
                            id={f.id}
                        />
                    ))}
                </div>
            ) : (
                <div className="mt-4 flex h-32 items-center justify-center rounded bg-white p-4 font-header text-lg shadow dark:bg-gray-900 dark:text-gray-50">
                    <span>
                        Add favourites by pressing the{" "}
                        <StarIcon className="inline w-6" /> icon in the menu bar
                        on any item, rune or champion page.
                    </span>
                </div>
            )}
        </div>
    );
}
