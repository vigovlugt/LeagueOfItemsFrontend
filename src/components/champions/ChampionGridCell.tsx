import Image from "next/image";
import Link from "next/link";

export default function ChampionGridCell({ id }) {
  return (
    <Link href={`/champions/${id}`}>
      <div className="mr-[6px]">
        <Image
          className="cursor-pointer champion-image"
          src={`/images/champions/${id}.png`}
          width={128}
          height={128}
        />
      </div>
    </Link>
  );
}
