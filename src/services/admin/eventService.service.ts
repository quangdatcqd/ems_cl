import authHeader from "../authHeader";
import axiosClient from "../axiosClient"

export interface SignInWithPasswordParams {
    username: string;
    password: string;
}
const AdminRoute = "admin/events";

class EventService {


    async getAllEvents(param: object) { 
        return axiosClient.get(AdminRoute, {
            headers: authHeader(),
            params: param
        })
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error.response.data
            });

    }
    async getEventByID(id?: string, clientRequest: boolean = false) { 
        let URL = AdminRoute + `/${id}`;
        if (clientRequest) URL = AdminRoute + `/${id}/public`; 
        return axiosClient.get(URL, {
            headers: authHeader() })
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error.response.data
            });

    }
 
    async createEvent(formData: object) {
        return axiosClient.post(AdminRoute, formData, { headers: authHeader() })
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error.response.data
            });
    }

    async modifyEvent(formData: object) {
        return axiosClient.put(AdminRoute, formData, { headers: authHeader() })
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error.response.data
            });
    }

    async removeEvent(id: string) {
        return axiosClient.delete(AdminRoute + `/${id}`, { headers: authHeader() })
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error.response.data
            });
    }

    async getWebConfigEvent(id?: string) {
        return axiosClient.get(AdminRoute+`/webconfig/${id}`, {
            headers: authHeader() })
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error.response.data
            });
    }
}

export default new EventService();