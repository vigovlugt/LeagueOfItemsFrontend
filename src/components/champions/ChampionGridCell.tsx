import Image from "next/image";
import Link from "next/link";

export default function ChampionGridCell({ id }) {
  return (
    <Link href={`/champions/${id}`}>
      <div className="mr-[6px]">
        <Image
          className="cursor-pointer"
          src={`/images/champions/tiles/${id}.jpg`}
          width={128}
          height={128}
        />
      </div>
    </Link>
  );
}
