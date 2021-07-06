import axios from "axios";

export default class UserService{
    getUsers(){
        return axios.get("http://localhost:8082/api/users/getUsers")
    }
    getActiveUsers(){
        return axios.get("http://localhost:8082/api/users/activeUsers")
    }

    addUser(values){
        return axios.post("http://localhost:8082/api/users/addUser", values)
    }

    
    deleteUser(id){
        return axios.put("http://localhost:8082/api/users/deleteUser?id="+id)
    }
    signIn(password, userName){
        return axios.get("http://localhost:8082/api/users/signIn?password="+password+"&userName="+userName)
    }

    activateUser(id){
        return axios.put("http://localhost:8082/api/users/activateUser?id="+id)
    }

    getUserById(id){
        return axios.get("http://localhost:8082/api/users/getUser?id="+id)
    }
    updateUser(id, values){
        return axios.put("http://localhost:8082/api/users/updateUser?id="+id, values)
    }
}