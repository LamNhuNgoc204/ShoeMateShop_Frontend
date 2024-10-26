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

export const getOrderPending = async () => {
  try {
    const response = await AxiosInstance().get(
      '/orders/get-user-order-pending',
    );
    return response;
  } catch (error) {
    console.log(' Loi lay don hang');
  }
};

export const getOrderProcess = async () => {
  try {
    const response = await AxiosInstance().get(
      '/orders/get-user-order-processing',
    );
    return response;
  } catch (error) {
    console.log(' Loi lay don hang');
  }
};

export const getOrderCompeleted = async () => {
  try {
    const response = await AxiosInstance().get(
      '/orders/get-user-order-completed',
    );
    return response;
  } catch (error) {
    console.log(' Loi lay don hang');
  }
};

export const getOrderCancell = async () => {
  try {
    const response = await AxiosInstance().get(
      '/orders/get-user-order-cancell',
    );
    return response;
  } catch (error) {
    console.log(' Loi lay don hang');
  }
};
