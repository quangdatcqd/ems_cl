import authHeader from "../authHeader";
import axiosClient from "../axiosClient";
const ClientRoute = "client/event-participants";

class EventParticipantService {

    async getEventParticipant(eventId: string) {
        return   axiosClient.get(ClientRoute, {
            headers: authHeader(),
            params: { eventId }
        })  .then((res: any) => { 
            return res.data;
        }).catch((error: any) => { 
            return error.response.data
        });
    }

    async createEventParticipant(formData: object) {
        return axiosClient.post(ClientRoute,formData, {
            headers: authHeader(),
        }).then((res: any) => {
            return res.data;
        }).catch((error: any) => {
            return error.response.data
        });
    }
}

export default new EventParticipantService();