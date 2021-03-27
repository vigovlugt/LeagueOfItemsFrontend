import "tailwindcss/tailwind.css";
import "../styles/global.css";
import SideNavigation from "../components/SideNavigation";
import NavBar from "../components/NavBar";
import Head from "next/head";

function App({ Component, pageProps }) {
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
        <NavBar title={Component.pageName} />
        <div className="p-8 text-gray-900 overflow-y-auto">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}

export default App;
