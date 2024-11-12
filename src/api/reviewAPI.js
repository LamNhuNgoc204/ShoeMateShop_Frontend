import AxiosInstance from '../helpers/AxiosInstance';

export const createMultipleReviews = async reviews => {
  try {
    const response = await AxiosInstance().post(`/reviews`, reviews);
    if (response.status) {
      return response;
    }
  } catch (error) {
    console.log('get order detail error: ', error);
  }
};