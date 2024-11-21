import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../GameSlice'; 

export const store = configureStore({
  reducer: gameReducer 
});
