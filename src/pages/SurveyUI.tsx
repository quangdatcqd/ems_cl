import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { surveyJSON } from "./json.ts";



export default function SurveyUI() {
    const survey = new Model(surveyJSON);
    return (<Survey model={survey} />);
}
