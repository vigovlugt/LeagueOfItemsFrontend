import classNames from "classnames";
import { ChevronDownIcon, XIcon } from "@heroicons/react/solid";
import useOuterClick from "../../hooks/useOuterClick";
import { useEffect, useRef, useState } from "react";
import getSearchResults from "../../lib/search";

export default function FilterSelector({ filter, setFilter, type }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showSelector, setShowSelector] = useState(false);
  const [dataset, setDataset] = useState({
    items: [],
    runes: [],
    champions: [],
  });
  const [hasFetchedDataset, setHasFetchedDataset] = useState(false);

  const inputElement = useRef<HTMLInputElement>();

  const fetchDataset = async () => {
    if (hasFetchedDataset) {
      return;
    }

    setHasFetchedDataset(true);

    const res = await fetch("/data/dataset.json");
    const dataset = await res.json();
    setDataset(dataset);
  };

  useEffect(() => {
    const results = getSearchResults(query, dataset).filter(
      (r) => r.type === type.toLowerCase()
    );

    setResults(results);
  }, [query, dataset]);

  useEffect(() => {
    if (showSelector) {
      inputElement.current.focus();
      fetchDataset();
    }
  }, [showSelector]);

  const outerClickRef = useOuterClick((e) => {
    if (showSelector) {
      setShowSelector(false);
    }
  });

  const onClickAll = () => {
    setShowSelector(true);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!results.length) {
      return;
    }

    onSubmit(results[0]);
  };

  const onSubmit = (id) => {
    setFilter(id);
    setQuery("");
    setShowSelector(false);
  };

  return (
    <div className="h-full flex items-center" ref={outerClickRef as any}>
      {showSelector ? (
        <form className="relative h-full" onSubmit={submit}>
          <input
            ref={inputElement}
            className={classNames(
              "h-full border rounded-md px-3 text-sm w-72 xl:w-96 shadow-sm border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white"
            )}
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          {results.length > 0 && (
            <div className="absolute rounded-md border py-2 w-full z-10 rounded-t-none bg-white border-gray-300 dark:bg-dark dark:border-gray-600">
              {results.slice(0, 5).map((result) => (
                <SearchResult
                  {...result}
                  key={result.id}
                  onClick={() => onSubmit(result)}
                  type={type}
                />
              ))}
            </div>
          )}
        </form>
      ) : (
        <>
          <button
            className="px-1 py-2 rounded-md inline-flex items-center font-medium dark:text-white"
            onClick={onClickAll}
          >
            <span>
              {filter ? "Only " + filter.name : "All " + type.toLowerCase() + "s"}
            </span>
            <ChevronDownIcon className="ml-1 h-5 w-5" />
          </button>
          {filter && (
            <button
              className="px-1 py-2 rounded-md inline-flex items-center font-medium dark:text-white"
              onClick={() => setFilter(null)}
            >
              <XIcon className="h-5 w-5" />
            </button>
          )}
        </>
      )}
    </div>
  );
}

function SearchResult({ name, id, onClick, type }) {
  return (
    <div
      className="cursor-pointer px-3 py-2 flex items-center justify-start hover:bg-gray-100 dark:hover:bg-gray-800"
      onClick={onClick}
    >
      <img
        src={`/images/${type}s/32/${id}.webp`}
        style={{
          width: "32px",
          height: "32px",
          minWidth: "32px",
          minHeight: "32px",
        }}
        alt="Search result image"
      />{" "}
      <span className="ml-2 font-bold">{name}</span>
    </div>
  );
}
