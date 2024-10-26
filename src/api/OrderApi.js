import AxiosInstance from '../helpers/AxiosInstance';

export const createOrder = async body => {
  try {
    const response = await AxiosInstance().post(
      '/orders/create-new-order',
      body,
    );
    return response;
  } catch (error) {
    console.log('Loi tao don hang: ', error);
  }
};
