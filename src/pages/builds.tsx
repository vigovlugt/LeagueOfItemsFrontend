import ItemApi from "../api/ItemApi";
import MatchApi from "../api/MatchApi";
import PageViewApi from "../api/PageViewApi";
import BuildsApi from "../api/BuildsApi";
import Home from "./index";
import BuildsTable from "../components/home/BuildsTable";

export default function BuildsPage({ builds }) {
  return (
    <div>
      <BuildsTable builds={builds} type="full" />
    </div>
  );
}

export async function getStaticProps() {
  const builds = await BuildsApi.getByWinrate();

  return {
    props: {
      builds,
    },
  };
}

BuildsPage.pageName = "Builds";