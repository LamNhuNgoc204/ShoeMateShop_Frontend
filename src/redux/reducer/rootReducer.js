import {combineReducers} from '@reduxjs/toolkit';
import productReducer from '../reducer/productReducer';
import cartReducer from '../reducer/cartReducer';
import userReducer from '../reducer/userReducer';

// rootReducer kết hợp các reducer khác
const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  user: userReducer
});

export default rootReducer;
