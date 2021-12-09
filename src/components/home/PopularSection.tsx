import GridCell from "../GridCell";
import Link from "next/link";
import { ArrowSmRightIcon } from "@heroicons/react/solid";

export default function PopularSection({ popularPages }) {
  return (
    <div>
      <h2 className="font-header text-4xl mb-2">Popular items</h2>
      <div className="flex w-full overflow-hidden space-x-4">
        {popularPages
          .filter((p) => p.type === "ITEM")
          .slice(0, 20)
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

      <div className="flex space-x-8">
        <div className="w-1/2">
          <h2 className="font-header text-4xl mb-2">Popular runes</h2>
          <div className="flex w-full overflow-hidden space-x-4">
            {popularPages
              .filter((p) => p.type === "RUNE")
              .slice(0, 15)
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

        <div className="w-1/2">
          <h2 className="font-header text-4xl mb-2">Popular champions</h2>
          <div className="flex w-full overflow-hidden space-x-4">
            {popularPages
              .filter((p) => p.type === "CHAMPION")
              .slice(0, 15)
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