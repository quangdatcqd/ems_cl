import {   useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { AuthContext } from "../context/authContext";
import { getCurrentUser  } from "../helpers/common.helper";
 

interface AuthProps {
  accessToken: string;
  accessTokenExpiresAt: number;
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
  const [auth, setAuth] = useState<AuthProps | null>(getCurrentUser());
  
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