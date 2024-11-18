import {View, Text, TouchableOpacity, Image, ToastAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import {bottomSheetStyle} from './style';
import appst from '../../constants/AppStyle';
import {addItemToCartApi} from '../../api/CartApi';
import {useNavigation} from '@react-navigation/native';
import {setOrderData, setToltalPrice} from '../../redux/reducer/cartReducer';

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
}) => {
  const [sizeId, setsizeId] = useState('');
  const [sizeDetailId, setsizeDetailId] = useState('');
  const navigation = useNavigation();

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
      ToastAndroid.show('Bạn đã đặt số lượng tối đa', ToastAndroid.SHORT);
    }
  };

  console.log('body', product._id, ' ', sizeDetailId, '-', quantity);

  const addToCart = async () => {
    try {
      const itemCart = {
        product_id: product._id,
        size_id: sizeDetailId,
        quantity: quantity,
      };

      const response = await addItemToCartApi(itemCart);
      if (response.status) {
        setSizeModalVisible(false);
        ToastAndroid.show('Thêm vào giỏ hàng thành công', ToastAndroid.SHORT);
        setSizeModalVisible(false);
      } else {
        setSizeModalVisible(false);
        ToastAndroid.show(
          'Oops. Xảy ra lỗi rồi. Thử lại nhé :3',
          ToastAndroid.SHORT,
        );
        setSizeModalVisible(false);
      }
    } catch (error) {
      ToastAndroid.show(
        'Lỗi trong quá trình thêm vào giỏ hàng',
        ToastAndroid.SHORT,
      );
      setSizeModalVisible(false);
    }
  };

  // console.log('product', product?.size);

  const buyNow = () => {
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

    console.log('productOrder', productOrder);
    dispatch(setOrderData(productOrder));
    dispatch(setToltalPrice(product.price * quantity));
    navigation.navigate('CheckOutScreen');
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
            ${product.price && product.price.toLocaleString('vi-VN')}
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
        <Text style={bottomSheetStyle.sizeText}>Size</Text>
        <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
          {sizes &&
            sizes.map((size, i) => {
              const isSelected = selectedSize === size.sizeId.name;
              return (
                <TouchableOpacity
                  onPress={() => {
                    setsizeDetailId(size.sizeId._id);
                    setSelectedSize(size.sizeId.name);
                    setsizeId(size._id);
                  }}
                  key={i.toString()}
                  style={[
                    bottomSheetStyle.sizeTouchableOpacity,
                    isSelected && bottomSheetStyle.sizeSelct,
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
            <Text style={bottomSheetStyle.txtPress}>Add To Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => buyNow()}
            style={bottomSheetStyle.buyButton}>
            <Text style={bottomSheetStyle.txtPress}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BottomSheetContent;
