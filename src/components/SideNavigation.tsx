import classNames from "classnames";
import Link from "next/link";
import ListItem from "./icons/ListIcon";
import { useRouter } from "next/router";
import RuneIcon from "./icons/RuneIcon";
import SwordIcon from "./icons/SwordIcon";
import SideNavFooter from "./layout/SideNavFooter";
import ChampionIcon from "./icons/ChampionIcon";
import Logo from "./Logo";
import {
  MailIcon,
  MenuIcon,
  QuestionMarkCircleIcon,
  XIcon,
} from "@heroicons/react/outline";
import SearchBar from "./layout/SearchBar";

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

export default function SideNavigation({ open, onClickClose }) {
  const router = useRouter();

  return (
    <nav
      className={classNames(
        "h-screen p-4 z-10 border-r absolute inset-0 lg:w-80 lg:static lg:flex flex-col flex-shrink-0 flex-grow-0 border-gray-200 bg-white dark:bg-dark dark:border-gray-800",
        {
          flex: open,
          hidden: !open,
        }
      )}
    >
      <div className="flex justify-between items-start">
        <div className="w-0 lg:hidden">
          <button
            className="fixed flex items-center -m-3 p-3 focus:outline-none"
            onClick={onClickClose}
          >
            <XIcon className="w-8" />
          </button>
        </div>

        <Logo />
        <div className="w-0 lg:hidden mr-3" />
      </div>

      <div className="h-[40px] flex justify-center mb-4 lg:hidden flex-shrink-0">
        <SearchBar onSubmit={onClickClose} />
      </div>

      <div className="flex flex-col m-1 h-100 flex-grow">
        {MENU_ITEMS.map((i) => (
          <MenuItem
            active={router.pathname === i.href}
            {...i}
            key={i.name}
            onClick={onClickClose}
          />
        ))}
      </div>

      <SideNavFooter />
    </nav>
  );
}

function MenuItem({
  name,
  active,
  href,
  icon = null,
  className = null,
  onClick,
}) {
  const Icon = icon;

  return (
    <Link href={href} passHref>
      <a
        className={classNames(
          "py-2 px-3 rounded-lg text-lg font-semibold mb-1 cursor-pointer flex items-center",
          className,
          {
            "bg-gray-100 dark:bg-gray-800 text-black dark:text-white": active,
            "text-gray-700 dark:text-gray-400": !active,
          }
        )}
        onClick={onClick}
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
