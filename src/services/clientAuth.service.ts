import axiosClient from "./axiosClient"

export interface SignInWithPasswordParams {
    username: string;
    password: string;
  } 
const ClientRoute = "client/auth/";


class ClientAuthService { 


    async signInWithPassword(params: object)  { 
    
        return axiosClient.post(ClientRoute + "login",params)
        .then((res: any) => {
            if (res.data.accessToken) {
                localStorage.setItem("userInfo", JSON.stringify(res.data));
            }
            return res.data;
        }).catch((error: any) => { 
            return error.response.data
        });

    }

    async signOut(params:any) {
        
        return axiosClient.post(ClientRoute + "logout",params)
        .then((res: any) => { 
            return res.data;
        }).catch((error: any) => { 
            return error.response.data
        });
    }

    signUp(formData: object) {
        return axiosClient.post(ClientRoute + "register", formData)
        .then((res: any) => {
            return res.data;
        }).catch((error: any) => {
            return error.response.data
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("userInfo") || "{}");
    }
}

export default new ClientAuthService();