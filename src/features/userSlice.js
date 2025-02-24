import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: { currentUser: null },
    reducers: {
        userIn: (state, action) => {
            state.currentUser = action.payload;
        },
        userOut:(state)=>{
           state.currentUser=null;
        }

    }

})
export const { userIn,userOut} = userSlice.actions;
export default userSlice.reducer;