import authHeader from "../authHeader";
import axiosClient from "../axiosClient"

export interface SignInWithPasswordParams {
    username: string;
    password: string;
  }
const AdminRoute = "admin/admin-users";  

class UserManagerService { 


    async getAllAdminUsers(params: object)  { 
        let  dat = JSON.stringify(params);
        dat = "";
        return axiosClient.get(AdminRoute+dat, {
            headers:authHeader()
        } )
        .then((res: any) => { 
            return res.data;
        }).catch((error: any) => { 
            return error.response.data
        });

    }  
    async createAdminUser(formData: object) {
        return axiosClient.post(AdminRoute, formData,{headers:authHeader()})
        .then((res: any) => {
            return res.data;
        }).catch((error: any) => {
            return error.response.data
        });
    }

    async modifyAdminUser(formData: object) {  
        return axiosClient.put(AdminRoute, formData,{headers:authHeader()})
        .then((res: any) => {
            return res.data;
        }).catch((error: any) => {
            return error.response.data
        });
    }

    async removeAdminUser(id: string) {  
        return axiosClient.delete(AdminRoute+`/${id}`,{headers:authHeader()})
        .then((res: any) => {
            return res.data;
        }).catch((error: any) => {
            return error.response.data
        });
    }
}

export default new UserManagerService();