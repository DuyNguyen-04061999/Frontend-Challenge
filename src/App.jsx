import { useRoutes } from "react-router-dom";
import { routers } from "./routers";
import { Suspense } from "react";
import { Spin } from "antd";
function App() {
  const element = useRoutes(routers);
  return (
    <Suspense fallback={<Spin className="w-[500px] h-[500px]" />}>
      {element}
    </Suspense>
  );
}

export default App;
