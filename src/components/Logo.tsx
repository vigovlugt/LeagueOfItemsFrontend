import Link from "next/link";

export default function Logo() {
    return (
        <Link href={"/"}>
            <h2 className="mb-8 font-header text-[1.65rem] font-medium text-black dark:text-white">
                LEAGUE OF
                <span className="block text-5xl">ITEMS</span>
            </h2>
        </Link>
    );
}
