import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    arrProd: [],
    error: null,
    selectedProd: null,
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
        selectedProd: (state, action) => {
            state.selectedProd = action.payload;
        },
        addProd: (state, action) => {
            // בודקים אם יש מוצרים במערך ומייצרים id חדש על פי האחרון
            const lastProductId = state.arrProd.length > 0 ? state.arrProd[state.arrProd.length - 1].id : 0;
            const newProduct = { ...action.payload, id: lastProductId + 1 }; // אם אין מוצרים, id יתחיל מ-1
            state.arrProd.push(newProduct); // מוסיפים את המוצר החדש
        },
       
        removeProd: (state, action) => {
            state.arrProd = state.arrProd.filter(item => item._id !== action.payload);
        },
        
        
        updateProd: (state, action) => {
            let index = state.arrProd.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.arrProd[index] = { ...state.arrProd[index], ...action.payload };
            }
        },
    },
});

export const { setArrProd, setError, selectedProd, addProd, removeProd, updateProd } = prodSlice.actions;
export default prodSlice.reducer;