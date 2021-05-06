import {MoonIcon, SunIcon} from "@heroicons/react/solid";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const onClick = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <button
      className="flex items-center py-3 focus:outline-none"
      onClick={onClick}
      title="Random page"
    >
      {theme === "light" ? (
        <MoonIcon className="w-6 text-gray-700 dark:text-gray-200" />
      ) : (
        <SunIcon className="w-6 text-gray-700 dark:text-gray-200" />
      )}
    </button>
  );
}
