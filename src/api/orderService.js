import axios from "axios"
const baseUrl = "https://yochi-aidy-nodeproject.onrender.com/api/user";

export function saveOrder(order) {
    return axios.post(`${baseUrl}`, order);
}

