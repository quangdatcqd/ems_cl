import authHeader from "../authHeader";
import axiosClient from "../axiosClient"

const AdminRoute = "admin/event-food-regis";

class EventFoodRegisService {
    async getAllFoodRes(sort: any) {
        return axiosClient.get(AdminRoute, {
            headers: authHeader(),
            params: sort
        }).then((res: any) => {
            return res.data;
        }).catch((error: any) => {
            return error.response.data
        });

    }

    async getEventFoodRegis(eventId?: string) {
        return axiosClient.get(AdminRoute + `/${eventId}/public`, {
            headers: authHeader()
        }).then((res: any) => {
            return res.data;
        }).catch((error: any) => {
            return error.response.data
        });

    }
    async createEventFoodRegis(formData: object) { 
        return axiosClient.post(AdminRoute, formData,  {
            headers: authHeader()
        })
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error.response.data
            });
    }

    async modifyFood(formData: object) {
        return axiosClient.put(AdminRoute, formData, {
            headers: {
                ...authHeader(),
                "Content-Type": "multipart/form-data"
            }
        })
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error.response.data
            });
    }

    async removeFood(id: string) {
        return axiosClient.delete(AdminRoute + `/${id}`, { headers: authHeader() })
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error.response.data
            });
    }
}

export default new EventFoodRegisService();