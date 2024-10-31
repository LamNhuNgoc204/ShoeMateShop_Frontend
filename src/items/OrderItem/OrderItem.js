import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import odit from './style';
import appst from '../../constants/AppStyle';
import {spacing} from '../../constants';
import {gotoOrderDetail} from '../../utils/functions/handleOrder';

const OrderItem = ({item, receive, cancel, navigation}) => {
  // console.log('item order: ', item);

  const orderDetail = item.orderDetails && item.orderDetails[0];
  const product = orderDetail && orderDetail.product;

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
      onPress={() => gotoOrderDetail(navigation, item._id)}
      style={odit.container}>
      <Text style={odit.textCode}>
        Code orders: {item._id && item._id.slice(0, 10)}
      </Text>
      <View style={[appst.rowStart, odit.itemContainer]}>
        <Image
          style={odit.img}
          source={
            product && product.imageUrl && product.imageUrl[0]
              ? {
                  uri: product && product.imageUrl && product.imageUrl[0],
                }
              : require('../../assets/images/placeholder_image.jpg')
          }
        />
        <View style={odit.viewContent}>
          <Text numberOfLines={1} style={odit.name}>
            {product && product.name}
          </Text>
          <Text style={odit.text}>
            Size: <Text style={odit.text1}>{product && product.size_name}</Text>
          </Text>
          <Text style={odit.text}>
            Price:{' '}
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
        <Text style={odit.quatity}>{totalQuantity} item(s)</Text>
        <Text style={odit.total}>
          Total Price:{' '}
          <Text style={odit.price}>
            {item.total_price && item.total_price.toLocaleString('vi-VN')} đ
          </Text>
        </Text>
      </View>
      {!receive && !cancel ? (
        <View style={[appst.rowCenter, odit.view2]}>
          <Text style={odit.textWait}>Wait for confirmation</Text>
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
          {cancel && <Text style={odit.textCancel}>Canceled by you</Text>}
          <TouchableOpacity style={[odit.press, {width: '50%'}]}>
            <Text style={odit.textTouch}>Buy this product again</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default OrderItem;
