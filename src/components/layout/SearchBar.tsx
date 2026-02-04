import { useEffect, useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import getSearchResults from "../../lib/search";
import useOuterClick from "../../hooks/useOuterClick";

export default function SearchBar({ onSubmit = null }) {
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

    const reset = () => {
        setQuery("");
        if (onSubmit) {
            onSubmit();
        }
    };

    const submit = (e) => {
        e.preventDefault();
        if (!results.length) {
            return;
        }

        const { type, id } = results[0];

        router.push(`/${type.toLowerCase()}s/${id}`);
        (document.activeElement as HTMLElement).blur();
        reset();
    };

    const fetchDataset = async () => {
        const res = await fetch("/data/dataset.json");
        const dataset = await res.json();
        setDataset(dataset);
        setHasFetchedDataset(true);
    };

    useEffect(() => {
        const results = getSearchResults(query, dataset);

        setResults(results);
    }, [query, dataset]);

    const outerClickRef = useOuterClick(() => {
        setIsFocussed(false);
    });

    return (
        <form
            className="relative h-full"
            onSubmit={submit}
            ref={outerClickRef as any}
        >
            <input
                className={classNames(
                    "h-full w-72 rounded-md border border-gray-300 bg-white px-3 text-sm shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-300 xl:w-96",
                    {
                        "rounded-b-none": results.length > 0 && isFocussed,
                    }
                )}
                placeholder="Search items, runes and champions"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
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
                <div className="absolute z-10 w-full rounded-md rounded-t-none border border-gray-300 bg-white py-2 dark:border-gray-600 dark:bg-dark dark:text-white">
                    {results.slice(0, 5).map((result) => (
                        <SearchResult
                            {...result}
                            key={result.id}
                            onClick={reset}
                        />
                    ))}
                </div>
            )}
        </form>
    );
}

function SearchResult({ name, id, type, onClick }) {
    return (
        <Link prefetch={false}
            href={`/${type.toLowerCase()}s/${id}`}
            passHref
            className="flex cursor-pointer items-center justify-start px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={onClick}
        >
            <img
                src={`/images/${type.toLowerCase()}s/32/${id}.webp`}
                style={{
                    width: "32px",
                    height: "32px",
                    minWidth: "32px",
                    minHeight: "32px",
                }}
                alt="Search result image"
            />{" "}
            <span className="ml-2 font-bold">{name}</span>
        </Link>
    );
}
