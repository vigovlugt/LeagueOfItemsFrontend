import SearchBar from "./layout/SearchBar";
import RandomPageButton from "./layout/RandomPageButton";

export default function NavBar({ title }) {
  return (
    <nav className="w-full py-3 px-8 bg-white border-b border-gray-200 flex justify-between h-[65px] flex-shrink-0">
      <div className="w-1/2 flex items-center">
        <h1 className="text-2xl font-header font-medium whitespace-nowrap">
          {title}&nbsp;
        </h1>
      </div>

      <SearchBar />

      <div className="w-1/2 flex space-x-4 justify-end">
        <RandomPageButton/>
      </div>
    </nav>
  );
}
