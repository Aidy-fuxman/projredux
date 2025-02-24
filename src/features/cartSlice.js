import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartArr: [],
    qtyInCart: 0,
    sumOfCart: 0,
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        add: (state, action) => {
            let index = state.cartArr.findIndex(item => item._id ==
                action.payload._id);
            if (index == -1) {
                let copy = { ...action.payload, qty: 1 };
                state.cartArr.push(copy);
            }
            else {
                state.cartArr[index].qty++;

            }
            state.qtyInCart++;
            state.sumOfCart += action.payload.price;
        },
        decrease: (state, action) => {
            let index = state.cartArr.findIndex(item => item._id === action.payload._id);
            if (index !== -1 && state.cartArr[index].qty > 1) {
                state.cartArr[index].qty--;
                state.qtyInCart--;
                state.sumOfCart -= action.payload.price;
            }
        },
        removeFromCart: (state, action) => {
            state.cartArr = state.cartArr.filter(item => item._id !== action.payload._id);
            state.qtyInCart-=action.payload.qty;
            state.sumOfCart -= (action.payload.price)*(action.payload.qty);
        },
    }

})

export const { add, removeFromCart, decrease } = cartSlice.actions;
export default cartSlice.reducer;