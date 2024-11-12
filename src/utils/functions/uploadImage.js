const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/dt7755ppx/upload`;
const cloudinaryUploadPreset = 'shoe_mate_shop';
import axios from 'axios';
import {launchImageLibrary} from 'react-native-image-picker';

export const chooseAvatar = async setAvatar => {
  const options = {
    mediaType: 'photo',
    selectionLimit: 1,
  };

  await launchImageLibrary(options, async response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      const formData = new FormData();
      formData.append('upload_preset', cloudinaryUploadPreset);
      formData.append('file', {
        uri: response.assets[0].uri,
        type: response.assets[0].type,
        name: response.assets[0].fileName,
      });

      try {
        const res = await fetch(CLOUDINARY_URL, {
          method: 'post',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (res.ok) {
          const responseJson = await res.json();
          console.log('Image upload success:', responseJson.url);
          setAvatar(responseJson.url);
        } else {
          console.log('Image upload failed:', res.status);
        }
      } catch (error) {
        console.log('Fetch error:', error);
      }
    }
  });
};

export const uploadMediaToCloudinary = async (media, type) => {
  const formData = new FormData();
  formData.append('file', {
    uri: media.uri,
    type: media.type,
    name: media.fileName,
  });
  formData.append('upload_preset', 'shoe_mate_shop');
  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/dt7755ppx/${type}/upload`,
    formData,
    {
      headers: {'Content-Type': 'multipart/form-data'},
    },
  );
  return response.data.secure_url;
};
