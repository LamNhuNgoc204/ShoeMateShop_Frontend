import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {cartst} from './style';
import {spacing} from '../../constants';
import { View, Text, FlatList, TouchableOpacity, Image, ToastAndroid, Modal, TouchableHighlight} from 'react-native';
import Header from '../../components/Header';
import appst from '../../constants/AppStyle';
import { CustomedButton } from '../../components';
import ItemCart from '../../items/CartItem/ItemCart';
import {getUserCard} from '../../api/CartApi';
import {useDispatch, useSelector} from 'react-redux';
import {setOrderData, setToltalPrice} from '../../redux/reducer/cartReducer';
import Loading from '../../components/Loading';
import {useFocusEffect} from '@react-navigation/native';
import ProductItem from '../../items/ProductItem';

const CartScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [currentlyOpenSwipeable, setCurrentlyOpenSwipeable] = useState(null);
  const [cards, setCards] = useState([]);
  const dispatch = useDispatch();
  const productState = useSelector(state => state.products);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [refreshing, setRefreshing] = useState(false);


  const fetchCard = async () => {
    try {
      setRefreshing(true);
      const response = await getUserCard();
      if (response.status) {
        setCards(response.data);
        setCheckedProducts([]);
        setIsAllChecked(false);
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setRefreshing(false); // Kết thúc refreshing
    }
  };

  // Sử dụng useFocusEffect để gọi lại API mỗi khi màn hình được mount
  useFocusEffect(
    React.useCallback(() => {
      fetchCard();
    }, []),
  );
  // console.log('cards', cards);


  const handleDeleteAllCart = async () => {
    try {
      const response = await deleteAllCart();
      if (response.status) {
        ToastAndroid.show('Đã xóa toàn bộ giỏ hàng', ToastAndroid.SHORT);
        setCards([]);
        fetchCard();
      } else {
        ToastAndroid.show('Lỗi từ server', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('Lỗi xóa toàn bộ giỏ hàng ->', error);
      ToastAndroid.show('Lỗi xóa giỏ hàng', ToastAndroid.SHORT);
    }
  };

  const showDeleteModal = () => {
    setIsModalVisible(true);
  };

  const hideDeleteModal = () => {
    setIsModalVisible(false);
  };

  const confirmDeleteAllCart = () => {
    hideDeleteModal();
    handleDeleteAllCart();
  };

  const handleSelectAll = () => {
    if (isAllChecked) {
      setCheckedProducts([]);
      setTotalPrice(0);
    } else {
      setCheckedProducts(cards);
      const total = cards.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      setTotalPrice(total);
    }
    setIsAllChecked(!isAllChecked);
  };

  const handleCheckedChange = (item, isChecked) => {
    setCheckedProducts(prev => {
      if (isChecked) {
        return [...prev, item];
      }
      return prev.filter(cart => cart._id !== item._id);
    });
  };

  useEffect(() => {
    const allChecked =
      checkedProducts.length === cards.length && cards.length > 0;
    setIsAllChecked(allChecked);
  }, [checkedProducts, cards]);

  useEffect(() => {
    const total = checkedProducts.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    setTotalPrice(total);
  }, [checkedProducts]);

  const handleOrder = () => {
    if (checkedProducts.length === 0) {
      ToastAndroid.show('Vui lòng chọn sản phẩm', ToastAndroid.SHORT);
    } else {
      dispatch(setOrderData([checkedProducts]));
      dispatch(setToltalPrice(totalPrice));
      navigation.navigate('CheckOutScreen');
    }
  };

  return (
    <View style={[appst.container, cartst.container]}>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={hideDeleteModal}
      >
        <View style={cartst.modalContainer}>
          <View style={cartst.modalContent}>
            <Text style={cartst.modalText}>{t('Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng không?')}</Text>
            <View style={cartst.modalButtons}>
              <TouchableHighlight
                style={[cartst.modalButton, cartst.modalCancelButton]}
                underlayColor="#bbb"
                onPress={hideDeleteModal}
              >
                <Text style={cartst.modalButtonText}>{t('Hủy')}</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[cartst.modalButton, cartst.modalDeleteButton]}
                underlayColor="#ff6666"
                onPress={confirmDeleteAllCart}
              >
                <Text style={cartst.modalButtonText}>{t('Xóa')}</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>

      <View style={cartst.header}>
        <Header
          leftOnPress={() => navigation.goBack()}
          background={'#fff'}
          iconLeft={require('../../assets/icons/back.png')}
          iconRight={require('../../assets/icons/del_card.png')}
          name={t('home.cart')}
          rightOnPress={showDeleteModal}
        />
      </View>
      <View style={cartst.viewBody}>
        <Text style={cartst.text1}>
          {cards.length} {t('home.item')}
        </Text>
        {cards.length === 0 ? (
          <ScrollView>
            <Image
              style={cartst.placeholder}
              source={require('../../assets/images/shopping.jpg')}
            />
            <TouchableOpacity
              style={{marginBottom: 20}}
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{name: 'BottomNav'}],
                })
              }>
              <Text style={cartst.text}>Bat dau mua sam ngay</Text>
            </TouchableOpacity>
            <View style={appst.center}>
              <FlatList
                data={productState.products}
                renderItem={({item, index}) => (
                  <ProductItem product={item} index={index} />
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                style={{marginLeft: 20}}
              />
            </View>
          </ScrollView>
        ) : (
          <FlatList
            style={cartst.flat}
            data={cards}
            renderItem={({item}) => (
              <ItemCart
                item={item}
                setCards={setCards}
                cards={cards}
                setTotalPrice={setTotalPrice}
                checkedProducts={checkedProducts}
                setCheckedProducts={setCheckedProducts}
                currentlyOpenSwipeable={currentlyOpenSwipeable}
                setCurrentlyOpenSwipeable={setCurrentlyOpenSwipeable}
                isChecked={checkedProducts.some(cart => cart._id === item._id)}
                onCheckedChange={handleCheckedChange}
              />
            )}
            extraData={item => item.id}
            ItemSeparatorComponent={<View style={{marginBottom: spacing.sm}} />}
            showsVerticalScrollIndicator={false}
            onRefresh={fetchCard}
            refreshing={refreshing}
          />
        )}
      </View>
      <View style={cartst.viewFooter}>
        <View style={[appst.rowCenter]}>
          <View style={appst.rowCenter}>
            <TouchableOpacity onPress={handleSelectAll}>
              <Image
                style={appst.icon24}
                source={
                  isAllChecked
                    ? require('../../assets/icons/ppd_card_check.png')
                    : require('../../assets/icons/icon_check.png')
                }
              />
            </TouchableOpacity>
            <Text style={cartst.text6}>{t('home.all_product')}</Text>
          </View>
          <View style={[appst.rowCenter]}>
            <Text style={cartst.text2}>{t('home.total')}: </Text>
            <Text style={cartst.text3}>
              ${totalPrice.toLocaleString('vi-VN')}
            </Text>
            <View>
              <CustomedButton
                title={t('buttons.btn_checkout')}
                style={cartst.btCheckout}
                titleStyle={cartst.textTouch}
                onPress={handleOrder}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartScreen;