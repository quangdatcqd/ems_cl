import { RouterProvider, createBrowserRouter } from "react-router-dom"; 
import { AdminRoutes } from "./AdminRoutes";
import { ClientRoutes } from "./ClientRoutes"; 

const Routes = () => {   
  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([...AdminRoutes(),...ClientRoutes()]);
  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;