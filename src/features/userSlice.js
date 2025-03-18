import { createSlice } from "@reduxjs/toolkit";
import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from "../utils/storage";

const initialState = { currentUser: getFromLocalStorage("user") || null };

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userIn: (state, action) => {
            state.currentUser = action.payload;
            saveToLocalStorage("user", action.payload);
        },
        userOut: (state) => {
            state.currentUser = null;
            removeFromLocalStorage("user");
            removeFromLocalStorage("cart")
        }
    }
});
export const { userIn, userOut } = userSlice.actions;
export default userSlice.reducer;
