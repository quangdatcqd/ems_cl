import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

interface AuthProps {
  accessToken: string;
  accessTokenExpiresIn: string;
  userInfo: {
    id: string;
    name: string;
    status: string;
    changePasswordRequired: boolean;
  }
}


interface AuthContextProps {
  auth: AuthProps | null;
  setAuth: React.Dispatch<React.SetStateAction<AuthProps | null>>;
}

const AuthContext = createContext<AuthContextProps>({
  auth: null,
  setAuth: () => { },
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthProps | null>(() => JSON.parse(localStorage.getItem("auth") || "null"));

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