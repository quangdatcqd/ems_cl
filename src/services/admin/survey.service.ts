import authHeader from "../authHeader";
import axiosClient from "../axiosClient"

const AdminRoute = "admin/surveys";

class SurveyService {

    async getSurvey( params:object) {
        let URL = AdminRoute ;;
        return axiosClient.get(URL, {
            headers: authHeader(),
            params: params
        }).then((res: any) => {
            return res.data;
        }).catch((error: any) => {
            return error
        });

    }



    async getSurveyById(surveyId: string) {
        let URL = AdminRoute + `/${surveyId}`;;
        return axiosClient.get(URL, {
            headers: authHeader()
        }).then((res: any) => {
            return res.data;
        }).catch((error: any) => {
            return error
        });

    }

    async getSurveyResults(surveyId: string) {
        let URL = AdminRoute + `/results/${surveyId}`;;
        return axiosClient.get(URL, {
            headers: authHeader()
        }).then((res: any) => {
            return res.data;
        }).catch((error: any) => {
            return error
        });

    }

    async getSurveyResult(surveyId: string) {
        let URL = AdminRoute + `/result/${surveyId}`;;
        return axiosClient.get(URL, {
            headers: authHeader()
        }).then((res: any) => {
            return res.data;
        }).catch((error: any) => {
            return error
        });

    }
 
    async createOrUpdateSurvey(formData: object) {
        return axiosClient.post(AdminRoute, formData, {
            headers: {
                ...authHeader()
            }
        })
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error
            });
    }

    async completeSurvey(formData: object) {
        return axiosClient.post(AdminRoute + "/complete", formData, {
            headers: {
                ...authHeader(),
            }
        })
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error
            });
    }

    async modifySurvey(formData: object) {
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



    async removeSurvey(id: string) {
        return axiosClient.delete(AdminRoute + `/${id}`, { headers: authHeader() })
            .then((res: any) => {
                return res.data;
            }).catch((error: any) => {
                return error
            });
    }

   


}

export default new SurveyService();