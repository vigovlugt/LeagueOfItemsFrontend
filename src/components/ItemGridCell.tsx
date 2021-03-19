import Image from "next/image";
import Link from "next/link";

export default function ItemGridCell({ id }) {
  return <Link href={`/items/${id}`}><Image className="cursor-pointer" src={`/images/items/${id}.png`} width={128} height={128} /></Link>;
}
