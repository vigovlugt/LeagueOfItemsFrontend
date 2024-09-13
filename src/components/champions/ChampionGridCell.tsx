import Link from "next/link";

export default function ChampionGridCell({ id, className = "", size = "md" }) {
    return (
        <Link
            href={`/champions/${id}`}
            passHref
            className={`block cursor-pointer ${className} group`}
        >
            <img
                src={`/images/champions/${size == "md" ? "tiles/" : ""}${
                    size == "md" ? 128 : 64
                }/${id}.webp`}
                style={{
                    width: `${size == "md" ? 128 : 64}px`,
                    height: `${size == "md" ? 128 : 64}px`,
                    minWidth: `${size == "md" ? 128 : 64}px`,
                    minHeight: `${size == "md" ? 128 : 64}px`,
                }}
                loading="lazy"
                alt="Champion image"
            />
        </Link>
    );
}
