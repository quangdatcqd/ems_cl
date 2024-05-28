import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import React from "react";
import clientAuthService from "../services/clientAuth.service";
import { paths } from "../paths";



function Home() {
    const { auth, setAuth } = useAuth(); 
    const router = useNavigate();
    const handleSignOut = React.useCallback(async (): Promise<void> => {
        try {
            const data = await clientAuthService.signOut(auth?.userInfo);
            if (data.statusCode = 201) {
                localStorage.removeItem("auth");
                setAuth(null);
                // UserProvider, for this case, will not refresh the router and we need to do it manually
                router(paths.client.auth.signIn);
            }
            // After refresh, AuthGuard will handle the redirect
        } catch (err) {
        }
    }, [router]);
    return (
        <div className="border p-5">
            {
                auth && (
                    <div>
                        <p className="text-sm">Client site</p>
                        <p className="text-orange-500 font-bold">{auth?.userInfo.name}</p>
                        <p className="underline text-blue-300" onClick={handleSignOut}>SignOut</p>
                    </div>
                )
            }

        </div>
    );
}

export default Home;