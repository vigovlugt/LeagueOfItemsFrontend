import Link from "next/link";

export default function ItemGridCell({ id }) {
  return (
    <Link href={`/items/${id}`} passHref>
      <a className="block mr-[6px] mb-[6px] cursor-pointer">
        <img
          src={`/images/items/128/${id}.webp`}
          style={{
            width: "128px",
            height: "128px",
            minHeight: "128px",
            minWidth: "128px",
          }}
          alt="Item image"
        />
      </a>
    </Link>
  );
}
