import { QuestionMarkCircleIcon } from "@heroicons/react/solid";

export default function HelpHover({ text }) {
    return (
        <span className="group relative cursor-default">
            <QuestionMarkCircleIcon className="ml-[2px] mt-[-4px] inline h-[16px]" />
            <span
                className="absolute left-[50%] top-6 z-10 hidden w-96 whitespace-normal rounded-lg border-[1px] bg-white p-4 text-left text-base normal-case text-gray-900 shadow-lg group-hover:block dark:border-0 dark:bg-gray-700 dark:text-gray-100"
                style={{ transform: "translate(-50%, 0)" }}
            >
                {text}
            </span>
        </span>
    );
}
