import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider"; 
import AdminLayout from "../layouts/Admin/AdminLayout";
import { paths } from "../paths";


export const ProtectedRoute = () => {
    const { auth } = useAuth(); 
    
    // Check if the user is authenticated
    if (!auth)  return <Navigate to={paths.admin.signIn} />;
    else return <AdminLayout><Outlet/></AdminLayout> ;
  };