import React from "react";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import surveyService from "../../../services/admin/survey.service";
import toast from "react-hot-toast";

const creatorOptions = {
    // showLogicTab: true,
    questionTypes: ["text", "checkbox", "radiogroup", "dropdown", "yesno"],
    isAutoSave: true,
    showJSONEditorTab: false,
    showLogicTab: false,


};
export default function SurveyCreatorWidget({ survey, idSurvey }: any) {
   
    const creator = new SurveyCreator(creatorOptions);
    React.useEffect(() => { 
        if (survey) creator.JSON = JSON.parse(survey || "{}"); 
        else if (survey === false) localStorage.setItem("survey-json", "{}");
        else creator.JSON = JSON.parse(localStorage.getItem("survey-json") || "{}");
        creator.saveSurveyFunc = (saveNo: any, callback: any) => {
            if (idSurvey) {
                handleUpdateSurvey(); 
            }
            localStorage.setItem("survey-json", creator.text);
            // setSurvey(creator.text);
            callback(saveNo, true);
        };

    }, [ survey,creator])
    const handleUpdateSurvey = async () => {
        const title = JSON.parse(creator.text)?.title || ""; 
        const surveyRs = await surveyService.createOrUpdateSurvey({
            surveyConfig: creator.text,
            title: title,
            _id: idSurvey
        })
        if (!surveyRs?.data) {
            toast.error(surveyRs?.message, { position: "top-center" })
            return;
        } 
    }

    return (<SurveyCreatorComponent creator={creator} />)
}