import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchProducts} from '../../api/ProductApi';
import AxiosInstance from '../../helpers/AxiosInstance';

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


export const fetchWishlist = createAsyncThunk(
  'prducts/wishlist',
  async (_, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance().get('/products/wishlist');
      if(!response.status) {
        return []
      }
      if(response.data.length == 0) {
        return []
      }
      const wishlist = response.data.map((e) => e.product_id);
      return wishlist;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Fetch wishlist failed');
    }
  }
)
