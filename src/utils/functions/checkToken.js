// import AsyncStorage from '@react-native-async-storage/async-storage';

// const decodeTokenManually = token => {
//   try {
//     // Tách token thành các phần
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(
//       atob(base64)
//         .split('')
//         .map(c => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
//         .join(''),
//     );
//     // Chuyển chuỗi JSON thành object
//     return JSON.parse(jsonPayload);
//   } catch (error) {
//     console.error('Lỗi khi giải mã token:', error);
//     return null;
//   }
// };

// export const checkTokenValidity = async () => {
//   const token = await AsyncStorage.getItem('token');
//   if (!token) return false;

//   const decodedToken = decodeTokenManually(token);
//   if (!decodedToken || !decodedToken.exp) return false;

//   // Lay thời gian hiện tại tính bằng giây
//   const currentTime = Math.floor(Date.now() / 1000);
//   console.log('Token exp:', decodedToken.exp, 'Current time:', currentTime);

//   return decodedToken.exp > currentTime;
// };

import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

// Hàm giải mã đơn giản chỉ lấy phần exp của token
const getTokenExp = token => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = atob(base64);
    const decoded = JSON.parse(jsonPayload);
    return decoded.exp;
  } catch (error) {
    console.error('Lỗi khi giải mã token:', error);
    return null;
  }
};

export const checkTokenValidity = async () => {
  // try {
  //   const token = await AsyncStorage.getItem('token');
  //   if (!token) return false;

  //   const exp = getTokenExp(token);
  //   if (!exp) return false;

  //   const currentTime = Math.floor(Date.now() / 1000);
  //   console.log('Token exp:', exp, 'Current time:', currentTime);

  //   return exp > currentTime;
  // } catch (error) {
  //   console.error('Lỗi khi kiểm tra token:', error);
  //   return false;
  // }
  try {
    const expiredTokenDate = await AsyncStorage.getItem('expiredTokenDate');
    if (!expiredTokenDate) return false;

    const currentTime = dayjs();
    const expiryTime = dayjs(expiredTokenDate);

    // Kiểm tra xem token đã hết hạn chưa
    return currentTime.isBefore(expiryTime); // Nếu chưa hết hạn, trả về true
  } catch (error) {
    console.error('Error checking token validity:', error);
    return false;
  }
};
