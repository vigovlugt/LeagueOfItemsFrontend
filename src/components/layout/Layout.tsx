import Logo from "../Logo";
import SideNavigation from "./SideNavigation";
import NavBar from "../NavBar";
import { useState } from "react";

export default function Layout({
    children,
    pageName,
    pageContainer,
    favouriteType = null,
    favouriteId = null,
}) {
    const [sideNavOpen, setSideNavOpen] = useState(false);

    return (
        <div className="font-sans w-screen">
            <div className="flex w-screen flex-row">
                <SideNavigation
                    open={sideNavOpen}
                    onClickClose={() => setSideNavOpen(false)}
                />
                <div className="flex h-screen min-w-0 flex-shrink flex-grow flex-col bg-gray-100 dark:bg-darker">
                    <NavBar
                        title={pageName || ""}
                        favouriteType={favouriteType}
                        favouriteId={favouriteId}
                        onClickMenu={() => setSideNavOpen(true)}
                    />
                    <div
                        ref={pageContainer}
                        className="overflow-auto min-w-0 p-4 text-gray-900 dark:text-white lg:p-8"
                        style={{
                            height: "calc(100vh - 65px)",
                        }}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
