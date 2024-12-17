// src/redux/thunks/UserThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser, registerUser } from '../../api/AuthApi';
import AxiosInstance from '../../helpers/AxiosInstance';
import dayjs from 'dayjs';

// Thunk cho đăng ký
export const register = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData);
      if (response.status == false) {
        return rejectWithValue(response.message || 'Registration failed');
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
  }
);

// Thunk cho đăng nhập
export const login = createAsyncThunk(
  'user/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginUser(userData);
      const result = response.data;
      console.log('result', result.user);
      if (result?.user?.isVerified==true) {
        console.log('đã xác nhận chưa', result?.user?.isVerified);
        const expiredTokenDate = dayjs()
        .add('7', 'day')
        .format('YYYY-MM-DD HH:mm:ss');
      await AsyncStorage.setItem('token', result.token);
      await AsyncStorage.setItem('expiredTokenDate', expiredTokenDate);
      console.log('token=>>>>', AsyncStorage.getItem('token'));
      }
      return result;
    } catch (error) {
      console.log(error);

      return rejectWithValue(error.response?.data);
    }
  },
);

export const loginWithGG = createAsyncThunk(
  'user/loginGG',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance().post(
        'auth/login-with-google',
        data,
      );
      if (response.status) {
        const result = response.data;
        const expiredTokenDate = dayjs()
          .add('7', 'day')
          .format('YYYY-MM-DD HH:mm:ss');
        await AsyncStorage.setItem('token', result.token);
        await AsyncStorage.setItem('expiredTokenDate', expiredTokenDate);
        console.log('token=>>>>', AsyncStorage.getItem('token'));
        return result;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  },
);