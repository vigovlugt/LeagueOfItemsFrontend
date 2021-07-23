import Link from "next/link";

export default function RuneGridCell({ id, size = "md", className }) {
  return (
    <Link href={`/runes/${id}`} passHref>
      <a className={`block mr-[6px] mb-[6px] cursor-pointer ${className}`}>
        <img
          src={`/images/runes/${size == "md" ? 128 : 64}/${id}.webp`}
          style={{
            width: `${size == "md" ? 128 : 64}px`,
            height: `${size == "md" ? 128 : 64}px`,
            minWidth: `${size == "md" ? 128 : 64}px`,
            minHeight: `${size == "md" ? 128 : 64}px`,
          }}
          alt="Rune image"
        />
      </a>
    </Link>
  );
}
