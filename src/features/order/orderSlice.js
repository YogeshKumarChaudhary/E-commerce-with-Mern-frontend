import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder } from "./orderApi";

const initialState = {
  orders: [],
  status: "idle",
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (orderData) => {
    const response = await createOrder(orderData);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // createOrderAsync
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
      });
  },
});

export const { increment } = orderSlice.actions;

export const selectOrder = (state) => state.order.orders;

export default orderSlice.reducer;
