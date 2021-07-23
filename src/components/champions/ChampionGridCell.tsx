import Link from "next/link";

export default function ChampionGridCell({ id, className, size = "md" }) {
  return (
    <Link href={`/champions/${id}`} passHref>
      <a className={`block mr-[6px] mb-[6px] cursor-pointer ${className}`}>
        <img
          src={`/images/champions/${size == "md" ? "tiles/" : ""}${size == "md" ? 128 : 64}/${id}.webp`}
          style={{
            width: `${size == "md" ? 128 : 64}px`,
            height: `${size == "md" ? 128 : 64}px`,
            minWidth: `${size == "md" ? 128 : 64}px`,
            minHeight: `${size == "md" ? 128 : 64}px`,
          }}
          alt="Champion image"
        />
      </a>
    </Link>
  );
}
