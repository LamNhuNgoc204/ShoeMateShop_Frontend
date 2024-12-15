import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {bottomSheetStyle} from './style';
import appst from '../../constants/AppStyle';
import {addItemToCartApi} from '../../api/CartApi';
import {useNavigation} from '@react-navigation/native';
import {setOrderData, setToltalPrice} from '../../redux/reducer/cartReducer';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {formatPrice} from '../../utils/functions/formatData';

const BottomSheetContent = ({
  dispatch,
  product,
  sizes,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
  setSizeModalVisible,
  img,
  closeBottomSheet,
}) => {
  const [sizeId, setsizeId] = useState('');
  const [sizeDetailId, setsizeDetailId] = useState('');
  const navigation = useNavigation();
  const {t, i18n} = useTranslation();
  const lag = i18n.language;
  const isTokenValid = useSelector(state => state?.user?.isValidToken);

  useEffect(() => {
    if (sizes && sizes.length > 0 && !selectedSize) {
      setSelectedSize(sizes[0].sizeId.name);
      setsizeDetailId(sizes[0].sizeId._id);
      setsizeId(sizes[0]._id);
    }
  }, [sizes, selectedSize, setSelectedSize, setsizeId]);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => Math.max(prev - 1, 1));
    }
  };

  const increaseQuantity = () => {
    const availableQuantity =
      product.size.find(size => size._id === sizeId)?.quantity || 0;
    // console.log('availableQuantity', availableQuantity);

    if (quantity < availableQuantity) {
      setQuantity(prev => prev + 1);
    } else if (quantity === availableQuantity) {
      ToastAndroid.show(`${t('toast.limit_quantity')}`, ToastAndroid.SHORT);
    }
  };

  // console.log('body', product._id, ' ', sizeDetailId, '-', quantity);

  const addToCart = async () => {
    if (isTokenValid) {
      try {
        const itemCart = {
          product_id: product._id,
          size_id: sizeDetailId,
          quantity: quantity,
        };

        const response = await addItemToCartApi(itemCart);
        if (response.status) {
          setSizeModalVisible(false);
          ToastAndroid.show(`${t('toast.addtocart_succ')}`, ToastAndroid.SHORT);
          setSizeModalVisible(false);
          closeBottomSheet();
        } else {
          setSizeModalVisible(false);
          ToastAndroid.show(`${t('toast.subTitle_cart')}`, ToastAndroid.SHORT);
          setSizeModalVisible(false);
          closeBottomSheet();
        }
      } catch (error) {
        ToastAndroid.show(`${t('toast.del_err')}`, ToastAndroid.SHORT);
        setSizeModalVisible(false);
      }
    } else {
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
    }
  };

  // console.log('product', product?.size);

  const buyNow = () => {
    if (isTokenValid) {
      const productOrder = [
        {
          message: 'Buy Now',
          product_id: {
            _id: product._id,
            assets: img,
            name: product.name,
            price: product.price,
          },
          quantity: quantity,
          size_id: {_id: sizeDetailId, name: selectedSize},
        },
      ];

      // console.log('productOrder', productOrder);
      dispatch(setOrderData(productOrder));
      dispatch(setToltalPrice(product.price * quantity));
      closeBottomSheet();
      navigation.navigate('CheckOutScreen');
    } else {
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
    }
  };

  return (
    <View style={bottomSheetStyle.container}>
      <View style={bottomSheetStyle.topContainer}>
        <Image
          style={bottomSheetStyle.image}
          source={
            img.length > 0
              ? {uri: img[0]}
              : require('../../assets/images/placeholder_image.jpg')
          }
        />
        <View style={bottomSheetStyle.colContainer}>
          <Text style={bottomSheetStyle.priceText}>
            {lag === 'en' && '$'}
            {product.price && formatPrice(product.price, lag)}
            {lag === 'vi' && ' VNĐ '}
          </Text>
          <View style={bottomSheetStyle.handleCountContainer}>
            <TouchableOpacity
              onPress={() => decreaseQuantity()}
              style={bottomSheetStyle.minBotton}>
              <Text style={bottomSheetStyle.minText}>-</Text>
            </TouchableOpacity>
            <Text style={bottomSheetStyle.handleCountText}>{quantity}</Text>
            <TouchableOpacity onPress={() => increaseQuantity()}>
              <Image
                style={bottomSheetStyle.handleCountBtn}
                source={require('../../assets/icons/add_id.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={bottomSheetStyle.line} />

      <View style={bottomSheetStyle.bottomContainer}>
        <Text style={bottomSheetStyle.sizeText}>{t('products.size')}</Text>
        <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
          {sizes &&
            sizes.map((size, i) => {
              const isSelected = selectedSize === size.sizeId.name;
              const isOutOfStock = size.quantity === 0;

              return (
                <TouchableOpacity
                  onPress={() => {
                    if (!isOutOfStock) {
                      setsizeDetailId(size.sizeId._id);
                      setSelectedSize(size.sizeId.name);
                      setsizeId(size._id);
                    }
                  }}
                  disabled={isOutOfStock} 
                  key={i.toString()}
                  style={[
                    bottomSheetStyle.sizeTouchableOpacity,
                    isSelected && bottomSheetStyle.sizeSelct,
                    isOutOfStock && bottomSheetStyle.sizeDisabled,
                  ]}>
                  <Text
                    style={[
                      bottomSheetStyle.textSizeItem,
                      isSelected && {color: 'white'},
                    ]}>
                    {size.sizeId.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>

        <View style={appst.rowCenter}>
          <TouchableOpacity
            onPress={() => addToCart()}
            style={bottomSheetStyle.buyButton}>
            <Text style={bottomSheetStyle.txtPress}>
              {t('buttons.btn_addtocart')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => buyNow()}
            style={bottomSheetStyle.buyButton}>
            <Text style={bottomSheetStyle.txtPress}>
              {t('buttons.btn_buynow')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BottomSheetContent;
