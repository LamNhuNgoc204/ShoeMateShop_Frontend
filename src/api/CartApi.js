import AxiosInstance from '../helpers/AxiosInstance';

// Hàm gọi API để thêm sản phẩm vào giỏ hàng
export const addItemToCartApi = async item => {
  const response = await AxiosInstance().post(
    '/cart/add-product-to-cart',
    item,
  );
  return response;
};

export const getUserCard = async () => {
  const response = await AxiosInstance().get('/cart/get-user-card');
  return response;
};

export const updateCartItem = async body => {
  const response = await AxiosInstance().put(
    '/cart/update-cart-quantity',
    body,
  );
  return response;
};

export const deleteAllCart = async () => {
  const response = await AxiosInstance().delete('/cart/clear-cart');
  return response;
};

export const deleteOneItemCard = async body => {
  try {
    const response = await AxiosInstance().delete(
      '/cart/remove-product-from-cart',
      {
        data: body,
      },
    );
    return response;
  } catch (error) {
    console.error('Error deleting item from cart: ', error);
  }
};

export const getShippingDefault = async () => {
  try {
    const response = await AxiosInstance().get('/ship/ship-default');
    if (response.status) {
      return response.data;
    }
  } catch (error) {
    console.log(' Get ship default err: ', error);
  }
};

export const getUserAddressDefault = async () => {
  try {
    const response = await AxiosInstance().get('/addresses/default-address');
    if (response.status) {
      return response.data;
    }
  } catch (error) {
    console.log(' Get ship default err: ', error);
  }
};

export const getPaymentMethodDefault = async () => {
  try {
    const response = await AxiosInstance().get(
      '/payment-method/payment-default',
    );
    if (response.status) {
      return response.data;
    }
  } catch (error) {
    console.log(' Get ship default err: ', error);
  }
};

export const clearCart = async () => {
  ///clear-cart
  try {
    const response = await AxiosInstance().delete('/cart/clear-cart');
    return response.status;
  } catch (error) {
    console.error('Error deleting item from cart: ', error);
  }
};
