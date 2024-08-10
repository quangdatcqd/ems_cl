import authHeader from "../authHeader";
import axiosClient from "../axiosClient";
const ClientRoute = "client/event-participants";

class EventParticipantService {

    async checkinByTicketCode(eventId: string, ticketCode: string) {
        return axiosClient.get(ClientRoute + `/checkin/${eventId}/${ticketCode}`, {
            headers: authHeader()
        }).then((res: any) => {
            return res.data;
        }).catch((error: any) => {
            return error
        });
    }

    async getUserParticipants(eventId: string) {
        return axiosClient.get(ClientRoute + `/${eventId}`, {
            headers: authHeader()
        }).then((res: any) => {
            return res.data;
        }).catch((error: any) => {
            return error
        });
    }

    async getUserHasNotReceivedReward(eventId: string) {
        return axiosClient.get(ClientRoute + `/get-user-not-reward/${eventId}`, {
            headers: authHeader()
        }).then((res: any) => {
            return res.data;
        }).catch((error: any) => {
            return error
        });
    }

    async findUserParticipant(eventId: string, keyword: string) {
        return axiosClient.get(ClientRoute + `/find-user/${eventId}/${keyword}`, {
            headers: authHeader()
        }).then((res: any) => {
            return res.data;
        }).catch((error: any) => {
            return error
        });
    }

    async checkEventParticipant(eventId: string) {
        return axiosClient.get(ClientRoute + `/check/${eventId}`, {
            headers: authHeader()
        }).then((res: any) => {
            return res.data;
        }).catch((error: any) => {
            return error
        });
    }

    async createEventParticipant(formData: object) {
        return axiosClient.post(ClientRoute, formData, {
            headers: authHeader(),
        }).then((res: any) => {
            return res.data;
        }).catch((error: any) => {
            return error
        });
    }

    async updateUserHasReceivedReward(participantId: string, rewardId: string) {
        return axiosClient.put(ClientRoute+`/update-user-reward`,
            {   participantId ,rewardId},
            {
                headers: authHeader(),
            }).then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error
            });
    }

    async randomAllReward(id: string) {
        return axiosClient.put(ClientRoute + `/random-all/${id}`,{}, { headers: authHeader() })
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error
            });
    }

    
    async getUserReward(id: string) {
        return axiosClient.get(ClientRoute + `/user-reward/${id}`,  { headers: authHeader() })
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error
            });
    }
}

export default new EventParticipantService();