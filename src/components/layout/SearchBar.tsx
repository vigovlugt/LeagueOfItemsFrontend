import { useEffect, useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function SearchBar() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [isFocussed, setIsFocussed] = useState(false);

  const [results, setResults] = useState([]);

  const [dataset, setDataset] = useState({
    items: [],
    runes: [],
    champions: [],
  });
  const [hasFetchedDataset, setHasFetchedDataset] = useState(false);

  const onFocus = () => {
    setIsFocussed(true);

    if (!hasFetchedDataset) {
      fetchDataset();
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (!results.length) {
      return;
    }

    const { type, id } = results[0];

    router.push(`/${type}s/${id}`);
    setQuery("");
  };

  const filterFunction = (i) => {
    const name = i.name.toLowerCase().replaceAll("'", "");
    const searchQuery = query.toLowerCase().replaceAll("'", "");

    const firstLetters = name
      .split(" ")
      .map((str) => str.substr(0, 1))
      .join("");

    return name.includes(searchQuery) || firstLetters.includes(searchQuery);
  };

  const fetchDataset = async () => {
    const res = await fetch("/data/dataset.json");
    const dataset = await res.json();
    setDataset(dataset);
    setHasFetchedDataset(true);
  };

  useEffect(() => {
    const itemResults = query
      ? dataset.items
          .filter(filterFunction)
          .map((i) => ({ id: i.id, name: i.name, type: "item" }))
      : [];

    const runeResults = query
      ? dataset.runes
          .filter(filterFunction)
          .map((r) => ({ id: r.id, name: r.name, type: "rune" }))
      : [];

    const championResults = query
      ? dataset.champions
          .filter(filterFunction)
          .map((r) => ({ id: r.id, name: r.name, type: "champion" }))
      : [];

    setResults([...itemResults, ...runeResults, ...championResults]);
  }, [query, dataset]);

  return (
    <form className="relative" onSubmit={submit}>
      <input
        className={classNames(
          "h-full border rounded-md px-3 text-sm w-96 shadow-sm border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white",
          {
            "rounded-b-none": results.length > 0 && isFocussed,
          }
        )}
        placeholder="Search items, runes and champions"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onBlur={() => setTimeout(() => setIsFocussed(false), 100)}
        onFocus={onFocus}
      />
      <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
        <svg
          className="h-4 w-4 fill-current text-gray-500 dark:text-gray-400"
          viewBox="0 0 56.966 56.966"
          width="512px"
          height="512px"
        >
          <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
        </svg>
      </button>
      {results.length > 0 && isFocussed && (
        <div className="absolute rounded-md border py-2 w-full z-10 rounded-t-none bg-white border-gray-300 dark:bg-dark dark:border-gray-600">
          {results.slice(0, 5).map((result, i) => (
            <SearchResult
              {...result}
              key={result.id}
              onClick={() => setQuery("")}
            />
          ))}
        </div>
      )}
    </form>
  );
}

function SearchResult({ name, id, type, onClick }) {
  return (
    <Link href={`/${type}s/${id}`} passHref>
      <a
        className="cursor-pointer px-3 py-2 flex items-center justify-start hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={onClick}
      >
        <Image src={`/images/${type}s/${id}.png`} height={32} width={32} />{" "}
        <span className="ml-2 font-bold">{name}</span>
      </a>
    </Link>
  );
}
