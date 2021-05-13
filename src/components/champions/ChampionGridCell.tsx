import Link from "next/link";

export default function ChampionGridCell({ id }) {
  return (
    <Link href={`/champions/${id}`} passHref>
      <a className="block mr-[6px] mb-[6px] cursor-pointer">
        <img
          src={`/images/champions/tiles/128/${id}.webp`}
          style={{
            width: "128px",
            height: "128px",
            minHeight: "128px",
            minWidth: "128px",
          }}
          alt="Champion image"
        />
      </a>
    </Link>
  );
}
