import authHeader from "../authHeader";
import axiosClient from "../axiosClient"

const AdminRoute = "admin/event-foods";

class FoodService {
    async getAllFood(eventId: string) {
        return axiosClient.get(AdminRoute + `/${eventId}`, {
            headers: authHeader()
        }).then((res: any) => {
            return res.data;
        }).catch((error: any) => {
            return error.response.data
        });

    }

    async getPublicFood(eventId: string) {
        return axiosClient.get(AdminRoute + `/${eventId}/public`, {
            headers: authHeader()
        }).then((res: any) => {
            return res.data;
        }).catch((error: any) => {
            return error.response.data
        });

    }
    async createFood(formData: object) { 
        return axiosClient.post(AdminRoute, formData, {
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

export default new FoodService();