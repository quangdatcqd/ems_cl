export interface EventDataType { 
  _id: string;
  name: string,
  startTime: string,
  endTime: string,
  location: string ,
  useFood: boolean
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


