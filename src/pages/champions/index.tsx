import { NextSeo } from "next-seo";
import ChampionApi from "../../api/ChampionApi";
import ChampionGridCell from "../../components/champions/ChampionGridCell";

export default function ChampionIndex({ champions }) {
    return (
        <div>
            <NextSeo
                title="Champions"
                description="See all League of Legends champions with data about both runes and items."
            />

            <h2 className="mb-2 font-header text-4xl">Champions</h2>
            <div className="flex flex-wrap">
                {champions.map((c) => (
                    <ChampionGridCell
                        {...c}
                        key={c.id}
                        className="mr-[6px] mb-[6px]"
                    />
                ))}
            </div>
        </div>
    );
}

export async function getStaticProps(context) {
    const champions = ChampionApi.getAllChampions().map(({ id }) => ({ id }));

    return {
        props: {
            champions,
        },
    };
}

ChampionIndex.pageName = "Champions";
