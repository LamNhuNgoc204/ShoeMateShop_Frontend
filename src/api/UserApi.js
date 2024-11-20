import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosInstance from '../helpers/AxiosInstance';

export const refreshAccessToken = async (token, userId) => {
  try {
    const response = await AxiosInstance().post('/auth/refresh-token', {
      token,
      userId,
    });

    const newToken = response.data;

    // Lưu token mới và cập nhật ngày hết hạn
    const tokenExpirationDate = new Date();
    tokenExpirationDate.setDate(tokenExpirationDate.getDate() + 7);

    await AsyncStorage.setItem('token', newToken);
    await AsyncStorage.setItem(
      'token_expiration',
      tokenExpirationDate.toISOString(),
    );

    console.log('Token refreshed:', newToken);
    return newToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    // Xử lý logout nếu refresh token thất bại
    await AsyncStorage.clear();
    return null;
  }
};

export const updateInformation = async body => {
  try {
    const response = await AxiosInstance().put(
      '/users/update-user-profile',
      body,
    );
    if (response.status) {
      return response.data;
    } else {
      console.log('Update failed: ', response.message);
    }
  } catch (error) {
    console.log('Update infor error: ', error);
  }
};

export const getAllAddress = async () => {
  try {
    const response = await AxiosInstance().get('/addresses/get-all-address');
    if (response.status) {
      return response;
    }
  } catch (error) {
    console.log('Get adrress err: ', error);
  }
};

export const deleteUserAdress = async addressId => {
  try {
    const response = await AxiosInstance().delete(
      `/addresses/delete-address/${addressId}`,
    );
    if (response.status) {
      return response;
    }
  } catch (error) {
    console.log('Delete address failed: ', error);
  }
};

export const setUserAddressDefault = async addressId => {
  try {
    const response = await AxiosInstance().put(
      `/addresses/set-default-address/${addressId}`,
    );
    if (response.status) {
      return response;
    }
  } catch (error) {
    console.log('Delete address failed: ', error);
  }
};
