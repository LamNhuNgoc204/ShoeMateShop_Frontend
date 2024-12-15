import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  RefreshControl,
  ToastAndroid,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {odst} from './style';
import appst from '../../constants/AppStyle';
import OrderItem from '../../items/OrderItem/OrderItem';
import {getOrderCancell} from '../../api/OrderApi';
import OrderHistorySkeleton from '../../placeholders/product/order/OrderHistory';
import {useTranslation} from 'react-i18next';
import ProductList from '../Product/ProductList';
import {shuffleArray} from '../../utils/functions/formatData';
import {addItemToCartApi} from '../../api/CartApi';
import {gotoCart} from '../../utils/functions/navigationHelper';
import {useFocusEffect} from '@react-navigation/native';

const Cancalled = ({navigation}) => {
  const {t} = useTranslation();
  const useAppSelector = useSelector;
  const products = useAppSelector(state => state.products);
  const [cancelOrders, setCancelOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isOverlayLoading, setIsOverlayLoading] = useState(false);
  const lstProducts = useSelector(state => state?.products?.products?.data);

  const scrollViewRef = useRef(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', () => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({y: 0, animated: true});
      }
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (Array.isArray(products?.products?.data)) {
      if (products?.products?.data && products?.products?.data?.length) {
        setListProduct(shuffleArray(products?.products?.data));
      }
    }
  }, []);

  // console.log('listProduct=>>', listProduct);

  const fetchOrder = async () => {
    setLoading(false);
    try {
      const response = await getOrderCancell();
      if (response.status) {
        setCancelOrders(response?.data);
      }
    } catch (error) {
      console.log('Get order error: ', error);
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchOrder();
    }, []),
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchOrder().then(() => setRefreshing(false));
  }, []);

  const addToCart = async productForCart => {
    setIsOverlayLoading(true);
    // console.log('productForCart==>', productForCart);
    // lstProducts
    let allOutOfStock = true;

    try {
      if (Array.isArray(productForCart)) {
        for (const product of productForCart) {
          const productId = product?.product?.id;
          const productSizeId = product?.product?.size_id;
          const productQuantity = product?.product?.pd_quantity;

          // Tìm sản phẩm trong lstProducts theo productId và productSizeId
          const productInList = lstProducts.find(
            item =>
              item._id === productId &&
              item.size.some(
                size => size.sizeId._id.toString() === productSizeId,
              ),
          );

          console.log('productInList====>', productInList);

          // Kiểm tra nếu sản phẩm có trong lstProducts và lấy số lượng tương ứng
          let quantityToAdd = productQuantity;

          if (productInList) {
            // Tìm size trong mảng size của sản phẩm
            const size = productInList.size.find(
              s => s.sizeId._id.toString() === productSizeId,
            );

            console.log('----size-----', size);

            if (size) {
              const availableQuantity = size.quantity;
              console.log('availableQuantity =>          ', availableQuantity);

              // Lấy số lượng nhỏ hơn hoặc bằng số lượng có sẵn
              quantityToAdd = Math.min(productQuantity, availableQuantity);

              if (quantityToAdd > 0) {
                allOutOfStock = false;
              }
            }
          }

          if (quantityToAdd === 0) {
            continue;
          }

          const itemCart = {
            product_id: productId,
            size_id: productSizeId,
            quantity: quantityToAdd,
          };

          console.log('itemCart==============>', itemCart);

          const response = await addItemToCartApi(itemCart);
          if (!response.status) {
            ToastAndroid.show(
              `${t('toast.addtocart_fail')}: ${product?.product?.name}`,
              ToastAndroid.SHORT,
            );
          }
        }

        if (allOutOfStock) {
          console.log('Sản phẩm này hết hàng, không thêm vào giỏ hàng');
          ToastAndroid.show(`${t('toast.out_of_stock')}`, ToastAndroid.SHORT);
        } else {
          ToastAndroid.show(`${t('toast.addtocart_succ')}`, ToastAndroid.SHORT);
          gotoCart(navigation);
        }
      }
    } catch (error) {
      console.log('lỗi thêm giỏ hàng received: ', error);

      ToastAndroid.show(`${t('toast.del_err')}`, ToastAndroid.SHORT);
    } finally {
      setIsOverlayLoading(false);
    }
  };

  return (
    <View style={appst.container}>
      {loading ? (
        <ScrollView
          ref={scrollViewRef}
          style={appst.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {cancelOrders.length !== 0 ? (
            <FlatList
              style={odst.flat1}
              data={cancelOrders}
              renderItem={({item}) => (
                <OrderItem
                  addToCart={addToCart}
                  item={item}
                  cancel={true}
                  navigation={navigation}
                  setIsOverlayLoading={setIsOverlayLoading}
                />
              )}
              keyExtractor={(item, index) =>
                item._id ? item._id : index.toString()
              }
              scrollEnabled={false}
            />
          ) : (
            <View style={[appst.center, odst.view]}>
              <Image
                style={odst.img}
                source={require('../../assets/images/order.png')}
              />
              <Text style={odst.text1}>{t('orders.no_order')}</Text>
            </View>
          )}

          <ProductList listProduct={listProduct} />
        </ScrollView>
      ) : (
        <OrderHistorySkeleton />
      )}

      {/* Cho them gio hang */}
      <Modal transparent={true} visible={isOverlayLoading}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </Modal>
    </View>
  );
};

export default Cancalled;
