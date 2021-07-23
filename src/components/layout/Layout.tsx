import Logo from "../Logo";
import SideNavigation from "./SideNavigation";
import NavBar from "../NavBar";
import { useState } from "react";

export default function Layout({ children, pageName, pageContainer }) {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  return (
    <div className="font-sans w-screen">
      <div className="flex flex-row w-full">
        <SideNavigation
          open={sideNavOpen}
          onClickClose={() => setSideNavOpen(false)}
        />
        <div className="flex flex-col h-screen bg-gray-100 dark:bg-darker flex-shrink flex-grow min-w-0">
          <NavBar
            title={pageName || ""}
            onClickMenu={() => setSideNavOpen(true)}
          />
          <div
            ref={pageContainer}
            className="p-4 lg:p-8 text-gray-900 overflow-y-auto h-full dark:text-white"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
