import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkTokenValidity = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) return false;

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  } catch (error) {
    console.error('Lỗi khi kiểm tra token:', error);
    return false;
  }
};
