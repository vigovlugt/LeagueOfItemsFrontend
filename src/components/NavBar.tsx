import SearchBar from "./layout/SearchBar";
import RandomPageButton from "./layout/RandomPageButton";
import ThemeToggle from "./layout/ThemeToggle";

export default function NavBar({ title }) {
  return (
    <nav className="w-full py-3 px-8 border-b  flex justify-between h-[65px] flex-shrink-0 bg-white border-gray-200 dark:bg-dark dark:border-gray-800">
      <div className="w-1/2 flex items-center">
        <h1 className="text-2xl text-black font-header font-medium whitespace-nowrap dark:text-white">
          {title}&nbsp;
        </h1>
      </div>

      <SearchBar />

      <div className="w-1/2 flex space-x-4 justify-end">
        <ThemeToggle />
        <RandomPageButton />
      </div>
    </nav>
  );
}
