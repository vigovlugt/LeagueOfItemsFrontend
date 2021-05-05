import SideNavigation from "../components/SideNavigation";
import NavBar from "../components/NavBar";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";

import "../styles/global.css";
import Logo from "../components/Logo";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const pageContainer = useRef();

  useEffect(() => {
    const handleRouteChangeComplete = () => {
      // @ts-ignore
      pageContainer.current.scrollTo(0, 0);
    };

    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () =>
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
  }, []);

  const pageName =
    typeof Component.pageName === "function"
      ? Component.pageName(pageProps)
      : Component.pageName;

  return (
    <div className="font-sans w-screen">
      <DefaultSeo
        title="League of Items"
        titleTemplate="League of Items - %s"
        description="League of Items analyses U.GG data to provide you with an overview of all League of Legends Items and Runes."
      />

      <div className="h-screen flex flex-col justify-center items-center lg:hidden text-xl p-4 text-center">
        <Logo />
        League of items currently doesn't support mobile, please try it on
        desktop!
      </div>
      <div className="hidden lg:flex flex-row">
        <SideNavigation />
        <div
          className="bg-gray-100 flex flex-col h-screen"
          style={{ width: "calc(100% - 320px)" }}
        >
          <NavBar title={pageName} />
          <div
            ref={pageContainer}
            className="p-8 text-gray-900 overflow-y-auto h-full"
          >
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </div>
  );
}
