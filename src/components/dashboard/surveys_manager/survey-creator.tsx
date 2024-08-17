import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";

const creatorOptions = {
    // showLogicTab: true,
    questionTypes: ["text", "checkbox", "radiogroup", "dropdown", "yesno"],
    isAutoSave: true,
    showJSONEditorTab: false,
    showLogicTab: false,


};
export default function SurveyCreatorWidget({ survey }: any) {
    const creator = new SurveyCreator(creatorOptions);
    if (survey) creator.JSON = JSON.parse(survey || "{}");
    else if (survey === false) localStorage.setItem("survey-json", "{}");
    else creator.JSON = JSON.parse(localStorage.getItem("survey-json") || "{}");

    creator.saveSurveyFunc = (saveNo: any, callback: any) => {
        localStorage.setItem("survey-json", creator.text);
        callback(saveNo, true);
    };

    return (<SurveyCreatorComponent creator={creator} />)
}