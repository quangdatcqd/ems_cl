export interface EventDataType { 
  _id: string;
  name: string,
  startTime: string,
  endTime: string,
  location: string ,
  useFood: boolean,
  allowWaitlist: boolean,
  typeCheckin: string,
  capacityLimit: number,
  registrationDeadline: string,
  allowMinAge: number,
  allowMaxAge: number,
  allowGender: string,
  participant_count: number,
  webConfig:string,
  languages: string

}
export interface EventResponseType {
  data:EventDataType [];
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


