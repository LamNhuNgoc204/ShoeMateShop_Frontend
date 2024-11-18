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

export const getAllAddress = async () => {
  try {
    const response = await AxiosInstance().get('/addresses/get-all-address');
    if (response.status) {
      return response;
    }
  } catch (error) {
    console.log('Get adrress err: ', error);
  }
};

export const deleteUserAdress = async addressId => {
  try {
    const response = await AxiosInstance().delete(
      `/addresses/delete-address/${addressId}`,
    );
    if (response.status) {
      return response;
    }
  } catch (error) {
    console.log('Delete address failed: ', error);
  }
};

export const setAddressDefault = async addressId => {
  try {
    const response = await AxiosInstance().put(
      `/addresses/set-default-address/${addressId}`,
    );
    if (response.status) {
      return response;
    }
  } catch (error) {
    console.log('Delete address failed: ', error);
  }
};
