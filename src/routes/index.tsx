import {   RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";   
import AdminLogin from "../pages/auth/Admin/AdminSignIn";
import GenericNotFound from "../components/GenericNotFound"; 
import Overview from "../pages/dashboard/Admin/Overview";
import { paths } from "../paths";  
import Profile from "../pages/dashboard/Admin/Profile";
import Settings from "../pages/dashboard/Admin/Settings";
import AccountManager from "../pages/dashboard/Admin/AccountManager";
import AdminSignUp from "../pages/auth/Client/ClientSignUp";

const Routes = () => {
  const { auth } = useAuth(); 
  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/service",
      element: <div>Service Page</div>,
    },
    {
      path: "/about-us",
      element: <div>About Us</div>,
    },
    {
      path: "*",
      element:<GenericNotFound   />  ,
    },

  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: paths.home,
          element: <Overview/>,
        },
        {
          path: paths.dashboard.overview,
          element: <Overview/>,
        },
        {
          path: paths.dashboard.account,
          element: <Profile/>,
        } ,
        {
          path:paths.dashboard.settings,
          element:<Settings/>
        }
        ,
        {
          path:paths.dashboard.accountManager,
          element: <AccountManager/>
        }
      ],
    },
  ];
  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [ 
    {
      path: paths.admin.signUp,
      element: <AdminSignUp/>
    },
    {
      path: paths.admin.signIn,
      element: <AdminLogin/>,
    }, 
  ];
  

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!auth ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly 
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;