import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import odit from './style';
import appst from '../../constants/AppStyle';
import {spacing} from '../../constants';
import {gotoOrderDetail} from '../../utils/functions/handleOrder';
import {useTranslation} from 'react-i18next';

const OrderItem = ({item, receive, cancel, refunded, navigation}) => {
  const {t} = useTranslation();

  const orderDetail = item.orderDetails && item.orderDetails[0];
  const product = orderDetail && orderDetail.product;
  // console.log('item orderDetail: ', item.orderDetails);

  const quantities =
    item.orderDetails &&
    item.orderDetails.map(detail => detail.product.pd_quantity);
  // console.log('quantities', quantities);

  const totalQuantity =
    quantities && quantities.reduce((acc, detail) => acc + detail, 0);
  // console.log('totalQuantity', totalQuantity);

  // console.log('product order', product);

  return (
    <TouchableOpacity
      onPress={() => gotoOrderDetail('OrderDetail', navigation, item)}
      style={odit.container}>
      <Text style={odit.textCode}>
        {t('orders.code')}: {item._id && item._id.slice(0, 10)}
      </Text>
      <View style={[appst.rowStart, odit.itemContainer]}>
        <Image
          style={odit.img}
          source={
            product && product.pd_image && product.pd_image[0]
              ? {
                  uri: product && product.pd_image && product.pd_image[0],
                }
              : require('../../assets/images/placeholder_image.jpg')
          }
        />
        <View style={odit.viewContent}>
          <Text numberOfLines={1} style={odit.name}>
            {product && product.name}
          </Text>
          <Text style={odit.text}>
            {t('products.size')}:{' '}
            <Text style={odit.text1}>{product && product.size_name}</Text>
          </Text>
          <Text style={odit.text}>
            {t('products.price')}:{' '}
            <Text style={odit.text1}>
              {product &&
                product.price &&
                product.price.toLocaleString('vi-VN')}
              đ
            </Text>
          </Text>
        </View>
      </View>
      <View style={[appst.rowCenter, odit.view1]}>
        <Text style={odit.quatity}>
          {totalQuantity} {t('orders.unit')}
        </Text>
        <Text style={odit.total}>
          Total Price:{' '}
          <Text style={odit.price}>
            {item.total_price && item.total_price.toLocaleString('vi-VN')} đ
          </Text>
        </Text>
      </View>
      {!receive && !cancel ? (
        <View style={[appst.rowCenter, odit.view2]}>
          <Text style={odit.textWait}>
            {item.status === 'pending'
              ? t('orders.wait_confirm')
              : item.status === 'processing'
              ? t('orders.proccessed_status')
              : ''}
          </Text>
          <Image
            style={appst.icon24}
            source={require('../../assets/icons/chevron_right.png')}
          />
        </View>
      ) : (
        <View
          style={[
            appst.center,
            cancel && appst.rowCenter,
            {paddingHorizontal: spacing.lg},
          ]}>
          {cancel && (
            <Text style={odit.textCancel}>{t('orders.Canceler')} you</Text>
          )}

          {/* ĐƠN ĐÃ HOÀN THÀNH */}
          {!cancel && (
            <View style={appst.rowEnd}>
              <TouchableOpacity style={[odit.press, {paddingHorizontal: 10}]}>
                <Text style={odit.textTouch}>
                  {true ? t('orders.return') : t('buttons.btn_buy_again')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('MultiProductReviewForm', {
                    products: item.orderDetails,
                  })
                }
                style={[odit.press, {paddingHorizontal: 5, marginLeft: 10}]}>
                <Text style={odit.textTouch}>
                  {!item.isReviewed ? t('review.review') : t('review.see')}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {cancel && (
            <View style={appst.rowEnd}>
              <TouchableOpacity
                onPress={() =>
                  gotoOrderDetail('CancelDetail', navigation, item)
                }
                style={[odit.press, odit.press1, {paddingHorizontal: 10}]}>
                <Text style={[odit.textTouch, odit.textTouch1]}>
                  {t('orders.watch_order_detail')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[odit.press, {paddingHorizontal: 5, marginLeft: 10}]}>
                <Text style={odit.textTouch}>{t('buttons.btn_buy_again')}</Text>
              </TouchableOpacity>
            </View>
          )}
          {refunded && (
            <TouchableOpacity
              style={[odit.press, odit.press1, {paddingHorizontal: 10}]}>
              <Text style={[odit.textTouch, odit.textTouch1]}>
                {t('orders.watch_order_detail')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default OrderItem;
