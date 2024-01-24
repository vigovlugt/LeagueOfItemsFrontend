import Link from "next/link";
import styles from "./CategoryPreviews.module.css";
import { ArrowSmDownIcon } from "@heroicons/react/solid";

export default function CategoryPreviews() {
    const scrollToId = (id, e) => {
        e.preventDefault();
        document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="mb-16">
            <div className="mb-4 flex w-full flex-col items-stretch sm:flex-row sm:space-x-4">
                <Link
                    href="/items"
                    passHref
                    className="group relative w-full overflow-hidden rounded-lg bg-white dark:bg-black"
                    style={{
                        aspectRatio: "1 / 1",
                    }}
                >
                    <img
                        src="/images/items/shopkeeper.webp"
                        alt=""
                        className={`${styles.categoryImageItems} absolute inset-0 h-full`}
                    />
                    <h2 className="pointer-events-none absolute left-4 bottom-9 font-header text-4xl group-hover:text-white">
                        Items
                    </h2>
                    <span className="pointer-events-none absolute left-4 bottom-4 font-header text-sm text-gray-500 group-hover:text-white">
                        View all
                    </span>
                </Link>
                <div className="flex w-full flex-col space-y-4">
                    <Link
                        href="/runes"
                        passHref
                        className="group relative mt-4 h-full min-h-[300px] overflow-hidden rounded-lg bg-white p-4 dark:bg-dark sm:mt-0 sm:min-h-0"
                    >
                        <img
                            src="/images/runes/runes-reforged.webp"
                            alt=""
                            className={`${styles.categoryImageRunes} absolute inset-0 h-full w-full`}
                        />
                        <h2 className="pointer-events-none absolute bottom-9 font-header text-2xl group-hover:text-white">
                            Runes
                        </h2>
                        <span className="pointer-events-none absolute bottom-4 font-header text-sm text-gray-500 group-hover:text-white">
                            View all
                        </span>
                    </Link>
                    <Link
                        href="/champions"
                        passHref
                        className="group relative mt-4 h-full min-h-[300px] overflow-hidden rounded-lg bg-white p-4 dark:bg-dark sm:mt-0 sm:min-h-0"
                    >
                        <img
                            src="/images/champions/champions.webp"
                            alt=""
                            className={`${styles.categoryImageChampions} absolute inset-0 h-full w-full `}
                        />
                        <h2 className="pointer-events-none absolute bottom-9 font-header text-2xl group-hover:text-white">
                            Champions
                        </h2>
                        <span className="pointer-events-none absolute bottom-4 font-header text-sm text-gray-500 group-hover:text-white">
                            View all
                        </span>
                    </Link>
                </div>
            </div>
            <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                <a
                    href="#patch-overview"
                    className="flex w-full items-center justify-center rounded-lg bg-white p-2 text-lg shadow dark:bg-gray-900 dark:text-gray-50"
                    onClick={(e) => scrollToId("patch-overview", e)}
                >
                    <h2 className="font-header text-lg">Patch overview</h2>
                    <ArrowSmDownIcon className="inline w-8 text-gray-600 dark:text-gray-400" />
                </a>

                <a
                    href="#patch-rundown"
                    className="flex w-full items-center justify-center rounded-lg bg-white p-2 text-lg shadow dark:bg-gray-900 dark:text-gray-50"
                    onClick={(e) => scrollToId("patch-rundown", e)}
                >
                    <h2 className="font-header text-lg">Patch notes</h2>
                    <ArrowSmDownIcon className="inline w-8 text-gray-600 dark:text-gray-400" />
                </a>
            </div>
        </div>
    );
}
