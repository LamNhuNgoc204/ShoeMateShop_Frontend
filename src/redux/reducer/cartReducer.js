import {createSlice} from '@reduxjs/toolkit';
import {
  getAdressDefault,
  getPaymentDefault,
  getShipDefault,
} from '../thunks/CartThunks';
// import {addItem, removeItem} from '../thunks/CartThunks';

const initialState = {
  items: [],
  totalAmount: 0,
  productOrder: [],
  totalPrice: 0,
  ship: null,
  address: null,
  payment: null,
  priceToPay: 0,
  orderId: null,
};

// Khởi tạo slice
const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setOrderData: (state, action) => {
      state.productOrder = action.payload;
    },
    setShipping: (state, action) => {
      state.ship = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.payment = action.payload;
    },
    setToltalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    setPriceToPay: (state, action) => {
      state.priceToPay = action.payload;
    },
    setOrderId: (state, action) => {
      state.orderId = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getShipDefault.fulfilled, (state, action) => {
        state.ship = action.payload;
      })
      .addCase(getAdressDefault.fulfilled, (state, action) => {
        state.address = action.payload;
      })
      .addCase(getPaymentDefault.fulfilled, (state, action) => {
        state.payment = action.payload;
      });
  },
});

export const {
  setOrderData,
  setShipping,
  setAddress,
  setToltalPrice,
  setPaymentMethod,
  setPriceToPay,
  setOrderId,
} = CartSlice.actions;
export default CartSlice.reducer;
