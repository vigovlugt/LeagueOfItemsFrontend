import GridCell from "../GridCell";
import Link from "next/link";
import { ArrowSmRightIcon } from "@heroicons/react/solid";

export default function PopularSection({ pageViewDataset }) {
    return (
        <div>
            <h2 className="mb-2 font-header text-3xl lg:text-4xl">
                Most viewed items
            </h2>
            <div className="flex w-full space-x-4 overflow-x-auto pb-2">
                {pageViewDataset.items.map((p) => (
                    <GridCell key={p.type + "-" + p.id} {...p} />
                ))}
            </div>

            <Link prefetch={false}
                href="/items"
                passHref
                className="mt-4 mb-8 flex w-full items-center justify-center rounded bg-white p-2 text-lg shadow dark:bg-gray-900 dark:text-gray-50"
            >
                <h2 className="font-header text-xl">View all items</h2>
                <ArrowSmRightIcon className="inline w-8 text-gray-600 dark:text-gray-400" />
            </Link>

            <div className="lg:flex">
                <div className="pr-4 lg:w-1/2">
                    <h2 className="mb-2 font-header text-3xl lg:text-4xl">
                        Most viewed runes
                    </h2>
                    <div className="flex w-full space-x-4 overflow-x-auto pb-2">
                        {pageViewDataset.runes.map((p) => (
                            <GridCell key={p.type + "-" + p.id} {...p} />
                        ))}
                    </div>

                    <Link prefetch={false}
                        href="/runes"
                        passHref
                        className="mt-4 flex items-center justify-center rounded bg-white p-2 text-lg shadow dark:bg-gray-900 dark:text-gray-50"
                    >
                        <h2 className="font-header text-xl">View all runes</h2>
                        <ArrowSmRightIcon className="inline w-8 text-gray-600 dark:text-gray-400" />
                    </Link>
                </div>

                <div className="mt-8 mb-8 lg:mt-0 lg:w-1/2 lg:pl-4">
                    <h2 className="mb-2 font-header text-3xl lg:text-4xl">
                        Most viewed champions
                    </h2>
                    <div className="flex w-full space-x-4 overflow-x-auto pb-2">
                        {pageViewDataset.champions.map((p) => (
                            <GridCell key={p.type + "-" + p.id} {...p} />
                        ))}
                    </div>

                    <Link prefetch={false}
                        href="/champions"
                        passHref
                        className="mt-4 flex items-center justify-center rounded bg-white p-2 text-lg shadow dark:bg-gray-900 dark:text-gray-50"
                    >
                        <h2 className="font-header text-xl">
                            View all champions
                        </h2>
                        <ArrowSmRightIcon className="inline w-8 text-gray-600 dark:text-gray-400" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
