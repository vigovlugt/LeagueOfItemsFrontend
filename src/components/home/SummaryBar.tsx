import dataset from "../../../data/dataset.json";
import { addDays, differenceInCalendarDays, formatDistance } from "date-fns";

export default function SummaryBar({
    patch,
    numberFormatter,
    totalMatches,
    nextPatch,
}) {
    const daysToNextPatch = nextPatch
        ? differenceInCalendarDays(
              new Date(nextPatch.scheduledDate),
              new Date()
          )
        : null;

    let daysText = `in ${daysToNextPatch} days`;
    if (daysToNextPatch == 0) daysText = "today";
    if (daysToNextPatch == 1) daysText = "tomorrow";
    if (daysToNextPatch == null) daysText = "in ? days";

    return (
        <div className="flex rounded py-6 text-lg dark:bg-gray-900 dark:text-gray-50 md:bg-white md:shadow">
            <div className="hidden w-1/2 flex-col items-center justify-center md:flex">
                <h2 className="text-base font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                    Current patch
                </h2>
                <p className="mb-2 text-4xl font-extrabold leading-8 tracking-tight text-gray-900 dark:text-gray-50">
                    {patch}
                </p>
                {daysToNextPatch >= 0 && (
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Next patch {daysText}
                    </p>
                )}
            </div>

            <div className="h-100 border-r-1 hidden border border-gray-300 dark:border-gray-600 md:block" />

            <div className="flex w-full flex-col items-center justify-center">
                <h2 className="text-center font-header text-5xl font-medium uppercase text-black dark:text-white">
                    League of Items
                </h2>
            </div>

            <div className="h-100 border-l-1 hidden border border-gray-300 dark:border-gray-600 md:block" />

            <div className="hidden w-1/2 flex-col items-center justify-center md:flex">
                <h2 className="text-base font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                    Matches analyzed
                </h2>
                <p className="mb-2 text-4xl font-extrabold leading-8 tracking-tight text-gray-900 dark:text-gray-50">
                    {numberFormatter.format(totalMatches)}
                </p>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    World, Platinum+
                </p>
            </div>
        </div>
    );
}
