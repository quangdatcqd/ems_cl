import {   useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { AuthContext } from "../context/authContext";

interface AuthProps {
  accessToken: string;
  accessTokenExpiresIn: string;
  userInfo: {
    id: string;
    name: string;
    status: string;
    changePasswordRequired: boolean;
    type:string,
    phoneNumber:string,
  }
}




const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthProps | null>(() => JSON.parse(localStorage.getItem("auth") || "{}"));

  useEffect(() => {
    if (auth) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  const contextValue = useMemo(() => ({ auth, setAuth }), [auth]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;