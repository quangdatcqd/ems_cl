import React from "react";
import { useParams } from "react-router-dom";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui"; 
import toast from "react-hot-toast";
import surveyService from "../../services/admin/survey.service";



export default function SurveyResult() {
    const params = useParams();
    const survey = new Model();
    survey.showNavigationButtons = false;
    React.useEffect(() => {
        const fetchSurvey = async () => {
            if (!params?.surveyId) return; 
            const surveyRs = await surveyService.getSurveyResult(params?.surveyId);
            if (surveyRs?.data) {
                survey.fromJSON(JSON.parse(surveyRs?.data?.surveyConfig));
                survey.data = JSON.parse(surveyRs?.data?.surveyResult || "{}");
            }
            else toast.error(surveyRs?.message);
        }
        fetchSurvey();
    })
 

    survey.mode = "display"; 
    return (<Survey model={survey}   />);
}
