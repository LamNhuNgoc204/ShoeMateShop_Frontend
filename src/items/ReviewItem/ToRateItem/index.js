import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {rtit} from './style';
import appst from '../../../constants/AppStyle';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

const RatingItem = ({item}) => {
  const {t} = useTranslation();
  const product = item.product;
  const navigation = useNavigation();

  // console.log('item rating', product);

  return (
    <View style={rtit.container}>
      <Text style={rtit.code}>
        {t('rating.code')}:{' '}
        {item._id &&
          item._id.slice(0, 10) &&
          item._id.slice(0, 10).toUpperCase()}
      </Text>
      <View style={rtit.itemContainer}>
        <Image
          style={rtit.img}
          source={
            product.pd_image && product.pd_image[0]
              ? {uri: product.pd_image[0]}
              : require('../../../assets/images/placeholder_image.jpg')
          }
        />
        <Text style={rtit.name}>{product.name}</Text>
      </View>
      <View style={[appst.rowCenter, rtit.view]}>
        <Text style={rtit.time}>7 days left to review</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Review', {product: product})}
          style={rtit.press}>
          <Text style={rtit.textTouch}>{t('buttons.btn_review')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RatingItem;
