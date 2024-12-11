import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import mrvit from './style';
import appst from '../../../constants/AppStyle';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {formatDate} from '../../../utils/functions/formatData';

const MyReviewItem = ({item}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const reviewer = item.reviewer_id;
  const product = item.product_id;

  const ArrayRating = length => {
    let arr = [];
    for (let i = 0; i < length; i++) {
      arr.push(i);
    }
    return arr;
  };

  // console.log('item user review', item);
  // console.log('product', product);
  // console.log('iimages', item.images);

  return (
    <View style={[mrvit.itemContainer]}>
      <Image
        style={mrvit.avatar}
        source={
          reviewer && reviewer.avatar
            ? {uri: reviewer.avatar}
            : require('../../../assets/images/placeholder_image.jpg')
        }
      />
      <View style={mrvit.body}>
        <View style={mrvit.viewInf}>
          <Text style={mrvit.name}>{reviewer && reviewer.name}</Text>
          <View style={mrvit.viewRate}>
            {ArrayRating(item.rating).map(index => (
              <Image
                key={index}
                style={mrvit.icon}
                source={require('../../../assets/icons/stars.png')}
              />
            ))}
          </View>
        </View>

        <Text style={mrvit.time}>{formatDate(item.createdAt)}</Text>
        <Text style={mrvit.time}>
          {t('products.size')}: {item.size}
        </Text>
        {item.comment && (
          <Text numberOfLines={3} style={mrvit.content}>
            {item.comment}
          </Text>
        )}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={mrvit.imgContainer}>
          {item?.images.map((item, index) => (
            <View key={index} style={mrvit.imageContainer}>
              <Image source={{uri: item}} style={mrvit.imageRv} />
              {/* {item.type === 'video' && (
                <View style={mrvit.videoOverlay}>
                  <Text style={mrvit.videoDuration}>{item.duration}</Text>
                </View>
              )} */}
            </View>
          ))}
        </ScrollView>

        {item.response && item.response.content && (
          <View style={mrvit.viewRp}>
            <Text style={mrvit.response}>{t('review.response')}</Text>
            <Text style={mrvit.rpContent}>
              {item.response && item.response.content}
            </Text>
          </View>
        )}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProductDetail', {index: product._id})
          }
          style={[appst.rowStart, mrvit.item]}>
          <Image
            style={mrvit.imageRv}
            source={
              product && product.assets[0]
                ? {uri: product.assets[0]}
                : require('../../../assets/images/placeholder_image.jpg')
            }
          />
          <Text numberOfLines={1} style={mrvit.pdName}>
            {product && product.name}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyReviewItem;
