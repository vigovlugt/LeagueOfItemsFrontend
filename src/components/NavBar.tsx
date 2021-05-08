import SearchBar from "./layout/SearchBar";
import RandomPageButton from "./layout/RandomPageButton";
import ThemeToggle from "./layout/ThemeToggle";
import { MenuIcon } from "@heroicons/react/outline";

export default function NavBar({ title, onClickMenu }) {
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
