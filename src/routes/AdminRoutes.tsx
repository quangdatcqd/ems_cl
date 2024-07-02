
import GenericNotFound from "../components/GenericNotFound";
import Overview from "../pages/dashboard/Admin/Overview";
import { pathAdmin, paths } from "../paths";
import Profile from "../pages/dashboard/Admin/Profile";
import Settings from "../pages/dashboard/Admin/Settings";
import AdminAccountManager from "../pages/dashboard/Admin/AdminAccountManager";
import ClientAccountManager from "../pages/dashboard/Admin/ClientAccountManager";
import EventManager from "../pages/dashboard/Admin/EventManager";
import RenderSection from "../pages/website/RenderSection";
import SetupSite from "../pages/website/SetupSite";
import { WebRender } from "../pages/website/RenderWebSite";
import { useAuth } from "../provider/authProvider";
import { Navigate, Outlet } from "react-router-dom";
import AdminLayout from "../layouts/Admin/AdminLayout";
import { AdminSignIn } from "../pages/auth/Admin/AdminSignIn";
import { AdminAuthLayout } from "../layouts/Admin/AdminAuthLayout";
import { ResetPassword } from "../pages/auth/Admin/ResetPassword";
import { ChangeResetPassword } from "../pages/auth/Admin/ChangeResetPassword";
import EventFoodRegistration from "../pages/dashboard/Admin/EventFoodRegistration";

const AdminProtectedRoute = () => {
    const { auth } = useAuth();
    // Check if the user is authenticated
    if (auth?.userInfo?.type !== "Admin") return <Navigate to={paths.admin.auth.signIn} />;
    else return <AdminLayout><Outlet /></AdminLayout>;
};

const routesForPublicAdmin = [
    {
        path: "*",
        element: <GenericNotFound />,
    }, 
];

// Define routes accessible only to authenticated users
const routesForAdminAuthenticatedOnly = [
     
    {
        path: pathAdmin,
        element: <AdminProtectedRoute />, // Wrap the component in AdminProtectedRoute
        children: [

            {
                path: paths.admin.dashboard.adminAccountManager,
                element: <AdminAccountManager />
            },
            {
                path: paths.admin.dashboard.clientAccountManager,
                element: <ClientAccountManager />
            },
            {
                path: paths.admin.dashboard.eventManager,
                element: <EventManager />
            },
            {
                path: paths.admin.dashboard.eventFoodRegis,
                element: <EventFoodRegistration />
            },
            {
                path: paths.admin.dashboard.overview,
                element: <Overview />,
            },
           
            {
                path: paths.admin.dashboard.account,
                element: <Profile />,
            },
            {
                path: paths.admin.dashboard.settings,
                element: <Settings />
            },
        ],
    },
    {
        path: paths.admin.website.setupRouter,
        element: <SetupSite />,
    },
    {
        path: paths.admin.sections.sectionRouter,
        element: <RenderSection />
    },
    
    {
        path: paths.admin.website.viewTemplateRouter,
        element: <WebRender />
    },
];
const routesForAdminAuthentication = [
    {
        path: pathAdmin,
        element: <AdminAuthLayout><Outlet /></AdminAuthLayout>,
        children: [
            {
                path: paths.admin.auth.resetPassword,
                element: <ResetPassword />,
            },
            {
                path: paths.admin.auth.changePassword,
                element: <ChangeResetPassword />,
            },
            {
                path: paths.admin.auth.signIn,
                element: <AdminSignIn />,
            }
            ,
            {
                path:pathAdmin,
                element: <AdminSignIn />,
            }
        ]
    }
]
 
export const AdminRoutes = () => { 
    return [
        // ...(!auth ? routesForNotAuthenticatedOnly : []),
        ...routesForAdminAuthenticatedOnly,
        ...routesForPublicAdmin,
        ...routesForAdminAuthentication,
    ]
}
