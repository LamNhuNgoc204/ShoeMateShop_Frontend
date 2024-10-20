import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import productStyle from './style';

const ProductItem = ({handleHeartPress, product, style}) => {
  // console.log('product', product);
  const id = product._id ? product._id : product.product_id._id;

  const navigation = useNavigation();
  const imageAssets = product.assets
    ? product.assets.filter(asset => {
        return asset.match(/\.(jpeg|jpg|png|gif)$/);
      })
    : product.product_id.assets.filter(asset => {
        return asset.match(/\.(jpeg|jpg|png|gif)$/);
      });

  const imageUrl =
    imageAssets && imageAssets.length > 0 ? imageAssets[0] : null;

  function onProductDetail() {
    navigation.navigate('ProductDetail', {index: product._id});
  }

  return (
    <TouchableOpacity
      onPress={onProductDetail}
      style={[
        productStyle.container,
        style,
        {
          marginRight: 20,
        },
        // index % 2 == 0 && productStyle.marginRight20,
      ]}>
      <Image
        style={productStyle.image}
        source={
          imageUrl
            ? {uri: imageUrl}
            : require('../../assets/images/placeholder_image.jpg')
        }
      />
      <View style={productStyle.contentContainer}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[productStyle.text14, productStyle.maxWidth100]}>
          {product.name ? product.name : product.product_id.name}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[productStyle.marginTop5, productStyle.maxWidth100]}>
          <Image
            style={productStyle.icon14}
            source={require('../../assets/icons/star.png')}
          />
          <Text style={productStyle.text14}>{product.avgRating}</Text>
          <Text style={productStyle.review}>
            ({product.numOfReviews} reviews)
          </Text>
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
              {product.price
                ? product.price.toLocaleString('vi-VN')
                : product.product_id.price.toLocaleString('vi-VN')}
            </Text>
          </Text>
          <TouchableOpacity
            onPress={() => handleHeartPress(id, product.isFavorite)}>
            {!product.isFavorite ? (
              <Image
                style={productStyle.icon21}
                source={require('../../assets/icons/heart.png')}
              />
            ) : (
              <Image
                style={productStyle.icon21}
                source={require('../../assets/icons/heart_select.png')}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
