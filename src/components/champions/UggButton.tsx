import UggLogoIcon from "../icons/UggLogoIcon";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

const UGG_BASE_URL = "https://u.gg";

const MENU_ITEMS = [
    {
        title: "Champion",
        link: (name) => `${UGG_BASE_URL}/lol/champions/${name}/build`,
    },
    {
        title: "Items",
        link: (name) => `${UGG_BASE_URL}/lol/champions/${name}/items`,
    },
    {
        title: "Runes",
        link: (name) => `${UGG_BASE_URL}/lol/champions/${name}/runes-table`,
    },
    {
        title: "Build Paths",
        link: (name) => `${UGG_BASE_URL}/lol/champions/${name}/item-paths`,
    },
];

export default function UggButton({ name }) {
    name = name.toLowerCase().replace(/[^\w]/g, "");

    return (
        <div className="hidden rounded-md bg-ugg-dark px-3 py-2 text-white shadow focus:outline-none dark:bg-ugg lg:flex">
            <a
                href={`${UGG_BASE_URL}/lol/champions/${name}/build`}
                target="_blank"
                rel="noreferrer"
            >
                <UggLogoIcon />
            </a>
            <Menu as="div" className="relative ml-3 flex items-center">
                <Menu.Button>
                    <ChevronDownIcon className="h-6 w-6" />
                </Menu.Button>
                <Menu.Items className="align-center absolute -right-3 top-9 z-10 flex w-48 origin-top-right flex-col rounded-md bg-ugg-dark py-2 shadow-lg dark:bg-ugg">
                    {MENU_ITEMS.map((i) => (
                        <Menu.Item key={i.title}>
                            {({ active }) => (
                                <a
                                    href={i.link(name)}
                                    className={`py-1 px-3 ${
                                        active && "bg-ugg dark:bg-ugg-dark"
                                    }`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {i.title}
                                </a>
                            )}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Menu>
        </div>
    );
}
