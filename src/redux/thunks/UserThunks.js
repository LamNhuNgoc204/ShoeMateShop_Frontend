// src/redux/thunks/UserThunks.js
import {createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginUser, registerUser} from '../../api/AuthApi';
import AxiosInstance from '../../helpers/AxiosInstance';

// Thunk cho đăng ký
export const register = createAsyncThunk(
  'user/register',
  async (userData, {rejectWithValue}) => {
    try {
      const response = await registerUser(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Thunk cho đăng nhập
export const login = createAsyncThunk(
  'user/login',
  async (userData, {rejectWithValue}) => {
    try {
      const response = await loginUser(userData);
      const result = response.data;
      await AsyncStorage.setItem('token', result.token);
      console.log('token=>>>>', AsyncStorage.getItem('token'));
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const loginWithGG = createAsyncThunk(
  'user/loginGG',
  async (data, {rejectWithValue}) => {
    try {
      const response = await AxiosInstance().post(
        'auth/login-with-google',
        data,
      );
      if (response.status) {
        await AsyncStorage.setItem('token', response.token);
        return response.data;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  },
);
