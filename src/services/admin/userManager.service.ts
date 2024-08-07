import authHeader from "../authHeader";
import axiosClient from "../axiosClient"

export interface SignInWithPasswordParams {
    username: string;
    password: string;
}
const AdminRoute = "admin/admin-users";

class UserManagerService {


    async getAllAdminUsers(param: object) {
        return axiosClient.get(AdminRoute, {
            headers: authHeader(),
            params: param
        })
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error
            });

    }
    async createAdminUser(formData: object) {
        return axiosClient.post(AdminRoute, formData, { headers: authHeader() })
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error
            });
    }

    async modifyAdminUser(formData: any) { 
        return axiosClient.put(AdminRoute, formData, { headers: authHeader() })
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error
            });
    }

    async removeAdminUser(id: string) {
        return axiosClient.delete(AdminRoute + `/${id}`, { headers: authHeader() })
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error
            });
    }
}

export default new UserManagerService();