import dataset from "../../../data/dataset.json";

export default function SummaryBar({ dataset, numberFormatter, totalMatches }) {
  return (
    <div className="flex md:bg-white rounded py-6 text-lg md:shadow dark:text-gray-50 dark:bg-gray-900">
      <div className="hidden md:flex flex-col justify-center items-center w-1/2">
        <h2 className="text-base text-gray-600 font-semibold tracking-wide uppercase dark:text-gray-400">
          Current patch
        </h2>
        <p className="mt-1 text-4xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-50">
          {dataset.version}
        </p>
      </div>

      <div className="hidden md:block h-100 border border-r-1 border-gray-300 dark:border-gray-600" />

      <div className="flex flex-col justify-center items-center w-full">
        <h2 className="text-5xl font-header font-medium text-black text-center dark:text-white uppercase">
          League of Items
        </h2>
      </div>

      <div className="hidden md:block h-100 border border-l-1 border-gray-300 dark:border-gray-600" />

      <div className="hidden md:flex flex-col justify-center items-center w-1/2">
        <h2 className="text-base text-gray-600 font-semibold tracking-wide uppercase dark:text-gray-400">
          Matches analyzed
        </h2>
        <p className="mt-1 text-4xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-50">
          {numberFormatter.format(totalMatches)}
        </p>
      </div>
    </div>
  );
}
