import AxiosInstance from '../helpers/AxiosInstance';

export const fetchProducts = async () => {
  const response = await AxiosInstance().get('/products/list-products');
  return response;
};
