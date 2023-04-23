import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  total: 0,
  myLocation: [],
  total2: 0,
};

export const BasketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    SaveAddress: (state, action) => {
      const addressCoordinates = action.payload;
      state.myLocation = [addressCoordinates];
    },
    AddtoBasket: (state, action) => {
      const item2 = action.payload;
      const cartItem = state.items.find((item) => item.id == item2.id);
      if (cartItem == undefined) {
        state.items = [...state.items, item2];
        return;
      } else {
        cartItem.cant = cartItem.cant + item2.cant;
      }
    },
    ClearBasket: (state) => {
      state.items = [];
    },
    RemoveBasket: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
    },
    Aumentar: (state, action) => {
      const idItem = action.payload;
      const cartItem = state.items.find((item) => item.id == idItem);
      cartItem.cant = cartItem.cant + 1;
    },
    Disminuir: (state, action) => {
      const idItem = action.payload;
      const cartItem = state.items.find((item) => item.id == idItem);
      cartItem.cant = cartItem.cant - 1;
    },
    calculateTotals: (state) => {
      let total = 0;
      let total2 = 0;
      state.items.forEach((item) => {
        total += item.precioBajada
          ? item.cant * item.precioBajada
          : item.cant * item.precio;
        total2 += item.precioBajada > 0 ? item.cant * item.precio : 0;
      });
      state.total = total;
      state.total2 = total2;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  AddtoBasket,
  ClearBasket,
  RemoveBasket,
  Aumentar,
  Disminuir,
  calculateTotals,
  SaveAddress,
} = BasketSlice.actions;
export const selectBasketItems = (state) => state.basket.items;
export default BasketSlice.reducer;
