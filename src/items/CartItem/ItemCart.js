import {View, Text, TouchableOpacity, Image, ToastAndroid} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {itCart} from './style';
import appst from '../../constants/AppStyle';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import SweetAlert from 'react-native-sweet-alert';
import {deleteOneItemCard, updateCartItem} from '../../api/CartApi';
import {useNavigation} from '@react-navigation/native';

const ItemCart = ({
  item,
  cards,
  setCards,
  setTotalPrice,
  currentlyOpenSwipeable,
  setCurrentlyOpenSwipeable,
  checkedProducts,
  setCheckedProducts,
  isChecked,
  onCheckedChange,
}) => {
  const [productQuantity, setProductQuantity] = useState(item.quantity);
  const navigation = useNavigation();

  const handlePress = () => {
    onCheckedChange(item, !isChecked);
  };

  useEffect(() => {
    if (isChecked) {
      setCheckedProducts(prev => {
        if (!prev.some(cart => cart._id === item._id)) {
          return [...prev, item];
        }
        return prev;
      });
    } else {
      setCheckedProducts(prev => prev.filter(cart => cart._id !== item._id));
    }
  }, [isChecked]);

  const calculateTotalPrice = products => {
    const total = products.reduce((sum, product) => {
      return sum + product.product_id.price * product.quantity;
    }, 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    calculateTotalPrice(checkedProducts);
  }, [checkedProducts]);

  const tangSL = async () => {
    setProductQuantity(prev => {
      const newQuantity = prev + 1;
      // Cập nhật tổng giá khi quantity thay đổi
      const updatedCards = checkedProducts.map(cart =>
        cart._id === item._id ? {...cart, quantity: newQuantity} : cart,
      );
      setCheckedProducts(updatedCards);
      return newQuantity;
    });
  };

  const giamSL = async () => {
    if (productQuantity > 1) {
      setProductQuantity(prev => {
        const newQuantity = prev - 1;
        // Cập nhật danh sách sản phẩm đã chọn
        const updatedCards = checkedProducts.map(cart =>
          cart._id === item._id ? {...cart, quantity: newQuantity} : cart,
        );
        setCheckedProducts(updatedCards);
        return newQuantity;
      });
    } else {
      SweetAlert.showAlertWithOptions(
        {
          title: 'Remove Item?',
          subTitle: `Oops. Bạn có chắc chắn muốn xóa sản phẩm này không?`,
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          style: 'error',
          cancellable: true,
        },
        () => {
          setProductQuantity(0);
          setCheckedProducts(
            checkedProducts.filter(cart => cart._id !== item._id),
          );
          setCards(cards.filter(cart => cart._id !== item._id));
        },
      );
    }
  };

  useEffect(() => {
    const updateQuantity = async () => {
      try {
        const productData = {
          product_id: item.product_id._id,
          size_id: item.size_id._id,
          quantity: productQuantity,
        };
        const response = await updateCartItem(productData);
        if (response.status) {
          console.log('Cập nhật so luong cart thành công');
        } else {
          console.log('Cập nhật so luong cart thất bại');
        }
      } catch (error) {
        SweetAlert.showAlertWithOptions({
          title: 'Oops...',
          subTitle: `Oops. Đang xảy ra lỗi ${error} rồi. Bạn đợi một chút nhé <3`,
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          style: 'error',
          cancellable: true,
        });
      }
    };

    updateQuantity();
    return () => {};
  }, [productQuantity]);

  const imageAssets =
    item.product_id.assets &&
    item.product_id.assets.filter(asset => {
      return asset.match(/\.(jpeg|jpg|png|gif)$/);
    });

  const imageUrl =
    imageAssets && imageAssets.length > 0 ? imageAssets[0] : null;

  const swipeableRef = useRef(null);

  const deleteItemFromCard = async () => {
    try {
      const body = {
        product_id: item.product_id._id,
        size_id: item.size_id._id,
      };
      console.log('body delete cart: ', body);

      const response = await deleteOneItemCard(body);
      if (response.status) {
        setCards(prevCards => prevCards.filter(cart => cart._id !== item._id));
        setCheckedProducts(prevChecked =>
          prevChecked.filter(cart => cart._id !== item._id),
        );
        ToastAndroid.show('Da xoa sp', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Loi server', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('error delete item card->', error);
    }
  };

  const rightSwipeable = () => {
    return (
      <View style={itCart.deleteContainer}>
        <TouchableOpacity onPress={deleteItemFromCard}>
          <Image
            style={appst.icon24}
            source={require('../../assets/icons/cart_del.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };

  // console.log('item', item);

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={rightSwipeable}
      onSwipeableOpen={() => {
        console.log('Swipeable opened');
        if (
          currentlyOpenSwipeable &&
          currentlyOpenSwipeable !== swipeableRef.current
        ) {
          currentlyOpenSwipeable.close();
        }
        setCurrentlyOpenSwipeable(swipeableRef.current);
      }}
      onSwipeableClose={() => {
        console.log('Swipeable closed');
        if (currentlyOpenSwipeable === swipeableRef.current) {
          setCurrentlyOpenSwipeable(null);
        }
      }}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductDetail', {index: item?.product_id?._id})
        }
        style={itCart.container}>
        <View style={[itCart.viewContainer, appst.rowStart]}>
          <TouchableOpacity
            onPress={e => {
              e.stopPropagation();
              handlePress();
            }}>
            <Image
              style={appst.icon24}
              source={
                !isChecked
                  ? require('../../assets/icons/icon_check.png')
                  : require('../../assets/icons/ppd_card_check.png')
              }
            />
          </TouchableOpacity>
          <Image
            style={itCart.image}
            source={{
              uri: imageUrl
                ? imageUrl
                : 'https://i.pinimg.com/236x/6a/f1/ec/6af1ec6645410a41d5339508a83b86f9.jpg',
            }}
          />
          <View style={[appst.columnSb, itCart.viewQuatity]}>
            <Text numberOfLines={1} style={itCart.name}>
              {item && item.product_id.name}
            </Text>
            <Text style={itCart.price}>
              ${item.product_id.price.toLocaleString('vi-VN')}
            </Text>
            <Text style={itCart.price}>Size: {item.size_id.name}</Text>
            <View style={[appst.rowCenter, itCart.view]}>
              <TouchableOpacity
                onPress={e => {
                  e.stopPropagation();
                  tangSL();
                }}>
                <Image source={require('../../assets/icons/increase.png')} />
              </TouchableOpacity>
              <Text style={itCart.quatity}>{productQuantity}</Text>
              <TouchableOpacity
                style={{padding: 5}}
                onPress={e => {
                  e.stopPropagation();
                  giamSL();
                }}>
                <Image source={require('../../assets/icons/decrease.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default ItemCart;
