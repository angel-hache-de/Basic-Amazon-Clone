import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";

//GLobal store
export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});
