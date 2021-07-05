import axios from "axios";

export default class UserService{
    getUsers(){
        return axios.get("http://localhost:8081/api/users/getUsers")
    }

    addUser(values){
        return axios.post("http://localhost:8081/api/users/addUser", values)
    }

    addPicture(file, id){
        return axios.put("http://localhost:8081/addPicture/userId?id="+ id,file)
    }
}