import {View, Text, Image} from 'react-native';
import React from 'react';
import appst from '../../constants/AppStyle';
import {oddt} from './style';
import Header from '../../components/Header';
import {spacing} from '../../constants';
import {CustomedButton} from '../../components';

const OrderDetail = () => {
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
        name={'Order Detail'}
      />
      <View style={oddt.itemContainer}>
        <View style={oddt.row}>
          <Image
            source={require('../../assets/icons/location.png')}
            style={oddt.location}
          />
          <View>
            <Text style={oddt.text1}>Delivery Address:</Text>
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
            <Text style={oddt.text4}>Code orders</Text>
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
                  Size: <Text style={oddt.text6}>38</Text>
                </Text>
              </View>
              <View style={appst.rowCenter}>
                <Text style={oddt.text5}>
                  Price: <Text style={oddt.text6}>210.00$</Text>
                </Text>
                <Text style={oddt.text5}>x1</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={oddt.border} />

        <View style={oddt.body}>
          <Text style={oddt.text5}>
            Status: <Text style={oddt.text6}>Successful Delivery</Text>
          </Text>
          <Text style={oddt.text7}>Order Total</Text>
          <View style={oddt.view2}>
            <Text style={oddt.text7}>Fees apply</Text>
            <View style={[appst.rowCenter]}>
              <View style={[appst.rowCenter, {marginLeft: spacing.xm}]}>
                <Image
                  style={oddt.icon}
                  source={require('../../assets/icons/vouchersss.png')}
                />
                <Text style={oddt.text8}>Voucher</Text>
              </View>
              <Text style={oddt.text8}>-10.0$</Text>
            </View>
            <View style={[appst.rowCenter]}>
              <View style={[appst.rowCenter, {marginLeft: spacing.xm}]}>
                <Image
                  style={oddt.icon}
                  source={require('../../assets/icons/point.png')}
                />
                <Text style={oddt.text8}>Poitn</Text>
              </View>
              <Text style={oddt.text8}>-200$</Text>
            </View>
          </View>
        </View>

        <View style={oddt.border} />

        <View style={[oddt.body]}>
          <Item content1={'Total'} content2={'187.50$'} />
          <Item content1={'Payment Method'} content2={'Momo'} />
          <Item content1={'Accumulated Points'} content2={'+1000 point'} />
        </View>

        <View style={oddt.border} />

        <View style={oddt.body}>
          <Item2 contetn1={'Order Time'} content2={'21-06-2024 00:12'} />
          <Item2 contetn1={'Payment Time'} content2={'21-06-2024 00:53'} />
          <Item2 contetn1={'Ship Time'} content2={'23-06-2024 08:32'} />
          <Item2 contetn1={'Completed Time'} content2={'27-06-2024 10:50'} />
        </View>
      </View>

      <CustomedButton title={'BUY AGAIN'} style={oddt.press} titleStyle={oddt.titleStyle}/>
    </View>
  );
};

export default OrderDetail;
