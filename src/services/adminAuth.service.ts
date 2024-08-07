import authHeader from "./authHeader";
import axiosClient from "./axiosClient"

export interface SignInWithPasswordParams {
    username: string;
    password: string;
}
const AdminRoute = "admin/auth/";
// const ClientRoute = "client/auth/";


class AdminAuthService {


    async signInWithPassword(params: object) {

        return axiosClient.post(AdminRoute + "login", params)
            .then((res: any) => {
                if (res.data.accessToken) {
                    localStorage.setItem("userInfo", JSON.stringify(res.data));
                }
                return res.data;
            }).catch((error: any) => {
                return error
            });

    }

    async signOut() { 
        return axiosClient.post(AdminRoute + "logout", {}, {
            headers: authHeader()
        })
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error 
            });
    }
    async updatePassword(params: any) {

        return axiosClient.put(AdminRoute + "change-password", params)
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error 
            });
    }

    async resetPassword(formData: object) {
        return axiosClient.post(AdminRoute + "forgot-password/send", formData)
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error 
            });
    }
    async changeResetPassword(formData: object) {
        return axiosClient.post(
            AdminRoute + "forgot-password/reset",
            formData,
            { headers: authHeader() })
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error 
            });
    }
    async signUp(formData: object) {
        return axiosClient.post(AdminRoute + "register", formData)
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error 
            });
    }

    async refreshToken() {
        return axiosClient.post(AdminRoute + "refresh")
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error 
            });
    }

}

export default new AdminAuthService();