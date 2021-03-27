import Image from "next/image";

const iconClassBySize = {
  sm: "h-[32px] w-[32px]",
  md: "h-[64px] w-[64px]",
  lg: "h-[128px] w-[128px]",
};

const containerClassBySize = {
  sm: "h-[38px] w-[38px]",
  md: "h-[72px] w-[72px]",
  lg: "h-[134px] w-[134px]",
};

export default function ChampionIcon({ id, size = "md" }) {
  return (
    <div
      className={`${iconClassBySize[size]} flex justify-center items-center relative overflow-hidden`}
    >
      <div className={`${containerClassBySize[size]} absolute`}>
        <Image height={72} width={72} src={`/images/champions/${id}.png`} />
      </div>
    </div>
  );
}