import AxiosInstance from '../helpers/AxiosInstance';

// Hàm gọi API để thêm sản phẩm vào giỏ hàng
export const addItemToCartApi = async item => {
  const response = await AxiosInstance().post(
    '/cart/add-product-to-cart',
    item,
  );
  return response;
};

// // Hàm gọi API để xóa sản phẩm khỏi giỏ hàng
// export const removeItemFromsApi = async id => {
//   const response = await AxiosInstance().delete(`/carts/remove/${id}`);
//   return response.data;
// };
