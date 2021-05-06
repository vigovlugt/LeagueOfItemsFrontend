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
];

export default function UggButton({ champion }) {
  const name = champion.name.toLowerCase().replace(/[^\w]/g, "");

  return (
    <div className="flex bg-ugg-dark rounded-md px-3 py-2 text-white shadow focus:outline-none dark:bg-ugg">
      <a href={`${UGG_BASE_URL}/lol/champions/${name}/build`} target="_blank">
        <UggLogoIcon />
      </a>
      <Menu as="div" className="relative flex items-center ml-3">
        <Menu.Button>
          <ChevronDownIcon className="w-6 h-6" />
        </Menu.Button>
        <Menu.Items className="flex flex-col align-center absolute -right-3 w-48 top-9 origin-top-right rounded-md shadow-lg bg-ugg-dark py-2 z-10 dark:bg-ugg">
          {MENU_ITEMS.map((i) => (
            <Menu.Item key={i.title}>
              {({ active }) => (
                <a
                  href={i.link(name)}
                  className={`py-1 px-3 ${active && "bg-ugg dark:bg-ugg-dark"}`}
                  target="_blank"
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
