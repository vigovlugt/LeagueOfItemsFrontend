import SearchBar from "./layout/SearchBar";
import RandomPageButton from "./layout/RandomPageButton";
import ThemeToggle from "./layout/ThemeToggle";
import {
    MenuIcon,
    StarIcon as StarIconOutline,
} from "@heroicons/react/outline";
import useFavourites from "../hooks/useFavourites";
import { StarIcon as StarIconSolid } from "@heroicons/react/solid";

export default function NavBar({
    title,
    onClickMenu,
    favouriteType = null,
    favouriteId = null,
}) {
    const { hasFavourite, addFavourite, removeFavourite } = useFavourites();

    const showFavourite = favouriteId != null && favouriteType != null;
    const isFavourite =
        showFavourite && hasFavourite(favouriteType, favouriteId);

    const onClickFavouriteBtn = () => {
        if (isFavourite) {
            removeFavourite(favouriteType, favouriteId);
        } else {
            addFavourite(favouriteType, favouriteId);
        }
    };

    const FavouriteBtn = isFavourite ? (
        <StarIconSolid
            className="-ml-[.125rem] inline w-7 min-w-[1.75rem] cursor-pointer"
            onClick={onClickFavouriteBtn}
        />
    ) : (
        <StarIconOutline
            className="inline w-6 min-w-[1.5rem] cursor-pointer"
            onClick={onClickFavouriteBtn}
        />
    );

    return (
        <nav className="flex h-[65px] w-full flex-shrink-0 justify-between border-b border-gray-200 bg-white py-3 px-4 dark:border-gray-800 dark:bg-dark lg:px-8">
            <div className="flex w-20 items-center">
                <button
                    className="flex items-center py-3 focus:outline-none lg:hidden"
                    onClick={onClickMenu}
                >
                    <MenuIcon className="mr-4 w-8" />
                </button>
                <h1 className="whitespace-nowrap font-header text-2xl font-medium text-black dark:text-white">
                    {title}&nbsp;
                </h1>
                {showFavourite && FavouriteBtn}
            </div>

            <div className="hidden h-full lg:block">
                <SearchBar />
            </div>

            <div className="w-20">
                <div className="-mx-4 flex h-full justify-end space-x-4 bg-white px-4 dark:bg-dark">
                    <ThemeToggle />
                    <RandomPageButton />
                </div>
            </div>
        </nav>
    );
}
