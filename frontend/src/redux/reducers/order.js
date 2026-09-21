import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  orders: [],
  error: null,
};

export const orderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("OrderRequest", (state) => {
      state.loading = true;
    })
    .addCase("OrderSuccess", (state, action) => {
      state.loading = false;
      state.orders = action.payload;
      state.error = null;
    })
    .addCase("OrderFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.orders = [];
    });
});