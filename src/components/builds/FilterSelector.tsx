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
        <div className="flex h-full items-center" ref={outerClickRef as any}>
            {showSelector ? (
                <form className="relative h-full" onSubmit={submit}>
                    <input
                        ref={inputElement}
                        className={classNames(
                            "h-full w-72 rounded-md border border-gray-300 bg-white px-3 text-sm shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-300 xl:w-96"
                        )}
                        placeholder="Search"
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                    />
                    {results.length > 0 && (
                        <div className="absolute z-10 w-full rounded-md rounded-t-none border border-gray-300 bg-white py-2 dark:border-gray-600 dark:bg-dark">
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
                        className="inline-flex items-center rounded-md px-1 py-2 font-medium dark:text-white"
                        onClick={onClickAll}
                    >
                        <span>
                            {filter
                                ? "Only " + filter.name
                                : "All " + type.toLowerCase() + "s"}
                        </span>
                        <ChevronDownIcon className="ml-1 h-5 w-5" />
                    </button>
                    {filter && (
                        <button
                            className="inline-flex items-center rounded-md px-1 py-2 font-medium dark:text-white"
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
            className="flex cursor-pointer items-center justify-start px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
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
