import { useRoutes } from "react-router-dom";
import { routers } from "./routers";
import { Suspense } from "react";
import Loading from "./components/Loading";
function App() {
  const element = useRoutes(routers);

  return (
    <Suspense
      fallback={
        <div className="loading-spin">
          <Loading />
        </div>
      }
    >
      {element}
    </Suspense>
  );
}

export default App;
