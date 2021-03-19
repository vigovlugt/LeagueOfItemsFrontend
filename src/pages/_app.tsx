import "tailwindcss/tailwind.css";
import "../styles/global.css";
import SideNavigation from "../components/SideNavigation";
import NavBar from "../components/NavBar";

function App({ Component, pageProps }) {
  return (
    <div className="flex flex-row font-sans">
      <SideNavigation />
      <div className="bg-gray-100 w-full flex flex-col h-screen">
        <NavBar title={Component.pageName} />
        <div className="p-8 text-gray-900 overflow-y-auto">
            <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}


export default App