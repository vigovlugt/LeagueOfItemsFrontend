import Link from "next/link";

export default function RuneGridCell({ id, size = "md", className = "" }) {
    return (
        <Link
            href={`/runes/${id}`}
            passHref
            className={`block cursor-pointer ${className}`}
        >
            <img
                src={`/images/runes/${size == "md" ? 128 : 64}/${id}.webp`}
                style={{
                    width: `${size == "md" ? 128 : 64}px`,
                    height: `${size == "md" ? 128 : 64}px`,
                    minWidth: `${size == "md" ? 128 : 64}px`,
                    minHeight: `${size == "md" ? 128 : 64}px`,
                }}
                loading="lazy"
                alt="Rune image"
            />
        </Link>
    );
}
