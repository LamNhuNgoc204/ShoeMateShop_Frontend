import {createSlice} from '@reduxjs/toolkit';
import {fetchProductsThunk} from '../thunks/productThunks';
import {getCategoryThunk} from '../thunks/categoryThunk';

const initialState = {
  isLoading: false,
  error: null,
  products: [],
  categories: [],
  wishlist: [],
};

const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.wishlist = state.wishlist.filter(item => item._id !== productId);
    },
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
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
        // console.log('---------------------fulliled products--------------');
        // console.log(
        //   '---------------------state.products--------------',
        //   state.products,
        // );
        state.error = null;
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getCategoryThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCategoryThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
        // console.log('---------------------fulliled categories--------------');
        // console.log(
        //   '---------------------state.categories--------------',
        //   state.categories,
        // );
      })
      .addCase(getCategoryThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {setWishlist, removeFromWishlist} = ProductSlice.actions;
export default ProductSlice.reducer;
