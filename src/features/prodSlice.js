import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    arrProd: [], 
    error: null,
    selectedProd:null,
};

const prodSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setArrProd: (state, action) => {
            state.arrProd = action.payload; 
            state.status = 'succeeded';
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.status = 'failed';
        },
        selectedProd:(state,action)=>{
            state.selectedProd=action.payload;
        },
        addProd:(state,action)=>{
            let copy={...action.payload,id:state.arrProd[state.arrProd.length-1].id+1};
            state.arrProd.push(copy);
        },
        removeProd:(state,action)=>{
            let index=state.arrProd.findIndex(item=>item.id==action.payload);
            state.arrProd.splice(index,1)
        },
    },
});

export const { setArrProd, setError,selectedProd,addProd,removeProd } = prodSlice.actions;
export default prodSlice.reducer;