import Image from "next/image";

export default function ChampionIcon({id}) {
  return <div
    className="h-[64px] w-[64px] flex justify-center items-center relative overflow-hidden"
  >
    <div className="h-[72px] w-[72px] absolute">
      <Image
        height={72}
        width={72}
        src={
          `/images/champions/${id}.png`
        }
      />
    </div>
  </div>
}