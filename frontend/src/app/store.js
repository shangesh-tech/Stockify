import { configureStore } from '@reduxjs/toolkit';
import portfolioReducer from './slices/portfolioSlice';



// If you have other slices, import and add them here
const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
  
  },
});

export default store;
