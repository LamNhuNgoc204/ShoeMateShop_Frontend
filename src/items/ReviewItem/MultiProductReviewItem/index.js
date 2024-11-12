import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import appst from '../../../constants/AppStyle';
import rvst from '../../../screens/Review/style';
import StarRating from '../../StarRating';
const ReviewItem = product => {
  const {t} = useTranslation();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const pd = product.product;
  const [photos, setPhotos] = useState([]);
  const [video, setVideo] = useState(null);
  const selectImages = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 5 - photos.length,
      },
      async response => {
        if (!response.didCancel && response.assets) {
          const localPhotos = response.assets;
          const uploadedPhotos = await Promise.all(
            localPhotos.map(photo => uploadMediaToCloudinary(photo, 'image')),
          );
          setPhotos([...photos, ...uploadedPhotos]);
        }
      },
    );
  };
  const selectVideo = () => {
    launchImageLibrary(
      {
        mediaType: 'video',
        selectionLimit: 1,
      },
      async response => {
        if (!response.didCancel && response.assets && response.assets[0]) {
          const videoUrl = await uploadMediaToCloudinary(
            response.assets[0],
            'video',
          );
          setVideo(videoUrl);
        }
      },
    );
  };
  const uploadMediaToCloudinary = async (media, type) => {
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
  const handleStarPress = rating => {
    setRating(rating);
  };
  const removePhoto = index => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
  };
  const removeVideo = () => {
    setVideo(null);
  };
  return (
    <View style={[appst.container, rvst.container]}>
      <View style={[rvst.itemPd]}>
        <Image
          style={rvst.imgPd}
          source={
            pd.pd_image && pd.pd_image[0]
              ? {uri: pd.pd_image[0]}
              : require('../../../assets/images/placeholder_image.jpg')
          }
        />
        <View style={{marginLeft: 5, flex: 1}}>
          <View style={rvst.viewContent}>
            <Text numberOfLines={1} style={rvst.name}>
              {pd.name}
            </Text>
            <Text style={rvst.size}>
              {t('products.size')}: {pd.size_name}
            </Text>
          </View>
        </View>
      </View>
      <View style={[rvst.viewStar]}>
        <Text style={rvst.quality}>{t('review.sub_title')}:</Text>
        <StarRating
          maxStars={5}
          rating={rating}
          onStarPress={handleStarPress}
        />
      </View>
      <View style={[appst.rowCenter, rvst.viewAsset]}>
        <TouchableOpacity onPress={selectImages} style={[rvst.viewBorder]}>
          <Image source={require('../../../assets/icons/addphoto.png')} />
          <Text style={rvst.text}>{t('review.photo')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={selectVideo} style={[rvst.viewBorder]}>
          <Image source={require('../../../assets/icons/addvideo.png')} />
          <Text style={rvst.text}>{t('review.video')}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          style={rvst.flatImg}
          data={photos}
          horizontal={true}
          renderItem={({item, index}) => (
            <View style={rvst.imgContainer}>
              <Image
                style={rvst.imgRate}
                source={
                  item
                    ? {uri: item}
                    : require('../../../assets/images/placeholder_image.jpg')
                }
              />
              <TouchableOpacity
                onPress={removePhoto(index)}
                style={rvst.pressImg}>
                <Image
                  style={appst.icon10}
                  source={require('../../../assets/icons/del_img.png')}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <View style={rvst.view1}>
        <TextInput
          style={rvst.input}
          multiline={true}
          onChangeText={e => setText(e)}
          value={text}
          placeholder={t('review.placeholder')}
        />
      </View>
    </View>
  );
};
export default ReviewItem;
