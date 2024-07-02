import { createContext } from "react";
interface AuthProps {
    accessToken: string;
    accessTokenExpiresAt: number;
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
