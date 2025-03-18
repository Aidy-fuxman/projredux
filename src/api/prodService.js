import axios from 'axios';
const baseUrl = "https://yochi-aidy-nodeproject.onrender.com/api/Product";
export const getAllProduct = (pageNum) => {
   return axios.get(baseUrl + "/?page=" + pageNum + "&limit=9");
}
export const getTotalPages = () => {
   return axios.get(baseUrl + "/total/?limit=9");
}


export const deleteProductById = async (id, token) => {
   try {
      const res = await axios.delete(`${baseUrl}/${id}`, {
         headers: { tkn: token }
      });
      return res.data;
   } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
   }
};

export const updateProduct = async (productId, productData, token) => {
   try {
      const response = await axios.put(`${baseUrl}/${productId}`, productData, {
         headers: {
            tkn: token,  // שלח את ה-token כאן
         },
      });
      return response.data;
   } 
   catch (error) {
      throw error.response?.data || error.message;
   }
};
export const getProductById = async (id) => {
   try {
       const response = await axios.get(`${baseUrl}/${id}`);
       return response;
   } catch (error) {
       console.error("Error fetching product by ID:", error);
       throw error; // נזרוק את השגיאה כדי לטפל בה בקומפוננטה
   }
};
export const addProduct = (prod, token) => {
   console.log(prod)
   return axios.post(baseUrl, prod, {
      headers: {
         tkn: token
      }
   });
}

// export const getAllProduct = (pageNum, limit = 3) => {
//    return axios.get(`${baseUrl}?page=${pageNum}&limit=${limit}`);
// }

// export const getTotalPages = (limit = 2) => {
//    return axios.get(`${baseUrl}/total-pages?limit=${limit}`);
// }

// export const updateProduct = (id, token) => {
//    return axios.put(`${baseUrl}/${id}`, {
//       headers: {
//          tkn: token
//       }
//    });
// }
// export const updateProduct = async (productId, productData, token) => {
//    try {
//        const response = await axios.put(`${baseUrl}/${productId}`, 
//            productData, 
//            {
//                headers: {
//                    tkn: token, // שינוי המפתח מ-Authorization ל-tkn
//                },
//            }
//        );
//        return response.data;
//    } catch (error) {
//        throw error.response?.data || error.message;
//    }
// };
