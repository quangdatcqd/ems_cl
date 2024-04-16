import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const ClientLayout = lazy(() => import("../src/layouts/Client/ClientLayout"));
const AdminLayout = lazy(() => import("../src/layouts/Admin/AdminLayout"));

import Loading from "./components/Loading";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/*" element={<ClientLayout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </Suspense>
  );
}

export default App;
