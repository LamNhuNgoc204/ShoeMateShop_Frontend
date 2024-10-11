import {View, Text, Image} from 'react-native';
import React from 'react';
import productStyle from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ProductItem = ({product, index, onProductPress, onHeartPress, style}) => {
  const imageAssets = product.assets.filter(asset => {
    return asset.match(/\.(jpeg|jpg|png|gif)$/);
  });

  const imageUrl = imageAssets.length > 0 ? imageAssets[0] : null;

  return (
    <TouchableOpacity
      onPress={onProductPress}
      style={[
        productStyle.container,
        style,
        index % 2 == 0 && productStyle.marginRight20,
      ]}>
      <Image
        style={productStyle.image}
        source={
          imageUrl ? {uri: imageUrl} : require('../../assets/images/nike1.png')
        }
      />
      <View style={productStyle.contentContainer}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[productStyle.text14, productStyle.maxWidth100]}>
          {product.name}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[productStyle.marginTop5, productStyle.maxWidth100]}>
          <Image
            style={productStyle.icon14}
            source={require('../../assets/icons/star.png')}
          />
          <Text style={productStyle.text14}>4.5</Text>
          <Text style={productStyle.review}>(1.5k reviews)</Text>
        </Text>
        <View
          style={[
            productStyle.priceContainer,
            productStyle.marginTop5,
            productStyle.maxWidth100,
          ]}>
          <Text numberOfLines={1} ellipsizeMode="tail">
            <Text style={productStyle.dolar}>$</Text>{' '}
            <Text style={productStyle.text14}>
              {product.price.toLocaleString('vi-VN')}đ
            </Text>
          </Text>
          <TouchableOpacity onPress={onHeartPress}>
            <Image
              style={productStyle.icon21}
              source={require('../../assets/icons/heart.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
