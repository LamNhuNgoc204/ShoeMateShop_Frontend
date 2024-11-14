import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  getAddressDefault,
  getPaymentMethodDefault,
  getShippingDefault,
  getUserAddressDefault,
} from '../../api/CartApi';

export const getShipDefault = createAsyncThunk(
  'cart/getShipDefault',
  async (_, {rejectWithValue}) => {
    try {
      const response = await getShippingDefault();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getAdressDefault = createAsyncThunk(
  'cart/getAdressDefault',
  async (_, {rejectWithValue}) => {
    try {
      const response = await getUserAddressDefault();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getPaymentDefault = createAsyncThunk(
  'cart/getPaymentDefault',
  async (_, {rejectWithValue}) => {
    try {
      const response = await getPaymentMethodDefault();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
