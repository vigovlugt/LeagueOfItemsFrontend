import Logo from "../Logo";
import SideNavigation from "../SideNavigation";
import NavBar from "../NavBar";

export default function Layout({ children, pageName, pageContainer }) {
  return (
    <div className="font-sans w-screen">
      <div className="h-screen flex flex-col justify-center items-center lg:hidden text-xl p-4 text-center">
        <Logo />
        League of items currently doesn't support mobile, please try it on
        desktop!
      </div>
      <div className="hidden lg:flex flex-row">
        <SideNavigation />
        <div
          className="flex flex-col h-screen bg-gray-100 dark:bg-darker"
          style={{ width: "calc(100% - 320px)" }}
        >
          <NavBar title={pageName || ""} />
          <div
            ref={pageContainer}
            className="p-8 text-gray-900 overflow-y-auto h-full dark:text-white"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
