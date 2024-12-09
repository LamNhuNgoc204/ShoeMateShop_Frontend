import {Text, View, Image} from 'react-native';
import React from 'react';
import appst from '../../constants/AppStyle';
import {oddt} from '../../screens/OrderDetail/style';
import {useTranslation} from 'react-i18next';
import {formatPrice} from '../../utils/functions/formatData';

const OrderItemDetail = ({item}) => {
  const {t, i18n} = useTranslation();
  const lag = i18n.language;
  const data = item.item && item.item.product;

  // console.log('item', data);

  return (
    <View style={[appst.rowStart, {marginBottom: 10}]}>
      <Image
        style={oddt.img}
        source={
          data.pd_image && data.pd_image[0]
            ? {uri: data.pd_image[0]}
            : require('../../assets/images/placeholder_image.jpg')
        }
      />
      <View style={oddt.view1}>
        <View>
          <Text numberOfLines={1} style={oddt.name}>
            {data.name}
          </Text>
          <Text style={oddt.text5}>
            {t('products.size')}:{' '}
            <Text style={oddt.text6}>{data.size_name}</Text>
          </Text>

          <Text style={oddt.text5}>
            {t('products.price')}:{' '}
            <Text style={oddt.text6}>
              {lag === 'en' && '$'}
              {data.price && formatPrice(data.price, lag)}
              {lag === 'vi' && ' VNĐ '}
            </Text>
          </Text>
          <Text style={oddt.text5}>
            {t('products.quantity')}:{' '}
            <Text style={oddt.text6}>{data.pd_quantity}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OrderItemDetail;
