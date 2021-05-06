import SideNavigation from "../components/SideNavigation";
import NavBar from "../components/NavBar";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";

import "../styles/global.css";
import Logo from "../components/Logo";
import Layout from "../components/layout/Layout";

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
    <ThemeProvider attribute="class" defaultTheme="light">
      <DefaultSeo
        title="League of Items"
        titleTemplate="League of Items - %s"
        description="League of Items analyses U.GG data to provide you with an overview of all League of Legends Items and Runes."
      />
      <Layout pageName={pageName} pageContainer={pageContainer}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
