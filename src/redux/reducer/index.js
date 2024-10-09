// redux/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer'; // Import reducer mà bạn đã tạo

const rootReducer = combineReducers({
  auth: authReducer, // Kết hợp reducer vào rootReducer
  // Có thể thêm nhiều reducer khác ở đây
});

export default rootReducer;
