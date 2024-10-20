import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, FlatList, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { cartst } from './style';
import { spacing } from '../../constants';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import {cartst} from './style';
import {spacing} from '../../constants';
import Header from '../../components/Header';
import appst from '../../constants/AppStyle';
import { CustomedButton } from '../../components';
import ItemCart from '../../items/CartItem/ItemCart';
import { getUserCard } from '../../api/CartApi';
import { useDispatch } from 'react-redux';
import { setOrderData, setToltalPrice } from '../../redux/reducer/cartReducer';
import {getUserCard} from '../../api/CartApi';
import {useDispatch} from 'react-redux';
import {setOrderData, setToltalPrice} from '../../redux/reducer/cartReducer';
import Loading from '../../components/Loading';

const CartScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [currentlyOpenSwipeable, setCurrentlyOpenSwipeable] = useState(null);
  const [cards, setCards] = useState([]);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        setLoading(false);
        const response = await getUserCard();
        if (response.status) {
          setCards(response.data);
          setCheckedProducts([]);
          setIsAllChecked(false);
          setLoading(true);
        }
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchCard();
  }, []);

  const fetchCard = async () => {
    setRefreshing(true);
    try {
      const response = await getUserCard();
      if (response.status) {
        console.log("Loading API cart---------------");
        setCards(response.cart);
        setCheckedProducts([]);
        setIsAllChecked(false);
      }
    } catch (error) {
      console.log("Loading API cart fail---------------");
      console.log('error', error);
    } finally {
      setRefreshing(false); // End refreshing
    }
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
    if (checkedProducts.length == 0) {
      ToastAndroid.show('Vui long chon sp', ToastAndroid.SHORT);
    } else {
      dispatch(setOrderData(checkedProducts));
      dispatch(setToltalPrice(totalPrice));
      navigation.navigate('CheckOutScreen');
    }
  };

  return (
    <View style={[appst.container, cartst.container]}>
      <View style={cartst.header}>
        <Header
          leftOnPress={() => navigation.goBack()}
          background={'#fff'}
          iconLeft={require('../../assets/icons/back.png')}
          iconRight={require('../../assets/icons/del_card.png')}
          name={t('home.cart')}
        />
      </View>
      <View style={cartst.viewBody}>
        <Text style={cartst.text1}>
          {cards && cards.length} {t('home.item')}
        </Text>
        <FlatList
          style={cartst.flat}
          data={cards}
          renderItem={({ item }) => (
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
          ItemSeparatorComponent={<View style={{ marginBottom: spacing.sm }} />}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing} // Pass the refreshing state
              onRefresh={fetchCard} // Refresh function
            />
          }
        />
        {!loading ? (
          <Loading />
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