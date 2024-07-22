import { paths } from "../../paths";
import authHeader from "../authHeader";
import axiosClient from "../axiosClient"
import { saveAs } from 'file-saver';
export interface SignInWithPasswordParams {
    username: string;
    password: string;
}
const AdminRoute = "admin/events";

class EventService {
    async QRDownload(url:string) {
        try {
            const response = await axiosClient.get(paths.imagePath + `qr-code/${encodeURIComponent(url)}`, {
                responseType: 'blob',
            });
            saveAs(response.data, 'qr-code.png');
        } catch (error) {
            console.error('Error downloading QR code:', error);
        }
    };

    async getAllEvents(param: object) {
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
    async getEventByID(id?: string, clientRequest: boolean = false) {
        let URL = AdminRoute + `/${id}`;
        if (clientRequest) URL = AdminRoute + `/${id}/public`;
        return axiosClient.get(URL, {
            headers: authHeader()
        })
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error
            });

    }

    async createEvent(formData: object) {
        return axiosClient.post(AdminRoute, formData, { headers: authHeader() })
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error
            });
    }

    async modifyEvent(formData: object) {
        return axiosClient.put(AdminRoute, formData, { headers: authHeader() })
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error
            });
    }

    async removeEvent(id: string) {
        return axiosClient.delete(AdminRoute + `/${id}`, { headers: authHeader() })
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error
            });
    }

    async getWebConfigEvent(id?: string) {
        return axiosClient.get(AdminRoute + `/webconfig/${id}`, {
            headers: authHeader()
        })
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error
            });
    }
}

export default new EventService();