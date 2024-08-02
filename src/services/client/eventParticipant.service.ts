import authHeader from "../authHeader";
import axiosClient from "../axiosClient";
const ClientRoute = "client/event-participants";

class EventParticipantService {

    async checkinByTicketCode(eventId: string, ticketCode: string) {
        return   axiosClient.get(ClientRoute+`/checkin/${eventId}/${ticketCode}`, {
            headers: authHeader() 
        })  .then((res: any) => { 
            return res.data;
        }).catch((error: any) => { 
            return error
        });
    }

    async getUserParticipants(eventId: string) {
        return   axiosClient.get(ClientRoute+`/${eventId}`, {
            headers: authHeader() 
        })  .then((res: any) => { 
            return res.data;
        }).catch((error: any) => { 
            return error
        });
    }

    async findUserParticipant(eventId:string, keyword: string) {
        return   axiosClient.get(ClientRoute+`/find-user/${eventId}/${keyword}`, {
            headers: authHeader() 
        })  .then((res: any) => { 
            return res.data;
        }).catch((error: any) => { 
            return error
        });
    }

    async checkEventParticipant(eventId: string) {
        return   axiosClient.get(ClientRoute+`/check/${eventId}`, {
            headers: authHeader() 
        })  .then((res: any) => { 
            return res.data;
        }).catch((error: any) => { 
            return error
        });
    }

    async createEventParticipant(formData: object) {
        return axiosClient.post(ClientRoute,formData, {
            headers: authHeader(),
        }).then((res: any) => {
            return res.data;
        }).catch((error: any) => {
            return error
        });
    }
}

export default new EventParticipantService();