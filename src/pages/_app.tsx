import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";

import "../styles/global.css";
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

  const favouriteType = Component.favouriteType
    ? Component.favouriteType(pageProps)
    : null;
  const favouriteId = Component.favouriteId
    ? Component.favouriteId(pageProps)
    : null;

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <DefaultSeo
        titleTemplate="League of Items - %s"
        defaultTitle="League of Items"
        description="League of Items analyses U.GG data to provide you with an overview of the best League of Legends Items and Runes."
      />
      <Layout
        pageName={pageName}
        pageContainer={pageContainer}
        favouriteType={favouriteType}
        favouriteId={favouriteId}
      >
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
