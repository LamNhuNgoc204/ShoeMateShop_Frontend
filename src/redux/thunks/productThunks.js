import {createAsyncThunk} from '@reduxjs/toolkit';
// import {fetchProducts} from '../../api/ProductApi';

// export const fetchProductsThunk = createAsyncThunk(
//   'products/fetchProducts',
//   async (_, {rejectWithValue}) => {
//     try {
//       const products = await fetchProducts();
//       return products;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Fetch products failed');
//     }
//   },
// );
