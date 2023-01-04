import Card from "./components/Card";
import GridCards from "./components/GridCards";
import Layout from "./components/Layout";
import { cardsData } from "./data/cardsData";
import { duplicateRegenerateSortArray } from "./utils/card-utils";

function App() {
  return (
    <Layout>
      <GridCards cards={cardsData} />
    </Layout>
  );
}

export default App;
