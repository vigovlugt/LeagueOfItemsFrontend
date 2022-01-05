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
  const isFavourite = showFavourite && hasFavourite(favouriteType, favouriteId);

  const onClickFavouriteBtn = () => {
    if (isFavourite) {
      removeFavourite(favouriteType, favouriteId);
    } else {
      addFavourite(favouriteType, favouriteId);
    }
  };

  const FavouriteBtn = isFavourite ? (
    <StarIconSolid
      className="w-7 -ml-[.125rem] min-w-[1.75rem] cursor-pointer inline"
      onClick={onClickFavouriteBtn}
    />
  ) : (
    <StarIconOutline
      className="w-6 min-w-[1.5rem] cursor-pointer inline"
      onClick={onClickFavouriteBtn}
    />
  );

  return (
    <nav className="w-full py-3 px-4 lg:px-8 border-b flex justify-between h-[65px] flex-shrink-0 bg-white border-gray-200 dark:bg-dark dark:border-gray-800">
      <div className="w-20 flex items-center">
        <button
          className="flex items-center py-3 focus:outline-none lg:hidden"
          onClick={onClickMenu}
        >
          <MenuIcon className="w-8 mr-4" />
        </button>
        <h1 className="text-2xl text-black font-header font-medium whitespace-nowrap dark:text-white">
          {title}&nbsp;
        </h1>
        {showFavourite && FavouriteBtn}
      </div>

      <div className="hidden lg:block h-full">
        <SearchBar />
      </div>

      <div className="w-20">
        <div className="h-full flex space-x-4 justify-end bg-white dark:bg-dark px-4 -mx-4">
          <ThemeToggle />
          <RandomPageButton />
        </div>
      </div>
    </nav>
  );
}
