import Link from "next/link";
import styles from "./CategoryPreviews.module.css";

export default function CategoryPreviews() {
  return (
    <div className="mb-16 flex w-full flex-col items-stretch sm:flex-row sm:space-x-4">
      <Link href="/items" passHref>
        <a
          className="group relative w-full overflow-hidden rounded-lg bg-white p-4 dark:bg-black"
          style={{
            aspectRatio: "1 / 1",
          }}
        >
          <img
            src="/images/items/shopkeeper.webp"
            alt=""
            className={`${styles.categoryImageItems} absolute inset-0 h-full`}
          />
          <h2 className="pointer-events-none absolute bottom-9 font-header text-4xl group-hover:text-white">
            Items
          </h2>
          <span className="pointer-events-none absolute bottom-4 font-header text-sm text-gray-500 group-hover:text-white">
            View all
          </span>
        </a>
      </Link>
      <div className="flex w-full flex-col space-y-4">
        <Link href="/runes" passHref>
          <a className="group relative mt-4 h-full min-h-[300px] overflow-hidden rounded-lg bg-white p-4 dark:bg-dark sm:mt-0 sm:min-h-0">
            <img
              src="/images/runes/runes-reforged.webp"
              alt=""
              className={`${styles.categoryImageRunes} absolute inset-0 h-full`}
            />
            <h2 className="pointer-events-none absolute bottom-9 font-header text-2xl group-hover:text-white">
              Runes
            </h2>
            <span className="pointer-events-none absolute bottom-4  font-header text-sm text-gray-500 group-hover:text-white">
              View all
            </span>
          </a>
        </Link>
        <Link href="/champions" passHref>
          <a className="group relative mt-4 h-full min-h-[300px] overflow-hidden rounded-lg bg-white p-4 dark:bg-dark sm:mt-0 sm:min-h-0">
            <img
              src="/images/champions/champions.webp"
              alt=""
              className={`${styles.categoryImageChampions} absolute inset-0 h-full`}
            />
            <h2 className="pointer-events-none absolute bottom-9 font-header text-2xl group-hover:text-white">
              Champions
            </h2>
            <span className="pointer-events-none absolute bottom-4 font-header text-sm text-gray-500 group-hover:text-white">
              View all
            </span>
          </a>
        </Link>
      </div>
    </div>
  );
}
