import classNames from "classnames";
import Link from "next/link";
import ListItem from "./icons/ListIcon";
import { useRouter } from "next/router";
import RuneIcon from "./icons/RuneIcon";
import SwordIcon from "./icons/SwordIcon";
import SideNavFooter from "./layout/SideNavFooter";
import ChampionIcon from "./icons/ChampionIcon";
import Logo from "./Logo";
import { MailIcon, QuestionMarkCircleIcon } from "@heroicons/react/outline";

const MENU_ITEMS = [
  {
    name: "Items",
    href: "/",
    icon: SwordIcon,
  },
  {
    name: "Item Tierlist",
    href: "/tierlist",
    icon: ListItem,
  },
  {
    name: "Runes",
    href: "/runes",
    icon: RuneIcon,
  },
  {
    name: "Rune Tierlist",
    href: "/runes/tierlist",
    icon: ListItem,
  },
  {
    name: "Champions",
    href: "/champions",
    icon: ChampionIcon,
  },
  {
    name: "Champion Tierlist",
    href: "/champions/tierlist",
    icon: ListItem,
  },
  {
    name: "FAQ",
    href: "/faq",
    icon: () => <QuestionMarkCircleIcon className="w-8" />,
    className: "mt-auto",
  },
  {
    name: "Contact",
    href: "mailto:info@leagueofitems.com",
    icon: () => <MailIcon className="w-8" />,
  },
];

export default function SideNavigation() {
  const router = useRouter();

  return (
    <nav className="h-screen w-80 p-4 z-10 border-r flex flex-col flex-none border-gray-200 bg-white dark:bg-dark dark:border-gray-800">
      <Logo />

      <div className="flex flex-col m-1 h-100 flex-grow">
        {MENU_ITEMS.map((i) => (
          <MenuItem active={router.pathname === i.href} {...i} key={i.name} />
        ))}
      </div>

      <SideNavFooter />
    </nav>
  );
}

function MenuItem({ name, active, href, icon = null, className = null }) {
  const Icon = icon;

  return (
    <Link href={href} passHref>
      <a
        className={classNames(
          "py-2 px-3 rounded-lg text-lg font-semibold mb-1 cursor-pointer flex items-center",
          className,
          {
            "bg-gray-100 dark:bg-gray-900 text-black dark:text-white": active,
            "text-gray-700 dark:text-gray-400": !active,
          }
        )}
      >
        <span
          className={classNames({
            "text-gray-400 dark:text-gray-600": !active,
            "text-gray-900 dark:text-gray-50": active,
          })}
        >
          {icon ? <Icon /> : <div className="w-8" />}
        </span>
        <span className="ml-3">{name}</span>
      </a>
    </Link>
  );
}
