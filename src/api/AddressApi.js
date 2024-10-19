import AxiosInstance from '../helpers/AxiosInstance';

export const getAllAddress = async () => {
  const response = await AxiosInstance().get('/addresses/get-all-address');
  return response;
};

export const addAddress = async body => {
  const response = await AxiosInstance().post('/addresses/add-address', body);
  return response;
};
