import axios from 'axios';
const baseUrl = "https://yochi-aidy-nodeproject.onrender.com/api/Product";
 export const getAllProduct=(pageNum)=>{
    return axios.get(baseUrl+"?page="+pageNum+"&limit=2");
 }
 export const getTotalPages=()=>{
    return axios.get(baseUrl+"?limit=2");
 }
 export const addProduct=(prod)=>{
   return axios.post(baseUrl,prod);
}