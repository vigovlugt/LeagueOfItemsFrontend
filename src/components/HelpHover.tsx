import { QuestionMarkCircleIcon } from "@heroicons/react/solid";

export default function HelpHover({ text }) {
  return (
    <span className="group relative cursor-default">
      <QuestionMarkCircleIcon className="inline h-[16px] ml-[2px] mt-[-4px]" />
      <span
        className="hidden group-hover:block absolute left-[50%] top-6 z-10 p-4 shadow-lg rounded-lg whitespace-normal w-96 text-base text-left normal-case bg-white text-gray-900 border-[1px] dark:border-0 dark:bg-gray-700 dark:text-gray-100"
        style={{ transform: "translate(-50%, 0)" }}
      >
        {text}
      </span>
    </span>
  );
}
