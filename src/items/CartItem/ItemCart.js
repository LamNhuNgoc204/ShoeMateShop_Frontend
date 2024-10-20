import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {itCart} from './style';
import appst from '../../constants/AppStyle';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import SweetAlert from 'react-native-sweet-alert';
import {deleteOneItemCard, updateCartItem} from '../../api/CartApi';
import Toast from 'react-native-toast-message';

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
    const newQuantity = productQuantity + 1;
    setProductQuantity(newQuantity);
    await updateQuantity(newQuantity);
  };


  const giamSL = async () => {
    if (productQuantity > 1) {
      const newQuantity = productQuantity - 1;
      setProductQuantity(newQuantity);
      await updateQuantity(newQuantity);
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
        async () => {
          setProductQuantity(0);
          await updateQuantity(0); // Remove item
          setCheckedProducts(prev => prev.filter(cart => cart._id !== item._id));
          setCards(prev => prev.filter(cart => cart._id !== item._id));
        },
      );
    }
  };

  const updateQuantity = async (quantity) => {
    try {
      const productData = {
        product_id: item.product_id,
        size_name: item.sizeName,
        quantity: quantity,
      };
      console.log("Data: ", productData);
      const response = await updateCartItem(productData);
      if (response.status) {
        console.log('Cập nhật số lượng giỏ hàng thành công');
      } else {
        console.log('Cập nhật số lượng giỏ hàng thất bại');
      }
    } catch (error) {
      console.error('Error updating quantity: ', error);
      SweetAlert.showAlertWithOptions({
        title: 'Oops...',
        subTitle: `Oops. Đang xảy ra lỗi ${error.message || error} rồi. Bạn đợi một chút nhé <3`,
        confirmButtonTitle: 'OK',
        confirmButtonColor: '#000',
        style: 'error',
        cancellable: true,
      });
    }
  };

  const imageAssets =
  item &&
  item.product_id &&
  item.assets.filter(asset => {
    return asset.match(/\.(jpeg|jpg|png|gif)$/);
  });

const imageUrl =
  imageAssets && imageAssets.length > 0 ? imageAssets[0] : 'https://i.pinimg.com/236x/6a/f1/ec/6af1ec6645410a41d5339508a83b86f9.jpg'; // Giá trị mặc định nếu không có ảnh

  const swipeableRef = useRef(null);

  const deleteItemFromCard = async () => {
    try {
      const body = {
        product_id: item.product_id,
        size_name: item.sizeName,
      };
      console.log('body delete cart: ', body);

      const response = await deleteOneItemCard(body);
      if (response.status) {
        setCards(prevCards => prevCards.filter(cart => cart._id !== item._id));
        setCheckedProducts(prevChecked =>
          prevChecked.filter(cart => cart._id !== item._id),
        );
        Toast.show({
          text1: 'Thông báo thành công',
          text2: 'Đã xóa sản phẩm',
          type: 'success',
          position: 'bottom',
          visibilityTime: 3000,
          autoHide: true,
        });
      } else {
        Toast.show({
          text1: 'Thông báo xảy ra lỗi',
          text2: 'Lỗi server',
          type: 'error',
          position: 'bottom',
          visibilityTime: 3000, // Thời gian hiển thị (mili giây)
          autoHide: true, // Tự động ẩn
          // topOffset: 30, // Khoảng cách từ trên cùng
          // bottomOffset: 40, // Khoảng cách từ dưới cùng
        });
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

  console.log();

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
      <View style={itCart.container}>
        <View style={[itCart.viewContainer, appst.rowStart]}>
          <TouchableOpacity onPress={handlePress}>
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
              {item && item.name}
            </Text>
            <Text style={itCart.price}>
              ${item.price.toLocaleString('vi-VN')}
            </Text>
            <Text style={itCart.price}>Size: {item.sizeName}</Text>
            <View style={[appst.rowCenter, itCart.view]}>
              <TouchableOpacity onPress={tangSL}>
                <Image source={require('../../assets/icons/increase.png')} />
              </TouchableOpacity>
              <Text style={itCart.quatity}>{productQuantity}</Text>
              <TouchableOpacity onPress={giamSL}>
                <Image source={require('../../assets/icons/decrease.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

export default ItemCart;