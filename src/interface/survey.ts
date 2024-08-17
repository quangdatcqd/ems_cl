 
export interface SurveyDataType {
  _id: string;  
  title: string;
  surveyConfig: string;
  surveyResultConfig: string;
  userCreated: string;
  updatedAt: Date;
  createdAt: Date;
  status: string;

}

export interface SurveyResponseType {
  data:SurveyDataType [];
  metadata: {
    count: number,
    page: number,
    last: number,
    limit: number,
    sort: {
      createdAt: string
    }
  }

}