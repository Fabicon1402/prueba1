import { configureStore } from "@reduxjs/toolkit";
import BasketReducer from "./ShoppingCar/BasketSlice";

export const Store = configureStore({
  reducer: {
    basket: BasketReducer,
  },
});
