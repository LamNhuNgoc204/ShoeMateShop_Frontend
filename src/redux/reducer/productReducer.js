import {createSlice} from '@reduxjs/toolkit';
import {fetchProductsThunk} from '../thunks/productThunks';

const initialState = {
  isLoading: false,
  error: null,
  products: [],
};

const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProducts: state => {
      state.products = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProductsThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        console.log('---------------------fulliled--------------');
        console.log('---------------------state.products--------------');

        state.error = null;
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {clearProducts} = ProductSlice.actions;
export default ProductSlice.reducer;
