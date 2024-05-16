import { createContext } from "react";
interface AuthProps {
    accessToken: string;
    accessTokenExpiresIn: string;
    userInfo: {
        id: string;
        name: string;
        status: string;
        changePasswordRequired: boolean;
        type: string,
        phoneNumber: string,
    }
}

interface AuthContextProps {
    auth: AuthProps | null;
    setAuth: React.Dispatch<React.SetStateAction<AuthProps | null>>;
}

export const AuthContext = createContext<AuthContextProps>({
    auth: null,
    setAuth: () => { },
});
