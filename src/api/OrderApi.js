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

export const getOrderDetail = async orderId => {
  try {
    const response = await AxiosInstance().get(
      `/orders/get-order-detail/${orderId}`,
    );
    if (response.status) {
      return response.data;
    }
  } catch (error) {
    console.log('get order detail error: ', error);
  }
};

export const cancelOrder = async orderId => {
  try {
    const response = await AxiosInstance().put(
      `/orders/cancel-order/${orderId}`,
    );
    if (response.status) {
      return response;
    }
  } catch (error) {
    console.log('get order detail error: ', error);
  }
};

export const getOrderReturn = async () => {
  try {
    const response = await AxiosInstance().get(
      `/orders/get-user-order-refunded`,
    );
    if (response.status) {
      return response;
    }
  } catch (error) {
    console.log('get order detail error: ', error);
  }
};
