import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import RuneIcon from "../icons/RuneIcon";
import SwordIcon from "../icons/SwordIcon";
import SideNavFooter from "./SideNavFooter";
import ChampionIcon from "../icons/ChampionIcon";
import Logo from "../Logo";
import {
  MailIcon,
  QuestionMarkCircleIcon,
  XIcon,
  HomeIcon,
  ViewListIcon,
  BookOpenIcon,
} from "@heroicons/react/outline";
import SearchBar from "./SearchBar";

const MENU_ITEMS = [
  {
    name: "Home",
    href: "/",
    icon: () => <HomeIcon className="w-7" />,
  },
  {
    name: "Items",
    href: "/items",
    icon: SwordIcon,
  },
  {
    name: "Item Tierlist",
    href: "/tierlist",
    icon: () => <ViewListIcon className="w-7" />,
  },
  {
    name: "Runes",
    href: "/runes",
    icon: RuneIcon,
  },
  {
    name: "Rune Tierlist",
    href: "/runes/tierlist",
    icon: () => <ViewListIcon className="w-7" />,
  },
  {
    name: "Champions",
    href: "/champions",
    icon: ChampionIcon,
  },
  {
    name: "Champion Tierlist",
    href: "/champions/tierlist",
    icon: () => <ViewListIcon className="w-7" />,
  },
  {
    name: "Builds",
    href: "/builds",
    icon: () => <BookOpenIcon className="w-7" />,
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
        "absolute inset-0 z-10 h-screen flex-shrink-0 flex-grow-0 flex-col border-r border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-dark lg:static lg:flex lg:w-80",
        {
          flex: open,
          hidden: !open,
        }
      )}
    >
      <div className="flex items-start justify-between">
        <div className="w-0 lg:hidden">
          <button
            className="fixed -m-3 flex items-center p-3 focus:outline-none"
            onClick={onClickClose}
          >
            <XIcon className="w-8" />
          </button>
        </div>

        <Logo />
        <div className="mr-3 w-0 lg:hidden" />
      </div>

      <div className="mb-4 flex h-[40px] flex-shrink-0 justify-center lg:hidden">
        <SearchBar onSubmit={onClickClose} />
      </div>

      <div className="h-100 m-1 flex flex-grow flex-col">
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
          "mb-1 flex cursor-pointer items-center rounded-lg py-2 px-3 text-lg font-semibold",
          className,
          {
            "bg-gray-100 text-black dark:bg-gray-800 dark:text-white": active,
            "text-gray-700 dark:text-gray-400": !active,
          }
        )}
        onClick={onClick}
      >
        <span
          className={classNames({
            "text-gray-400 dark:text-gray-700": !active,
            "text-gray-700 dark:text-gray-400": active,
          })}
        >
          {icon ? <Icon className="w-8" /> : <div className="w-8" />}
        </span>
        <span className="ml-3">{name}</span>
      </a>
    </Link>
  );
}
