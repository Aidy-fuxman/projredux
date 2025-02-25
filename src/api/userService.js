import axios from "axios"
const baseUrl = "https://yochi-aidy-nodeproject.onrender.com/api/user";

export function addUser_singUp(user) {
    return axios.post(`${baseUrl}`, user);
}
export function getUserNamePassword_login({ userName, password }) {
    return axios.post(`${baseUrl}/login`, { userName, password });
}