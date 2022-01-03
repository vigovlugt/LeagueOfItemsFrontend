import Link from "next/link";
import styles from "./CategoryPreviews.module.css";

export default function CategoryPreviews() {
  return (
    <div className="mb-16 flex flex-col w-full items-stretch sm:space-x-4 sm:flex-row">
      <Link href="/items" passHref>
        <a
          className="w-full bg-white dark:bg-black rounded-lg p-4 relative overflow-hidden"
          style={{
            aspectRatio: "1 / 1",
          }}
        >
          <img
            src="/images/items/shopkeeper.webp"
            alt=""
            className={`${styles.categoryImageItems} absolute inset-0 h-full`}
          />
          <h2 className="font-header text-4xl absolute bottom-9 pointer-events-none">Items</h2>
          <span className="font-header absolute bottom-4 text-sm text-gray-500 pointer-events-none">
            View all
          </span>
        </a>
      </Link>
      <div className="flex flex-col w-full space-y-4">
        <Link href="/runes" passHref>
          <a className="h-full bg-white dark:bg-dark rounded-lg mt-4 p-4 relative overflow-hidden min-h-[300px] sm:min-h-0 sm:mt-0 ">
            <img
              src="/images/runes/runes-reforged.webp"
              alt=""
              className={`${styles.categoryImageRunes} absolute inset-0 h-full`}
            />
            <h2 className="font-header text-2xl absolute bottom-9 pointer-events-none">Runes</h2>
            <span className="font-header absolute bottom-4  text-sm text-gray-500 pointer-events-none">
              View all
            </span>
          </a>
        </Link>
        <Link href="/champions" passHref>
          <a className="h-full bg-white dark:bg-dark rounded-lg mt-4 p-4 relative overflow-hidden min-h-[300px] sm:min-h-0 sm:mt-0">
            <img
              src="/images/champions/champions.webp"
              alt=""
              className={`${styles.categoryImageChampions} absolute inset-0 h-full`}
            />
            <h2 className="font-header text-2xl absolute bottom-9 pointer-events-none">
              Champions
            </h2>
            <span className="font-header absolute bottom-4 text-sm text-gray-500 pointer-events-none">
              View all
            </span>
          </a>
        </Link>
      </div>
    </div>
  );
}
