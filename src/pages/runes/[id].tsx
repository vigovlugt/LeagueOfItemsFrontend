import Image from "next/image";
import {removeTags, winrate, winrateClass} from "../../utils/format";
import RuneApi from "../../api/RuneApi";
import RuneStats from "../../models/runes/RuneStats";
import Card from "../../components/Card";
import {NextSeo} from "next-seo";

export default function RunePage({rune}) {
  rune = new RuneStats(rune);

  return (
    <div className="flex flex-col">
      <NextSeo
        title={rune.name}
        description={`See ${rune.name}'s best champions and winrate statistics. Data from U.GG.`}
      />

      <div className="flex mb-4 w-full">
        <div className="w-[256px] h-[256px] mr-4 flex-shrink-0">
          <Image
            className="cursor-pointer"
            src={`/images/runes/${rune.id}.png`}
            width={256}
            height={256}
            quality={100}
          />
        </div>
        <div className="flex flex-col w-full">
          <h2 className="text-5xl font-header font-medium">{rune.name}</h2>
          <p className="text-lg font-header mb-4 text-gray-600">
            {removeTags(rune.shortDescription)}
          </p>
          <div className="grid grid-cols-2 gap-3 mb-4 xl:w-1/2">
            <div className="bg-white rounded p-4 text-lg text-center font-bold text-gray-600 shadow">
              <span
                className={`text-gray-900 ${winrateClass(
                  rune.wins,
                  rune.matches
                )}`}
              >
                {winrate(rune.wins, rune.matches)}
              </span>{" "}
              Winrate
            </div>
            <div className="bg-white rounded p-4 text-lg text-center font-bold text-gray-600 shadow">
              <span className="text-gray-900">{rune.matches}</span> Matches
            </div>
            <div className="bg-white rounded p-4 text-lg text-center font-bold text-gray-600 shadow">
              <span className="text-gray-900">{rune.championStats.length}</span>{" "}
              Champions
            </div>
          </div>
        </div>
      </div>

      {/* Highest winrate champions */}
      <div>
        <h2 className="text-2xl font-header font-medium mb-1">
          Highest winrate champions
        </h2>
        <div className="flex space-x-2 w-full overflow-x-auto pb-2">
          {rune.championStats
            .sort((a, b) => b.wins / b.matches - a.wins / a.matches)
            .map((championStats, i) => (
              <Card key={i} type={"champion"} {...championStats} id={championStats.championId}/>
            ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const runes = await RuneApi.getAllRunes();

  return {
    paths: runes.map((r) => ({params: {id: r.id.toString()}})),
    fallback: false,
  };
}

export async function getStaticProps({params}) {
  const rune = await RuneApi.getRune(params.id);

  return {
    props: {
      rune,
    },
  };
}

RunePage.pageName = ({rune}) => rune.name;
