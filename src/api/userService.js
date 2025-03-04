import axios from "axios"
const baseUrl = "https://yochi-aidy-nodeproject.onrender.com/api/user";

export function addUser_singUp(user,token) {
    return axios.post(`${baseUrl}`, user,{
        headers:{
            tkn:token
         }
    });
}
export function getUserNamePassword_login({ userName, password,token }) {
    return axios.post(`${baseUrl}/login`, { userName, password },{
        headers:{
            tkn:token
         }
    });
}