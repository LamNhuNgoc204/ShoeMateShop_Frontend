import {View, Text, Image} from 'react-native';
import React from 'react';
import appst from '../../constants/AppStyle';
import {oddt} from './style';
import Header from '../../components/Header';
import {spacing} from '../../constants';
import {CustomedButton} from '../../components';
import {useTranslation} from 'react-i18next';

const OrderDetail = () => {
  const {t} = useTranslation();
  const Item = ({content1, content2}) => {
    return (
      <View style={appst.rowCenter}>
        <Text style={oddt.text9}>{content1}</Text>
        <Text style={oddt.text10}>{content2}</Text>
      </View>
    );
  };

  const Item2 = ({contetn1, content2}) => {
    return (
      <View style={appst.rowCenter}>
        <Text style={oddt.text12}>{contetn1}</Text>
        <Text style={oddt.text11}>{content2}</Text>
      </View>
    );
  };

  return (
    <View style={[appst.container, oddt.container]}>
      <Header
        iconLeft={require('../../assets/icons/back.png')}
        name={t('orders.order_detail')}
      />
      <View style={oddt.itemContainer}>
        <View style={oddt.row}>
          <Image
            source={require('../../assets/icons/location.png')}
            style={oddt.location}
          />
          <View>
            <Text style={oddt.text1}>{t('checkout.address')}:</Text>
            <Text>
              <Text style={oddt.text2}>
                <Text style={oddt.text3}>Minh Quan | (+84) 336758295</Text>{' '}
                {'\n'}
                số 10 phố Phạm Văn Bạch, phường Dịch Vọng, quận Cầu Giấy, Hà
                Nội, Việt Nam
              </Text>
            </Text>
          </View>
        </View>

        <View style={oddt.border} />

        <View style={[oddt.body]}>
          <View style={[appst.rowCenter, oddt.view]}>
            <Text style={oddt.text4}>{t('orders.code_order')}</Text>
            <Text style={oddt.text4}>ExAmPlE123XYZ</Text>
          </View>
          <View style={appst.rowStart}>
            <Image
              style={oddt.img}
              source={require('../../assets/images/onboard2.png')}
            />
            <View style={oddt.view1}>
              <View>
                <Text style={oddt.name}>
                  Spring New Style Women Casual .....
                </Text>
                <Text style={oddt.text5}>
                  {t('products.size')}: <Text style={oddt.text6}>38</Text>
                </Text>
              </View>
              <View style={appst.rowCenter}>
                <Text style={oddt.text5}>
                  {t('products.price')}: <Text style={oddt.text6}>210.00$</Text>
                </Text>
                <Text style={oddt.text5}>x1</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={oddt.border} />

        <View style={oddt.body}>
          <Text style={oddt.text5}>
            {t('orders.status')}:
            <Text style={oddt.text6}>{t('orders.success_delivery')}</Text>
          </Text>
          <Text style={oddt.text7}>{t('orders.order_total')}</Text>
          <View style={oddt.view2}>
            <Text style={oddt.text7}>{t('orders.fees')}</Text>
            <View style={[appst.rowCenter]}>
              <View style={[appst.rowCenter, {marginLeft: spacing.xm}]}>
                <Image
                  style={oddt.icon}
                  source={require('../../assets/icons/vouchersss.png')}
                />
                <Text style={oddt.text8}>{t('checkout.vouchers')}</Text>
              </View>
              <Text style={oddt.text8}>-10.0$</Text>
            </View>
            <View style={[appst.rowCenter]}>
              <View style={[appst.rowCenter, {marginLeft: spacing.xm}]}>
                <Image
                  style={oddt.icon}
                  source={require('../../assets/icons/point.png')}
                />
                <Text style={oddt.text8}>{t('checkout.points')}</Text>
              </View>
              <Text style={oddt.text8}>-200$</Text>
            </View>
          </View>
        </View>

        <View style={oddt.border} />

        <View style={[oddt.body]}>
          <Item content1={t('orders.total')} content2={'187.50$'} />
          <Item content1={t('setting.payment')} content2={'Momo'} />
          <Item content1={t('orders.accumulated')} content2={'+1000 point'} />
        </View>

        <View style={oddt.border} />

        <View style={oddt.body}>
          <Item2 contetn1={t('orders.time')} content2={'21-06-2024 00:12'} />
          <Item2 contetn1={t('orders.payment')} content2={'21-06-2024 00:53'} />
          <Item2
            contetn1={t('orders.shipping')}
            content2={'23-06-2024 08:32'}
          />
          <Item2
            contetn1={t('orders.complete')}
            content2={'27-06-2024 10:50'}
          />
        </View>
      </View>

      <CustomedButton
        title={t('buttons.btn_buy_again')}
        style={oddt.press}
        titleStyle={oddt.titleStyle}
      />
    </View>
  );
};

export default OrderDetail;
