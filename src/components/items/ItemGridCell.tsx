import Image from "next/image";
import Link from "next/link";

export default function ItemGridCell({ id }) {
  return (
    <Link href={`/items/${id}`} passHref>
      <a className="block mr-[6px]">
        <Image
          className="cursor-pointer"
          src={`/images/items/${id}.png`}
          width={128}
          height={128}
        />
      </a>
    </Link>
  );
}
