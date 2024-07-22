import authHeader from "../authHeader";
import axiosClient from "../axiosClient"

const AdminRoute = "admin/event-foods";

class FoodService {
    async getAllFood(eventId: string, userId?: string) {
        let URL = AdminRoute + `/${eventId}`;;
        if (!userId) URL = AdminRoute + `/${eventId}/public`;
        return axiosClient.get(URL, {
            headers: authHeader()
        }).then((res: any) => {
            return res.data;
        }).catch((error: any) => {
            return error
        });

    }

    // async getPublicFood(eventId: string) {
    //     return axiosClient.get(AdminRoute + `/${eventId}/public`, {
    //         headers: authHeader()
    //     }).then((res: any) => {
    //         return res.data;
    //     }).catch((error: any) => {
    //         return error
    //     });

    // }
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
                return error
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
                return error
            });
    }

    async removeFood(id: string) {
        return axiosClient.delete(AdminRoute + `/${id}`, { headers: authHeader() })
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error
            });
    }
}

export default new FoodService();