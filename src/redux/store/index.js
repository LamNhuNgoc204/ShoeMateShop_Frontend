// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from '../reducer'; // Import rootReducer mà bạn đã tạo

const store = configureStore({
  reducer: rootReducer, // Sử dụng rootReducer
});

export default store;
