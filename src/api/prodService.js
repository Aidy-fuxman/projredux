import axios from 'axios';
const baseUrl = "https://yochi-aidy-nodeproject.onrender.com/api/Product";
 export const getAllProduct=(pageNum)=>{
    return axios.get(baseUrl+"?page="+pageNum+"&limit=2");
 }
 export const getTotalPages=()=>{
    return axios.get(baseUrl+"?limit=2");
 }
 export const deleteProductById = (id,token) => {
   return axios.delete(`${baseUrl}/${id}`,{
      headers:{
         tkn:token
      }
   });
}
export const updateProduct = (id,token) => {
   return axios.put(`${baseUrl}/${id}`,{
      headers:{
         tkn:token
      }
   });
}

 export const addProduct=(prod,token)=>{
   return axios.post(baseUrl,prod,{
      headers:{
         tkn:token
      }
   });
}