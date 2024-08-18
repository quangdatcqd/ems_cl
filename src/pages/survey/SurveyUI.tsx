import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import toast from "react-hot-toast";
import surveyService from "../../services/admin/survey.service";
import { useAuth } from "../../provider/authProvider";
import { setRedirectUrl } from "../../helpers/common.helper";
import { paths } from "../../paths";



export default function SurveyUI() {
    const params = useParams();
    const survey = new Model();
    const { auth } = useAuth();
    if (!auth?.userInfo) {
        setRedirectUrl(import.meta.env.VITE_WEB_URL + paths.survey.surveyPath + params?.surveyId)
        return <Navigate to={paths.client.auth.signIn} />
    }
    // survey.showNavigationButtons = false;
    React.useEffect(() => {
        const fetchSurvey = async () => {
            if (!params?.surveyId) return;
            const surveyRs = await surveyService.getSurveyById(params?.surveyId);
            if (surveyRs?.data) {
                survey.fromJSON(JSON.parse(surveyRs?.data?.surveyConfig));
                survey.data = JSON.parse(surveyRs?.data?.surveyResult || "{}");
            }
            else toast.error(surveyRs?.message);
        }
        fetchSurvey();
    })

    const surveyComplete = React.useCallback(async (survey: any) => {
        const formData = {
            surveyId: params?.surveyId,
            surveyResult: JSON.stringify(survey.data)
        }
        const surveyRs = await surveyService.completeSurvey(formData);
        if (surveyRs?.data) toast.success("Completed successfully", { position: "top-center" });
        else toast.error(surveyRs?.message);
    }, []);

    // survey.mode = "display";
    survey.onComplete.add(surveyComplete);
    return (<Survey model={survey} />);
}
