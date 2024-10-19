import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {itCart} from './style';
import appst from '../../constants/AppStyle';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import SweetAlert from 'react-native-sweet-alert';
import {updateCartItem} from '../../api/CartApi';

const ItemCart = ({
  item,
  cards,
  setCards,
  currentlyOpenSwipeable,
  setCurrentlyOpenSwipeable,
  checkedProducts,
  setCheckedProducts,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [productQuantity, setProductQuantity] = useState(item.quantity);
  // console.log('so luong sp => ', productQuantity);

  const handlePress = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (isChecked) {
      setCheckedProducts([...checkedProducts, item]);
    } else {
      setCheckedProducts(checkedProducts.filter(item => item._id !== item._id));
    }
  }, [isChecked]); // Sử dụng isChecked làm dependency
  console.log('checkedProducts====', checkedProducts);

  const tangSL = async () => {
    setProductQuantity(prev => prev + 1);
    // console.log(productQuantity);
  };

  const giamSL = async () => {
    if (productQuantity > 1) {
      setProductQuantity(prev => prev - 1);
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
    item.assets &&
    item.assets.filter(asset => {
      return asset.match(/\.(jpeg|jpg|png|gif)$/);
    });

  const imageUrl =
    imageAssets && imageAssets.length > 0 ? imageAssets[0] : null;

  const swipeableRef = useRef(null);

  const rightSwipeable = () => {
    return (
      <View style={itCart.deleteContainer}>
        <TouchableOpacity onPress={() => console.log('Delete success')}>
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
            <Text style={itCart.name}>{item && item.product_id.name}</Text>
            <Text style={itCart.price}>
              ${item.product_id.price.toLocaleString('vi-VN')}
            </Text>
            <Text style={itCart.price}>Size: {item.size_id.name}</Text>
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
