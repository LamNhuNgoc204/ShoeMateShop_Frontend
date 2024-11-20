import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  pendingOrders: [],
  receiveOrder: [],
  returnOrder: [],
  shipOrder: [],
  cancelOrder: [],
};

const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setpendingOrders: (state, action) => {
      state.pendingOrders = action.payload;
    },
    setreceiveOrder: (state, action) => {
      state.receiveOrder = action.payload;
    },
    setreturnOrder: (state, action) => {
      state.returnOrder = action.payload;
    },
    setshipOrder: (state, action) => {
      state.shipOrder = action.payload;
    },
    setcancelOrder: (state, action) => {
      state.cancelOrder = action.payload;
    },
  },
});

export const {
  setpendingOrders,
  setcancelOrder,
  setreceiveOrder,
  setreturnOrder,
  setshipOrder,
} = OrderSlice.actions;
export default OrderSlice.reducer;
