import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {refreshAccessToken} from '../api/UserApi';

const AxiosInstance = (contentType = 'application/json') => {
  const axiosInstance = axios.create({
    baseURL: `https://shoe-mate-shop-backend.vercel.app/`,
  });

  axiosInstance.interceptors.request.use(
    async config => {
      try {
        const token = await AsyncStorage.getItem('token');
        const expiration = await AsyncStorage.getItem('token_expiration');
        const user_id = await AsyncStorage.getItem('user_id');

        let currentToken = token || '';

        if (token && expiration) {
          const now = new Date();
          const tokenExpirationDate = new Date(expiration);

          if (now >= tokenExpirationDate) {
            console.log('Token expired, refreshing...');
            const newToken = await refreshAccessToken(token, user_id);

            if (newToken) {
              const newExpiration = new Date();
              newExpiration.setDate(newExpiration.getDate() + 7);

              await AsyncStorage.setItem('token', newToken);
              await AsyncStorage.setItem(
                'token_expiration',
                newExpiration.toISOString(),
              );
              currentToken = newToken;
            } else {
              console.error('Unable to refresh token, logging out...');
              await AsyncStorage.clear();
              throw new Error('Token expired and refresh failed');
            }
          }
        }

        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${currentToken}`,
          Accept: 'application/json',
          'Content-Type': contentType,
        };

        return config;
      } catch (error) {
        console.error('Request Error:', error);
        return Promise.reject(error);
      }
    },
    error => Promise.reject(error),
  );

  axiosInstance.interceptors.response.use(
    res => {
      console.log('Response:', res);
      return res.data;
    },
    err => {
      console.error('Response Error:', err.response?.data || err.message);
      return Promise.reject(err);
    },
  );

  return axiosInstance;
};

export default AxiosInstance;
