import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {launchImageLibrary} from 'react-native-image-picker';
import appst from '../../../constants/AppStyle';
import rvst from '../../../screens/Review/style';
import StarRating from '../../StarRating';
import Video from 'react-native-video';
import {uploadMediaToCloudinary} from '../../../utils/functions/uploadImage';
import Loading from '../../../components/Loading';

const ReviewItem = ({product, onReviewChange}) => {
  const {t} = useTranslation();
  const [rating, setRating] = useState();
  const [comment, setComment] = useState('');
  const pd = product;
  const [photos, setPhotos] = useState([]);
  const [video, setVideo] = useState(null);
  const [loadingImg, setloadingImg] = useState(true);
  // console.log('pd', product);

  const handleRatingChange = newRating => {
    setRating(newRating);
    onReviewChange(product.id, {
      rating: newRating,
      comment,
      images: photos,
      video,
    });
  };

  const handleCommentChange = newComment => {
    setComment(newComment);
    onReviewChange(product.id, {
      rating,
      comment: newComment,
      images: photos,
      video,
    });
  };

  useEffect(() => {
    onReviewChange(product.id, {rating, comment, images: photos, video});
  }, [photos, video]);

  const selectImages = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 5 - photos.length,
      },
      async response => {
        if (
          !response.didCancel &&
          response.assets &&
          response.assets.length > 0
        ) {
          const localPhotos = response.assets;
          setloadingImg(false);
          try {
            const uploadedPhotos = await Promise.all(
              localPhotos.map(photo => uploadMediaToCloudinary(photo, 'image')),
            );
            console.log('Uploaded Photos:', uploadedPhotos);
            if (uploadedPhotos && uploadedPhotos.length > 0) {
              setPhotos(prevPhotos => [...prevPhotos, ...uploadedPhotos]);
            }
          } catch (error) {
            console.error('Error uploading photos:', error);
          } finally {
            setloadingImg(true);
          }
        }
      },
    );
  };
  console.log('--------->', photos);

  const selectVideo = () => {
    launchImageLibrary(
      {
        mediaType: 'video',
        selectionLimit: 1,
      },
      async response => {
        if (!response.didCancel && response.assets && response.assets[0]) {
          setloadingImg(true);
          try {
            const videoUrl = await uploadMediaToCloudinary(
              response.assets[0],
              'video',
            );
            setVideo(videoUrl);
          } catch (error) {
            console.error('Error uploading video:', error);
          } finally {
            setloadingImg(false);
          }
        }
      },
    );
  };

  // console.log('rating=======>', rating);

  const removePhoto = index => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
  };

  const removeVideo = () => {
    setVideo(null);
  };

  return (
    <View style={[appst.container, rvst.container]}>
      {loadingImg ? (
        <>
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
              onStarPress={handleRatingChange}
            />
          </View>

          {(photos.length === 0 || video) && (
            <View style={[appst.rowCenter, rvst.viewAsset]}>
              <TouchableOpacity
                onPress={selectImages}
                style={[rvst.viewBorder]}>
                <Image source={require('../../../assets/icons/addphoto.png')} />
                <Text style={rvst.text}>{t('review.photo')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={selectVideo} style={[rvst.viewBorder]}>
                <Image source={require('../../../assets/icons/addvideo.png')} />
                <Text style={rvst.text}>{t('review.video')}</Text>
              </TouchableOpacity>
            </View>
          )}

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {video && !photos ? (
              <View style={appst.rowStart}>
                <View style={[rvst.imgContainer, rvst.flatImg]}>
                  <Video
                    source={{
                      uri: video,
                      // 'https://res.cloudinary.com/dt7755ppx/video/upload/v1731395274/z8gmmh0qmfqd0ee5fcan.mp4',
                    }}
                    style={[rvst.imgRate]}
                    controls={true}
                    resizeMode="cover"
                  />
                  <TouchableOpacity
                    onPress={() => removeVideo()}
                    style={rvst.pressImg}>
                    <Image
                      style={appst.icon10}
                      source={require('../../../assets/icons/del_img.png')}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={[rvst.rate, rvst.flatImg]}>
                  <Image
                    source={require('../../../assets/icons/photocam.png')}
                    style={appst.icon20}
                  />
                  <Text>{photos.length}/5</Text>
                </TouchableOpacity>
              </View>
            ) : null}

            {photos.length !== 0 && (
              <View style={appst.rowStart}>
                <FlatList
                  style={rvst.flatImg}
                  data={photos}
                  horizontal={true}
                  scrollEnabled={false}
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
                        onPress={() => removePhoto(index)}
                        style={rvst.pressImg}>
                        <Image
                          style={appst.icon10}
                          source={require('../../../assets/icons/del_img.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                />
                {photos.length < 5 && (
                  <TouchableOpacity
                    onPress={() => selectImages()}
                    style={[rvst.rate]}>
                    <Image
                      source={require('../../../assets/icons/photocam.png')}
                      style={appst.icon20}
                    />
                    <Text>{photos.length}/5</Text>
                  </TouchableOpacity>
                )}
                {!video && (
                  <TouchableOpacity style={[rvst.rate, rvst.flatImg]}>
                    <Image
                      source={require('../../../assets/icons/videocam.png')}
                      style={appst.icon20}
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}
          </ScrollView>
          <View style={rvst.view1}>
            <TextInput
              style={rvst.input}
              multiline={true}
              onChangeText={handleCommentChange}
              value={comment}
              placeholder={t('review.placeholder')}
            />
          </View>
        </>
      ) : (
        <Loading />
      )}
    </View>
  );
};
export default ReviewItem;
