import {combineReducers} from '@reduxjs/toolkit';
import productReducer from '../reducer/productReducer';
import cartReducer from '../reducer/cartReducer';
import userReducer from '../reducer/userReducer';
import OrderReducer from '../reducer/orderReducer';

// rootReducer kết hợp các reducer khác
const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  user: userReducer,
  order: OrderReducer,
});

export default rootReducer;
