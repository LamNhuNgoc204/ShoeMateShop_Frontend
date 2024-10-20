import {createSlice} from '@reduxjs/toolkit';
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
  },
  // extraReducers: builder => {
  //   builder
  //     .addCase(addItem.fulfilled, (state, action) => {
  //       const newItem = action.payload;
  //       state.items.push(newItem);
  //       state.totalAmount += newItem.price;
  //     })
  //     .addCase(removeItem.fulfilled, (state, action) => {
  //       const id = action.payload.id;
  //       const existingItem = state.items.find(item => item.id === id);
  //       if (existingItem) {
  //         state.items = state.items.filter(item => item.id !== id);
  //         state.totalAmount -= existingItem.price;
  //       }
  //     });
  // },
});

export const {
  setOrderData,
  setShipping,
  setAddress,
  setToltalPrice,
  setPaymentMethod,
  setPriceToPay,
} = CartSlice.actions;
export default CartSlice.reducer;
