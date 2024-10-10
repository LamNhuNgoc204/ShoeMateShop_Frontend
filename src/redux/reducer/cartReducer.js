import {createSlice} from '@reduxjs/toolkit';
// import {addItem, removeItem} from '../thunks/CartThunks';

const initialState = {
  items: [],
  totalAmount: 0,
};

// Khởi tạo slice
const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
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

export default CartSlice.reducer;
