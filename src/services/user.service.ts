import axios from "axios";
import authHeader from "./authHeader";

 
class UserService  {
    private Client: any;

    constructor() {
        this.Client = axios.create({ baseURL: "http://localhost:3001/admin/admin-user/" })
    }

    getAllUsers(){
        return this.Client.get("",{
            headers:authHeader()
        })
    }
}

export default new UserService();