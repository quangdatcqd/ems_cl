import axiosClient from "./axiosClient"

export interface SignInWithPasswordParams {
    username: string;
    password: string;
  }
const AdminRoute = "admin/auth/";
const ClientRoute = "client/auth/";


class AdminAuthService { 


    async signInWithPassword(params: object)  { 
    
        return axiosClient.post(AdminRoute + "login",params)
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
        
        return axiosClient.post(AdminRoute + "logout",params)
        .then((res: any) => { 
            return res.data;
        }).catch((error: any) => { 
            return error.response.data
        });
    }
    async updatePassword(params:any) {
        
        return axiosClient.put(AdminRoute + "change-password",params)
        .then((res: any) => { 
            return res.data;
        }).catch((error: any) => { 
            return error.response.data
        });
    }

    signUp(formData: object) {
        return axiosClient.post(AdminRoute + "register", formData)
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

export default new AdminAuthService();