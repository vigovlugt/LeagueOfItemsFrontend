import RuneApi from "../../api/RuneApi";
import RuneGridCell from "../../components/runes/RuneGridCell";
import { useMemo } from "react";
import RuneStats from "../../models/runes/RuneStats";
import { NextSeo } from "next-seo";
import { SponsorLayout } from "../../components/ads/GameBoost";

export default function RuneIndex({ runes }) {
    const { keystones, normalRunes } = useMemo(() => {
        const keystones = runes.filter((r) => RuneStats.isKeystone(r));
        const normalRunes = runes.filter((r) => !RuneStats.isKeystone(r));

        return { keystones, normalRunes };
    }, [runes]);

    return (
        <div>
            <NextSeo
                title="Runes"
                description="See all League of Legends runes and what champions they are best used on."
            />

            <SponsorLayout>
                <h2 className="mb-2 font-header text-4xl">Keystones</h2>
                <div className="flex flex-wrap">
                    {keystones.map((i) => (
                        <RuneGridCell
                            {...i}
                            key={i.id}
                            className="mr-[6px] mb-[6px]"
                        />
                    ))}
                </div>

                <h2 className="mb-2 font-header text-4xl">Runes</h2>
                <div className="flex flex-wrap">
                    {normalRunes.map((i) => (
                        <RuneGridCell
                            {...i}
                            key={i.id}
                            className="mr-[6px] mb-[6px]"
                            size="sm"
                        />
                    ))}
                </div>
            </SponsorLayout>
        </div>
    );
}

export async function getStaticProps(context) {
    const runes = RuneApi.getAllRunes().map(({ id, tier }) => ({ id, tier }));

    return {
        props: {
            runes,
        },
    };
}

RuneIndex.pageName = "Runes";
