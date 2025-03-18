import { configureStore } from '@reduxjs/toolkit';
import prodSlice from '../features/prodSlice'; 
import cartSlice from '../features/cartSlice'; 
import userSlice from '../features/userSlice'; 
export const store = configureStore({
  reducer: {
    // products: prodSlice,
    cart:cartSlice,
    user:userSlice,
  },
});

export default store;