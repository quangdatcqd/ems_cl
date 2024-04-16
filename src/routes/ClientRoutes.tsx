import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Loading from "../components/Loading";

const HomeLayout = lazy(() => import("../layouts/Client/HomeLayout"));
const GenericNotFound = lazy(() => import("../components/GenericNotFound"));

const ClientRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="*" element={<GenericNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default ClientRoutes;
