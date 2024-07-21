
import ClientAuthLayout from "../layouts/Client/ClientAuthLayout";
import Home from "../pages/Home";
import { ChangeResetPassword } from "../pages/auth/Client/ChangeResetPassword";
import ClientSignIn from "../pages/auth/Client/ClientSignIn";
import ClientSignUp from "../pages/auth/Client/ClientSignUp";
import ResetPassword from "../pages/auth/Client/ResetPassword";
import Test from "../pages/dashboard/Admin/Test";
import EventRegistration from "../pages/event-registration/EventRegistration";
import { WebRender } from "../pages/website/RenderWebSite";
import {   pathClient, paths } from "../paths";
import { useAuth } from "../provider/authProvider";
import { Navigate, Outlet } from "react-router-dom";

const ClientProtectedRoute = () => {
    const { auth } = useAuth();
    // Check if the user is authenticated
    if (!auth) return <Navigate to={paths.client.auth.signIn} />;
    else return <Outlet />;
};

export const routesForPublicClient = [
    {
        path:"/test",
        element: <Test/>, 
    }
    ,
    {
        path: pathClient,
        element: <ClientAuthLayout><Outlet /></ClientAuthLayout>,
        children: [ 
            {
                path: paths.client.auth.signIn,
                element: <ClientSignIn />
            },
            {
                path: paths.client.auth.signInFBRouter,
                element: <ClientSignIn />
            },
            {
                path: paths.client.auth.signUp,
                element: <ClientSignUp />
            },
            {
                path: paths.client.auth.resetPassword,
                element: <ResetPassword />,
            },
            {
                path: paths.client.auth.changePassword,
                element: <ChangeResetPassword />,
            },
        ]
    },
    {
        path: paths.website.viewRouter,
        element: <WebRender />
    },
    {
        path: paths.website.joinEventRouter,
        element: <EventRegistration />
    },
   
];

// Define routes accessible only to authenticated users
export const routesForClientAuthenticatedOnly = [
    {
        path: "/",
        element: <ClientProtectedRoute />, // Wrap the component in AdminProtectedRoute
        children: [
            {
                path: "/",
                element: <Home />
            }
        ],
    }
];
export const ClientRoutes = () => { 
    return [...routesForPublicClient, ...routesForClientAuthenticatedOnly]
}