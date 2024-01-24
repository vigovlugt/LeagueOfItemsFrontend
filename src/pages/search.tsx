import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect } from "react";
import getSearchResults from "../lib/search";

export default function SearchPage() {
    const router = useRouter();

    const queryKey = "q";
    const queryValue =
        router.query[queryKey] ||
        router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`));

    const q = queryValue && queryValue[1];

    useEffect(() => {
        onInit();
    }, []);

    async function onInit() {
        const res = await fetch("/data/dataset.json");
        const dataset = await res.json();

        const results = getSearchResults(q, dataset);

        if (results.length > 0) {
            const { type, id } = results[0];

            await router.push(`/${type}s/${id}`);
            return;
        }

        await router.push("/");
    }

    return (
        <div>
            <NextSeo
                title="Search"
                description="Search any item, rune or champion on League of Items."
            />
        </div>
    );
}
