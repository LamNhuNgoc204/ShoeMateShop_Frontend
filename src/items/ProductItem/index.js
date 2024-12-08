import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import productStyle from './style';
import {checkTokenValidity} from '../../utils/functions/checkToken';
import {useTranslation} from 'react-i18next';

const ProductItem = ({handleHeartPress, product, style, wishlist = []}) => {
  const [liked, setLiked] = React.useState(false);
  const navigation = useNavigation();
  const {t} = useTranslation();

  React.useEffect(() => {
    setLiked(wishlist.find(e => e._id == product?._id) !== undefined);
  }, [wishlist]);

  const handleLike = async () => {
    const isTokenValid = await checkTokenValidity();
    if (!isTokenValid) {
      // navigation.navigate('RequireLogin');
      Alert.alert(
        t('home.noti'),
        t('cart.sub_title1'),
        [
          {
            text: t('buttons.cancel'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              return navigation.replace('LoginScreen');
            },
          },
        ],
        {cancelable: false},
      );
      return;
    }

    setLiked(!liked);
    handleHeartPress(product, liked);
  };

  const imageAssets =
    product?.assets &&
    product?.assets.filter(asset => {
      return asset.match(/\.(jpeg|jpg|png|gif)$/);
    });

  const imageUrl =
    imageAssets && imageAssets.length > 0 ? imageAssets[0] : null;

  function onProductDetail() {
    navigation.navigate('ProductDetail', {index: product?._id});
  }

  return (
    <>
      {product?._id !== 'empty' ? (
        <TouchableOpacity
          onPress={onProductDetail}
          style={[
            productStyle.container,
            style,
            {
              marginHorizontal: 10,
            },
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
              {product?.name}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[productStyle.marginTop5, productStyle.maxWidth100]}>
              <Image
                style={productStyle.icon14}
                source={require('../../assets/icons/star.png')}
              />
              <Text style={productStyle.text14}>{product?.avgRating}</Text>
              <Text style={productStyle.review}>
                ({product?.numOfReviews} reviews)
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
                  {product?.price && product?.price.toLocaleString('vi-VN')}
                </Text>
              </Text>
              <TouchableOpacity onPress={handleLike}>
                {!liked ? (
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
      ) : (
        <View
          style={[
            productStyle.container1,
            style,
            {
              marginHorizontal: 10,
            },
          ]}
        />
      )}
    </>
  );
};

export default ProductItem;
