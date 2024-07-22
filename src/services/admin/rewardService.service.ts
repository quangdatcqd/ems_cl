import authHeader from "../authHeader";
import axiosClient from "../axiosClient"

const AdminRoute = "admin/event-rewards";

class RewardService {
    async getAllReward(eventId: string, keyword?: string) {
        let URL = AdminRoute + `/${eventId}/${keyword}`;;
        // if (!userId) URL = AdminRoute + `/${eventId}/public`;
        return axiosClient.get(URL, {
            headers: authHeader() 
        }).then((res: any) => {
            return res.data;
        }).catch((error: any) => {
            return error
        });

    } 
    async createReward(formData: object) {
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

    async modifyReward(formData: object) {
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

    async removeReward(id: string) {
        return axiosClient.delete(AdminRoute + `/${id}`, { headers: authHeader() })
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error
            });
    }
}

export default new RewardService();