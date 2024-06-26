 
export interface UserDataType {
  _id: string; 
  name: string;
  username: string;
  email: string; 
  phoneNumber: string;
  googleId:string,
  facebookId:string,
  type: string;
  createdAt: Date;
  status: string;

}

export interface UserResponseType {
  data:UserDataType [];
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