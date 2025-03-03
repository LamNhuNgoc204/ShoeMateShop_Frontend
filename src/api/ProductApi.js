import AxiosInstance from '../helpers/AxiosInstance';

export const fetchProducts = async () => {
  const response = await AxiosInstance().get('/products/list-products');
  return response;
};

export const fetchWishlist = async () => {
  try {
    const response = await AxiosInstance().get('/products/wishlist');
    return response;
  } catch (error) {
    console.log('get wishlist error: ', error);
  }
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

export const removeFromWishlist = async productId => {
  try {
    const response = await AxiosInstance().delete(
      `/products/remove-item-wishlist/${productId}`,
    );

    return response;
  } catch (error) {
    console.log('delete product in wishlist error: ', error);
  }
};

export const addRecentView = async productId => {
  try {
    const response = await AxiosInstance().post(`/recent-views/${productId}`);
    if (response.status) {
      return response;
    }
  } catch (error) {
    console.log('add recent view err: ', error);
  }
};

export const getRecentViews = async () => {
  try {
    const response = await AxiosInstance().get(
      '/recent-views/get-recent-views',
    );
    if (response.status) {
      return response;
    }
  } catch (error) {
    console.log('get recent view err: ', error);
  }
};

export const getUnreviewedProductsInOrder = async () => {
  try {
    const response = await AxiosInstance().get('/reviews/product-unreview');
    if (response.status) {
      return response.data;
    }
  } catch (error) {
    console.log('getUnreviewedProductsInOrder err: ', error);
  }
};
