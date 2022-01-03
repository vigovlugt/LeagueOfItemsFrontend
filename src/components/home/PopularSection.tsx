import GridCell from "../GridCell";
import Link from "next/link";
import { ArrowSmRightIcon } from "@heroicons/react/solid";

export default function PopularSection({ pageViewDataset }) {
  return (
    <div>
      <h2 className="font-header text-4xl mb-2">Most viewed items</h2>
      <div className="flex w-full overflow-x-auto pb-2 space-x-4">
        {pageViewDataset.items
          .map((p) => (
            <GridCell key={p.type + "-" + p.id} {...p} />
          ))}
      </div>

      <Link href="/items" passHref>
        <a className="flex justify-center items-center w-full bg-white rounded p-2 text-lg shadow mt-4 mb-8 dark:text-gray-50 dark:bg-gray-900">
          <h2 className="font-header text-xl">View all items</h2>
          <ArrowSmRightIcon className="w-8 inline text-gray-600 dark:text-gray-400" />
        </a>
      </Link>

      <div className="flex">
        <div className="w-1/2 pr-4">
          <h2 className="font-header text-4xl mb-2">Most viewed runes</h2>
          <div className="flex w-full overflow-x-auto pb-2 space-x-4">
            {pageViewDataset.runes
              .map((p) => (
                <GridCell key={p.type + "-" + p.id} {...p} />
              ))}
          </div>

          <Link href="/runes" passHref>
            <a className="flex justify-center items-center bg-white rounded p-2 text-lg shadow mt-4 dark:text-gray-50 dark:bg-gray-900">
              <h2 className="font-header text-xl">View all runes</h2>
              <ArrowSmRightIcon className="w-8 inline text-gray-600 dark:text-gray-400" />
            </a>
          </Link>
        </div>

        <div className="w-1/2 pl-4">
          <h2 className="font-header text-4xl mb-2">Most viewed champions</h2>
          <div className="flex w-full overflow-x-auto pb-2 space-x-4">
            {pageViewDataset.champions
              .map((p) => (
                <GridCell key={p.type + "-" + p.id} {...p} />
              ))}
          </div>

          <Link href="/champions" passHref>
            <a className="flex justify-center items-center bg-white rounded p-2 text-lg shadow mt-4 dark:text-gray-50 dark:bg-gray-900">
              <h2 className="font-header text-xl">View all champions</h2>
              <ArrowSmRightIcon className="w-8 inline text-gray-600 dark:text-gray-400" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
