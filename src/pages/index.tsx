import ItemApi from "../api/ItemApi";
import { NextSeo } from "next-seo";
import PageViewApi from "../api/PageViewApi";
import BuildsApi from "../api/BuildsApi";
import GridCell from "../components/GridCell";
import Link from "next/link";
import dataset from "../../data/dataset.json";
import MatchApi from "../api/MatchApi";
import { TrendingUpIcon } from "@heroicons/react/outline";
import { ArrowSmRightIcon } from "@heroicons/react/solid";
import HomeSidebar from "../components/home/HomeSidebar";
import BuildStats from "../models/builds/BuildStats";

export default function Home({
  totalMatches = 0,
  popularPages = [],
  winrateBuilds = [],
  playrateBuilds = [],
}) {
  const numberFormatter = new Intl.NumberFormat("us-US");
  const percentageFormatter = new Intl.NumberFormat("us-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  winrateBuilds = winrateBuilds.map(b => new BuildStats(b));
  playrateBuilds = playrateBuilds.map(b => new BuildStats(b));

  return (
    <div className="-mt-3">
      <NextSeo />

      <div className="flex bg-white rounded py-6 text-lg shadow dark:text-gray-50 dark:bg-gray-900">
        <div className="flex flex-col justify-center items-center w-1/4">
          <h2 className="text-base text-gray-600 font-semibold tracking-wide uppercase dark:text-gray-400">
            Current patch
          </h2>
          <p className="mt-1 text-4xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-50">
            {dataset.version}
          </p>
        </div>

        <div className="h-100 border border-r-1 border-gray-300 dark:border-gray-600" />

        <div className="flex flex-col justify-center items-center w-1/2">
          <h2 className="text-5xl font-header font-medium text-black text-center dark:text-white uppercase">
            League of Items
          </h2>
        </div>

        <div className="h-100 border border-l-1 border-gray-300 dark:border-gray-600" />

        <div className="flex flex-col justify-center items-center w-1/4">
          <h2 className="text-base text-gray-600 font-semibold tracking-wide uppercase dark:text-gray-400">
            Matches analyzed
          </h2>
          <p className="mt-1 text-4xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-50">
            {numberFormatter.format(totalMatches)}
          </p>
        </div>
      </div>

      {/*<div className="flex space-x-4">*/}
      {/*  <div className="flex flex-col justify-center items-center w-1/4 bg-white rounded p-4 text-lg shadow dark:text-gray-50 dark:bg-gray-900">*/}
      {/*    <h2 className="text-base text-gray-600 font-semibold tracking-wide uppercase dark:text-gray-400">*/}
      {/*      Current patch*/}
      {/*    </h2>*/}
      {/*    <p className="mt-1 text-4xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-50">*/}
      {/*      {dataset.version}*/}
      {/*    </p>*/}
      {/*  </div>*/}

      {/*  <div className="flex justify-center items-center w-1/2 bg-white rounded p-4 text-lg shadow dark:text-gray-50 dark:bg-gray-900">*/}
      {/*    <h2 className="text-5xl font-header font-medium text-black dark:text-white uppercase">*/}
      {/*      League of Items*/}
      {/*    </h2>*/}
      {/*  </div>*/}

      {/*  <div className="flex flex-col justify-center items-center w-1/4 bg-white rounded p-4 text-lg shadow dark:text-gray-50 dark:bg-gray-900">*/}
      {/*    <h2 className="text-base text-gray-600 font-semibold tracking-wide uppercase dark:text-gray-400">*/}
      {/*      Matches analyzed*/}
      {/*    </h2>*/}
      {/*    <p className="mt-1 text-4xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-50">*/}
      {/*      {numberFormatter.format(totalMatches)}*/}
      {/*    </p>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div
        className="grid w-full max-w-full pt-6 gap-8"
        style={{ gridTemplateColumns: "auto 25%" }}
      >
        <div className="w-full overflow-hidden">
          <h2 className="font-header text-4xl mb-2">Popular items</h2>
          <div className="flex w-full overflow-hidden space-x-4">
            {popularPages
              .filter((p) => p.type === "ITEM")
              .slice(0, 20)
              .map((p) => (
                <GridCell key={p.type + "-" + p.id} {...p} size="sm" />
              ))}
          </div>

          <Link href="/items" passHref>
            <a className="flex justify-center items-center w-full bg-white rounded p-2 text-lg shadow mt-4 dark:text-gray-50 dark:bg-gray-900">
              <h2 className="font-header text-xl">View all items</h2>
              <ArrowSmRightIcon className="w-8 inline text-gray-600 dark:text-gray-400" />
            </a>
          </Link>

          <div className="flex space-x-8">
            <div className="w-1/2">
              <h2 className="font-header text-4xl mb-2 mt-6">Popular runes</h2>
              <div className="flex w-full overflow-hidden space-x-4">
                {popularPages
                  .filter((p) => p.type === "RUNE")
                  .slice(0, 15)
                  .map((p) => (
                    <GridCell key={p.type + "-" + p.id} {...p} size="sm" />
                  ))}
              </div>

              <Link href="/runes" passHref>
                <a className="flex justify-center items-center bg-white rounded p-2 text-lg shadow mt-4 dark:text-gray-50 dark:bg-gray-900">
                  <h2 className="font-header text-xl">View all runes</h2>
                  <ArrowSmRightIcon className="w-8 inline text-gray-600 dark:text-gray-400" />
                </a>
              </Link>
            </div>

            <div className="w-1/2">
              <h2 className="font-header text-4xl mb-2 mt-6">
                Popular champions
              </h2>
              <div className="flex w-full overflow-hidden space-x-4">
                {popularPages
                  .filter((p) => p.type === "CHAMPION")
                  .slice(0, 15)
                  .map((p) => (
                    <GridCell key={p.type + "-" + p.id} {...p} size="sm" />
                  ))}
              </div>

              <Link href="/champions" passHref>
                <a className="flex justify-center items-center bg-white rounded p-2 text-lg shadow mt-4 dark:text-gray-50 dark:bg-gray-900">
                  <h2 className="font-header text-xl">View all champions</h2>
                  <ArrowSmRightIcon className="w-8 inline text-gray-600 dark:text-gray-400" />
                </a>
              </Link>
            </div>
          </div>

          <h2 className="font-header text-4xl mb-2 mt-12">
            Biggest changes this patch
          </h2>
          <div className="flex space-x-2 w-full overflow-x-auto pb-2">
            {popularPages.map((p) => (
              <div key={p.type + "-" + p.id}  className="flex flex-col items-center bg-white rounded shadow dark:text-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50">
                <GridCell{...p} size="sm"/>
                <div className="flex items-center font-semibold my-1">
                  <TrendingUpIcon className="w-8 text-green-400 inline mr-2" />
                  <span className="text-xl font-header">
                    {/*{percentageFormatter.format(0.25)}*/}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <HomeSidebar playrateBuilds={playrateBuilds} winrateBuilds={winrateBuilds}/>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const items = ItemApi.getAllItems();
  const totalMatches = MatchApi.getTotalMatches();

  const popularPages = await PageViewApi.getPopularPages();

  const winrateBuilds = await BuildsApi.getByWinrate().slice(0, 10);
  const playrateBuilds = await BuildsApi.getByPlayrate().slice(0, 10);

  return {
    props: {
      items,
      totalMatches: Math.round(totalMatches),
      popularPages,
      winrateBuilds,
      playrateBuilds,
    },
    revalidate: 5 * 60,
  };
}

Home.pageName = "Home";
