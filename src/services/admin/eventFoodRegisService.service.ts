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
    async getEventFoodRegis(eventId?: string, userId?: string) {
        let URL = AdminRoute + `/${eventId}`;
        if (userId) URL = AdminRoute + `/${eventId}/${userId}`;

        return axiosClient.get(URL, {
            headers: authHeader()
        }).then((res: any) => {
            return res.data;
        }).catch((error: any) => {
            return error.response.data
        });
    }
    async getPublicEventFoodRegis(eventId?: string) {
        return axiosClient.get(AdminRoute + `/${eventId}/public`, {
            headers: authHeader()
        }).then((res: any) => {
            return res.data;
        }).catch((error: any) => {
            return error.response.data
        });
    }
    async createEventFoodRegis(formData: any) {
        let URL = AdminRoute + `/public`;
        if (formData?.userId) URL = AdminRoute;
        return axiosClient.post(URL, formData, {
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