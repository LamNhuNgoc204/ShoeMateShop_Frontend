import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchProducts, fetchWishlist} from '../../api/ProductApi';

export const fetchProductsThunk = createAsyncThunk(
  'products/fetchProducts',
  async (_, {rejectWithValue}) => {
    try {
      const products = await fetchProducts();
      return products;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Fetch products failed');
    }
  },
);

export const fetchWishlistThunk = createAsyncThunk(
  'products/fetchWishlist',
  async (_, {rejectWithValue}) => {
    try {
      const wishlist = await fetchWishlist();
      return wishlist.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Fetch wishlist failed');
    }
  },
);
