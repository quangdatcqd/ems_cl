import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";
import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";


const creatorOptions = {
    // showLogicTab: true,
    // questionTypes: ["text", "checkbox", "radiogroup", "dropdown" ],
    isAutoSave: true,
    showJSONEditorTab: false,
    // showLogicTab: false,
    // showPreviewTab: true,
    // showTitle: true,
    // showQuestionNumbers: "on",
    // showOptionsCaption: true,
    // showOptionsCaptionOnSelect: true,
    // showDesignerTab: false

};
export default function SurveyCreatorWidget() {
    const creator = new SurveyCreator(creatorOptions);
   
  

    return (<SurveyCreatorComponent creator={creator}   />)
  
}