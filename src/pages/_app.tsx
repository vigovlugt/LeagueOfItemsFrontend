import "tailwindcss/tailwind.css";
import "../styles/global.css";
import SideNavigation from "../components/SideNavigation";
import NavBar from "../components/NavBar";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

function App({ Component, pageProps }) {
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
    <div className="flex flex-row font-sans w-screen">
      <Head>
        <title>League of Items</title>
      </Head>

      <SideNavigation />
      <div
        className="bg-gray-100 flex flex-col h-screen "
        style={{ width: "calc(100% - 320px)" }}
      >
        <NavBar title={pageName} />
        <div ref={pageContainer} className="p-8 text-gray-900 overflow-y-auto">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}

export default App;
