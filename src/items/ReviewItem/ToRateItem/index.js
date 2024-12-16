import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {rtit} from './style';
import appst from '../../../constants/AppStyle';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

const RatingItem = ({item}) => {
  const {t} = useTranslation();
  const product = item && item.product && item.product;
  const navigation = useNavigation();
  const pd = product && product[0].product;
  // const productPreview = item && item.product;

  // console.log('product rating', product);
  // console.log('pd rating', pd);
  // console.log('item', item);

  // console.log('productPreview =>', item.product);

  return (
    <>
      {pd && (
        <View style={rtit.container}>
          <Text style={rtit.code}>
            {t('rating.code')}: {item._id && item._id.toUpperCase()}
          </Text>
          <View style={rtit.itemContainer}>
            <Image
              style={rtit.img}
              source={
                pd && pd.pd_image && pd.pd_image[0]
                  ? {uri: pd.pd_image[0]}
                  : require('../../../assets/images/placeholder_image.jpg')
              }
            />
            <Text style={rtit.name}>{pd?.name}</Text>
          </View>
          <View style={[appst.rowCenter, rtit.view]}>
            <Text style={rtit.time}>7 days left to review</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MultiProductReviewForm', {
                  products: item.product,
                  orderId: item._id,
                })
              }
              style={rtit.press}>
              <Text style={rtit.textTouch}>{t('buttons.btn_review')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default RatingItem;
