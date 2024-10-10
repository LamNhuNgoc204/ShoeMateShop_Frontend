// // src/redux/thunks/CartThunks.js
// import {createAsyncThunk} from '@reduxjs/toolkit';
// import {addItemToCartApi, removeItemFromsApi} from '../../api/CartApi';

// // Tạo thunk cho thêm sản phẩm
// export const addItem = createAsyncThunk(
//   'cart/addItem',
//   async (item, {rejectWithValue}) => {
//     try {
//       const response = await addItemToCartApi(item);
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   },
// );

// // Tạo thunk cho xóa sản phẩm
// export const removeItem = createAsyncThunk(
//   'cart/removeItem',
//   async (id, {rejectWithValue}) => {
//     try {
//       const response = await removeItemFromsApi(id);
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   },
// );
