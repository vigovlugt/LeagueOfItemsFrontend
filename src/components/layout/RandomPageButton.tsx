import RandomIcon from "../icons/RandomIcon";
import { useState } from "react";
import { useRouter } from "next/router";

export default function RandomPageButton() {
    const [dataset, setDataset] = useState({
        items: [],
        runes: [],
        champions: [],
    });
    const [hasFetchedDataset, setHasFetchedDataset] = useState(false);
    const router = useRouter();

    const fetchDataset = async () => {
        const res = await fetch("/data/dataset.json");
        const dataset = await res.json();
        setDataset(dataset);
        setHasFetchedDataset(true);

        return dataset;
    };

    const onClick = async () => {
        let data = dataset;
        if (!hasFetchedDataset) {
            data = await fetchDataset();
        }

        const random = Math.random();
        if (random > 0.5) {
            goToRandomItem(data);
        } else if (random > 0.25) {
            goToRandomRune(data);
        } else {
            goToRandomChampion(data);
        }
    };

    const goToRandomItem = (dataset) => {
        const random = Math.floor(Math.random() * dataset.items.length);

        const item = dataset.items[random];

        goTo("item", item.id);
    };

    const goToRandomRune = (dataset) => {
        const random = Math.floor(Math.random() * dataset.runes.length);

        const rune = dataset.runes[random];

        goTo("rune", rune.id);
    };

    const goToRandomChampion = (dataset) => {
        const random = Math.floor(Math.random() * dataset.champions.length);

        const champions = dataset.champions[random];

        goTo("champion", champions.id);
    };

    const goTo = (type, id) => router.push(`/${type}s/${id}`);

    return (
        <button
            className="flex items-center rounded-md border border-gray-300 bg-white px-3 text-gray-700 shadow hover:bg-gray-200 focus:outline-none  dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
            onClick={onClick}
            title="Random page"
        >
            <RandomIcon />
        </button>
    );
}
