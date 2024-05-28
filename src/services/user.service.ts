import axios from "axios";
import authHeader from "./authHeader";

 
class UserService  {
    private Client: any;

    constructor() {
        this.Client = axios.create({ baseURL: "http://localhost:3000/admin/admin-user/" })
        // this.Client = axios.create({ baseURL: import.meta.env.VITE_SERVER_URL +"http://localhost:3000/admin/admin-user/" })
    }

    getAllUsers(){
        return this.Client.get("",{
            headers:authHeader()
        })
    }
}

export default new UserService();