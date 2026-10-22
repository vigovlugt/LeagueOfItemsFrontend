import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import RuneIcon from "../icons/RuneIcon";
import SwordIcon from "../icons/SwordIcon";
import SideNavFooter from "./SideNavFooter";
import ChampionIcon from "../icons/ChampionIcon";
import RiftShowdownIcon from "../icons/RiftShowdownIcon";
import Logo from "../Logo";
import {
    MailIcon,
    QuestionMarkCircleIcon,
    XIcon,
    HomeIcon,
    ViewListIcon,
    BookOpenIcon,
    GlobeAltIcon,
} from "@heroicons/react/outline";
import SearchBar from "./SearchBar";
import { trackAdClick } from "../../lib/adTracking";

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
        name: "RiftShowdown",
        href: "https://riftshowdown.com/?utm_source=leagueofitems.com&utm_content=leagueofitems-nav&utm_term=leagueofitems.com",
        target: "_blank",
        icon: RiftShowdownIcon,
        className: "mt-auto",
        isNewUntil: new Date("2027-01-01"),
        adId: "riftshowdown",
    },
    {
        name: "DraftGap",
        href: "https://draftgap.com?utm_source=league-of-items-sidebar&utm_medium=link&utm_campaign=launch",
        target: "_blank",
        icon: () => <GlobeAltIcon className="w-7" />,
    },
    {
        name: "FAQ",
        href: "/faq",
        icon: () => <QuestionMarkCircleIcon className="w-7" />,
    },
    {
        name: "Contact",
        href: "mailto:vigovlugt+leagueofitems@gmail.com",
        icon: () => <MailIcon className="w-7" />,
    },
] as const;

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
    isNewUntil = null,
    adId = null,
    target = null,
}) {
    const Icon = icon;
    const isNew = isNewUntil && isNewUntil > new Date();
    const isAd = adId !== null;

    return (
        <Link prefetch={false}
            href={href}
            passHref
            target={target}
            rel={isAd ? "sponsored noopener" : undefined}
            className={classNames(
                "relative flex cursor-pointer items-center rounded-lg py-1.5 px-3 text-lg font-semibold",
                className,
                {
                    "bg-gray-100 text-black dark:bg-gray-800 dark:text-white":
                        active,
                    "text-gray-700 dark:text-gray-400": !active,
                }
            )}
            onClick={() => {
                if (isAd) trackAdClick(adId);
                onClick();
            }}
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

            {(isAd || isNew) && (
                <span className="ml-auto flex items-center gap-1.5 pl-2">
                    {isAd && (
                        <span className="inline-block rounded border border-gray-200 px-1 py-[3px] text-[10px] font-normal uppercase leading-none [text-box:trim-both_cap_alphabetic] text-gray-400 dark:border-gray-700 dark:text-gray-500">
                            Ad
                        </span>
                    )}
                    {isNew && (
                        <span className="inline-block rounded-md bg-red-700 px-2 py-1.5 text-xs font-medium leading-none text-white [text-box:trim-both_cap_alphabetic]">
                            NEW
                        </span>
                    )}
                </span>
            )}
        </Link>
    );
}
