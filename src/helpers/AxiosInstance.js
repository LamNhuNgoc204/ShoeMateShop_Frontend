import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import dayjs from 'dayjs';

const AxiosInstance = (contentType = 'application/json') => {
  const axiosInstance = axios.create({
    baseURL: `https://shoe-mate-shop-backend.vercel.app/`,
  });
  axiosInstance.interceptors.request.use(
    async config => {
      const expiredTokenDate = await AsyncStorage.getItem('expiredTokenDate');
      let token = await AsyncStorage.getItem('token');

      if (dayjs().isAfter(expiredTokenDate)) {
        const response = await axios.post(
          'https://shoe-mate-shop-backend.vercel.app/auth/refresh-token',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        newestToken = response?.data?.data;
        await AsyncStorage.setItem('token', newestToken);
        await AsyncStorage.setItem(
          'expiredTokenDate',
          dayjs().add('7', 'day').format('YYYY-MM-DD HH:mm:ss'),
        );
      } else {
        token = await AsyncStorage.getItem('token');
      }
      // const token = '';
      config.headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': contentType,
      };

      return config;
    },
    err => Promise.reject(err),
  );

  axiosInstance.interceptors.response.use(
    res => res.data,
    err => {
      return Promise.reject(err);
    },
  );
  return axiosInstance;
};

export default AxiosInstance;
