import AxiosInstance from '../helpers/AxiosInstance';

// Hàm gọi API để thêm sản phẩm vào giỏ hàng
export const addItemToCartApi = async item => {
  const response = await AxiosInstance().post(
    '/cart/add-product-to-cart',
    item,
  );
  return response;
};

// Hàm gọi API lấy giỏ hàng theo người dùng
export const getUserCard = async () => {
  const response = await AxiosInstance().get(
    '/cart/get-cart-by-user-id');
  return response;
};

// Hàm gọi API cập nhật số lượng giỏ hàng
export const updateCartItem = async body => {
  const response = await AxiosInstance().put(
    '/cart/update-cart-quantity',
    body,
  );
  return response;
};

// Hàm gọi API xóa tất cả sản phẩm khỏi giỏ hàng
export const deleteAllCart = async () => {
  const response = await AxiosInstance().delete(
    '/cart/clear-cart');
  return response;
};

export const deleteOneItemCard = async body => {
  const response = await AxiosInstance().post(
    '/cart/remove-product-from-cart',
    body,
  );
  return response;
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

export const getAddressDefault = async () => {
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
