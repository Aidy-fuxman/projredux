import axios from "axios"
const baseUrl = "https://yochi-aidy-nodeproject.onrender.com/api/order";
// const baseUrl = "http://localhost:5500/api/order";


export const addOrder = async (order, token) => {
    try {
        const res = await axios.post(baseUrl, order, {
            headers: {
                tkn: token,  // שלח את ה-token כאן
            },
        });
        return res.data;
    }

    catch (error) {
        throw error.res?.data || error.message;
    }


}

