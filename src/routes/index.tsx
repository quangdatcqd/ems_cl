import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
import ResetPassword from "../pages/auth/Admin/ResetPassword";
import ChangeResetPassword from "../pages/auth/Admin/ChangeResetPassword";
import EventManager from "../pages/dashboard/Admin/EventManager";
import RenderSection from "../pages/website/RenderSection";
import SetupSite from "../pages/website/SetupSite";
import { WebRender } from "../pages/website/RenderWebSite";

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
      element: <GenericNotFound />,
    },
    {
      path: paths.admin.resetPassword,
      element: <ResetPassword />,
    },
    {
      path: paths.admin.changePassword,
      element: <ChangeResetPassword />,
    }, {
      path: paths.admin.signIn,
      element: <AdminLogin />,
    }
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: paths.home,
          element: <Overview />,
        },
        {
          path: paths.dashboard.overview,
          element: <Overview />,
        },
        {
          path: paths.dashboard.account,
          element: <Profile />,
        },
        {
          path: paths.dashboard.settings,
          element: <Settings />
        },
      ],
    },
  ];
  // Define routes accessible only to authenticated users
  const routesForCreateSiteAuthenticatedOnly = [
    {
      path: paths.website.setupRouter,
      element: <SetupSite />,
    },
    {
      path: paths.sections.sectionRouter,
      element: <RenderSection />
    },
    {
      path: paths.website.viewRouter,
      element: <WebRender />
    },
    {
      path: paths.website.viewTemplateRouter,
      element: <WebRender />
    }
  ];


  // Define routes accessible only to authenticated users
  const routesForAdminAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: paths.dashboard.accountManager,
          element: <AccountManager />
        },
        {
          path: paths.dashboard.eventManager,
          element: <EventManager />
        }
      ],
    },
  ];
  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: paths.admin.signUp,
      element: <AdminSignUp />
    }
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!auth ? routesForNotAuthenticatedOnly : []),
    ...(auth?.userInfo?.type === "Admin" ?
      [...routesForAdminAuthenticatedOnly, ...routesForCreateSiteAuthenticatedOnly]
      : []),
    ...routesForAuthenticatedOnly
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;