import classNames from "classnames";
import Link from "next/link";
import ListItem from "./icons/ListIcon";
import GridIcon from "./icons/GridIcon";
import { useRouter } from "next/router";
import RuneIcon from "./icons/RuneIcon";
import SwordIcon from "./icons/SwordIcon";
import TableIcon from "./icons/TableIcon";
import SearchBar from "./layout/SearchBar";
import SideNavFooter from "./layout/SideNavFooter";
import ChampionIcon from "./icons/ChampionIcon";

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
];

export default function SideNavigation() {
  const router = useRouter();

  return (
    <nav className="h-screen w-80 p-4 z-10 border-r border-gray-200 flex flex-col flex-none">
      <Link href={"/"} passHref>
        <a>
          <h2 className="text-[1.65rem] font-header font-medium mb-8">
            LEAGUE OF
            <span className="block text-5xl">ITEMS</span>
          </h2>
        </a>
      </Link>

      <div className="m-1">
        {MENU_ITEMS.map((i) => (
          <MenuItem active={router.pathname === i.href} {...i} key={i.name} />
        ))}
      </div>

      <SideNavFooter />
    </nav>
  );
}

function MenuItem({ name, active, href, icon }) {
  const Icon = icon;

  return (
    <Link href={href} passHref>
      <a
        className={classNames(
          "py-2 px-3 rounded-lg text-gray-700 text-lg font-semibold mb-1 cursor-pointer flex items-center",
          {
            "bg-gray-100": active,
            "text-black": active,
          }
        )}
      >
        <span
          className={classNames({
            "text-gray-400": !active,
            "text-gray-600": active,
          })}
        >
          <Icon />
        </span>
        <span className="ml-3">{name}</span>
      </a>
    </Link>
  );
}
