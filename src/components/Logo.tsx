import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"} passHref>
      <a>
        <h2 className="text-[1.65rem] font-header font-medium mb-8 text-black dark:text-white">
          LEAGUE OF
          <span className="block text-5xl">ITEMS</span>
        </h2>
      </a>
    </Link>
  );
}
