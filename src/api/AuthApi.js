import AxiosInstance from '../helpers/AxiosInstance';

export const registerUser = async userData => {
  const response = await AxiosInstance().post('/auth/signup', userData);
  return response;
};

export const loginUser = async userData => {
  const response = await AxiosInstance().post('/auth/login', userData);
  console.log('Call api login: ', response);
  return response;
};
