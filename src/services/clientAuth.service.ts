import axiosClient from "./axiosClient"

export interface SignInWithPasswordParams {
    username: string;
    password: string;
}
const ClientRoute = "client/auth/";


class ClientAuthService {


    async signInWithPassword(params: object) {

        return axiosClient.post(ClientRoute + "login", params)
            .then((res: any) => {
                if (res.data.accessToken) {
                    localStorage.setItem("userInfo", JSON.stringify(res.data));
                }
                return res.data;
            }).catch((error: any) => {
                return error
            });

    }

    async signInWithGoogle(params:any) { 
        return axiosClient.get(ClientRoute + `google/login`,{
            params
        })
            .then((res: any) => {
                if (res.data.accessToken) {
                    localStorage.setItem("userInfo", JSON.stringify(res.data));
                }
                return res.data;
            }).catch((error: any) => {
                return error
            });

    }

    async signOut(params: any) {

        return axiosClient.post(ClientRoute + "logout", params)
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error
            });
    }

    signUp(formData: object) {
        return axiosClient.post(ClientRoute + "register", formData)
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error
            });
    }
    async resetPassword(formData: object) {
        return axiosClient.post(ClientRoute + "forgot-password/send", formData)
        .then((res: any) => {
            return res.data;
        }).catch((error: any) => {
            return error
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("userInfo") || "{}");
    }
}

export default new ClientAuthService();