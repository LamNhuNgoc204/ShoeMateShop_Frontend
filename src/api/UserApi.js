import AxiosInstance from '../helpers/AxiosInstance';

export const updateInformation = async body => {
  try {
    const response = await AxiosInstance().put(
      '/users/update-user-profile',
      body,
    );
    if (response.status) {
      return response.data;
    } else {
      console.log('Update failed: ', response.message);
    }
  } catch (error) {
    console.log('Update infor error: ', error);
  }
};
