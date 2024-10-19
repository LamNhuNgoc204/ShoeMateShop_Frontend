import AxiosInstance from '../helpers/AxiosInstance';

export const fetchProducts = async () => {
  const response = await AxiosInstance().get('/products/list-products');
  return response;
};

export const fetchWishlist = async () => {
  const response = await AxiosInstance().get('/products/wishlist');
  return response;
};

export const addProductInWishlist = async id => {
  try {
    const response = await AxiosInstance().post(
      `/products/addtowishlist/${id}`,
    );

    return response;
  } catch (error) {
    console.log('add product in wishlist error: ', error);
  }
};
