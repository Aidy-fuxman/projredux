// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     cartArr: [],
//     qtyInCart: 0,
//     sumOfCart: 0,
// }
// const cartSlice = createSlice({
//     name: "cart",
//     initialState,
//     reducers: {

//         add: (state, action) => {
//             let index = state.cartArr.findIndex(item => item._id ==
//                 action.payload._id);
//             if (index == -1) {
//                 let copy = { ...action.payload, qty: 1 };
//                 state.cartArr.push(copy);
//             }
//             else {
//                 state.cartArr[index].qty++;

//             }
//             state.qtyInCart++;
//             state.sumOfCart += action.payload.price;
//         },
//         decrease: (state, action) => {
//             let index = state.cartArr.findIndex(item => item._id === action.payload._id);
//             if (index !== -1 && state.cartArr[index].qty > 1) {
//                 state.cartArr[index].qty--;
//                 state.qtyInCart--;
//                 state.sumOfCart -= action.payload.price;
//             }
//         },
//         removeFromCart: (state, action) => {
//             state.cartArr = state.cartArr.filter(item => item._id !== action.payload._id);
//             state.qtyInCart-=action.payload.qty;
//             state.sumOfCart -= (action.payload.price)*(action.payload.qty);
//         },
//     }

// })

// export const { add, removeFromCart, decrease } = cartSlice.actions;
// export default cartSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { saveToLocalStorage,getFromLocalStorage } from "../utils/storage";

const initialState = getFromLocalStorage("cart") || {
    cartArr: [],
    qtyInCart: 0,
    sumOfCart: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        add: (state, action) => {
            let index = state.cartArr.findIndex(item => item._id === action.payload._id);
            if (index === -1) {
                let copy = { ...action.payload, cnt: 1 };
                state.cartArr.push(copy);
            } else {
                state.cartArr[index].cnt++;
            }
            state.qtyInCart++;
            state.sumOfCart += action.payload.price;
            saveToLocalStorage("cart", state);
        },
        decrease: (state, action) => {
            let index = state.cartArr.findIndex(item => item._id === action.payload._id);
            if (index !== -1 && state.cartArr[index].cnt > 1) {
                state.cartArr[index].cnt--;
                state.qtyInCart--;
                state.sumOfCart -= action.payload.price;
                saveToLocalStorage("cart", state);
            }
        },
        removeFromCart: (state, action) => {
            state.cartArr = state.cartArr.filter(item => item._id !== action.payload._id);
            state.qtyInCart -= action.payload.cnt;
            state.sumOfCart -= action.payload.price * action.payload.cnt;
            saveToLocalStorage("cart", state);
        },
        clearCart: (state) => {
            state.cartArr = []; // איפוס הסל
            state.qtyInCart = 0;
            state.sumOfCart = 0;
            // saveToLocalStorage("cart", state); // עדכון ה-localStorage
        }
    }
});

export const { add, removeFromCart, decrease, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
