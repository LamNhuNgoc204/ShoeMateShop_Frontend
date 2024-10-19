import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import appst from '../../../constants/AppStyle';
import c_adst from './style';
import ChooseAddressItem from '../../../items/ChooseAddress';
import Header from '../../../components/Header';
import {useTranslation} from 'react-i18next';
import AxiosInstance from '../../../helpers/AxiosInstance';

const ChooseAddress = ({navigation}) => {
  const {t} = useTranslation();
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await AxiosInstance().get(
          '/addresses/get-all-address',
        );
        if (response.status) {
          setAddresses(response.data);
        }
      } catch (error) {
        console.log('error address===', error);
      }
    };
    fetchAddress();
  }, []);

  console.log('addresses', addresses);
  // console.log('c_adst', c_adst);

  return (
    <View style={[appst.container]}>
      <Header
        iconLeft={require('../../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
        name={t('home.address')}
      />
      <View style={c_adst.viewBody}>
        <Text style={c_adst.text}>{t('titles.address')}:</Text>
        <View style={c_adst.body1}>
          {addresses && addresses.length > 0 ? (
            <FlatList
              style={c_adst.flat}
              data={addresses}
              renderItem={({item}) => <ChooseAddressItem item={item} />}
              extraData={item => item.id}
              ItemSeparatorComponent={<View style={c_adst.borderBottom} />}
            />
          ) : (
            <Text style={{textAlign: 'center', paddingBottom: 10}}>
              Ban chua co dia chi nao. Vui long them dia chi moi
            </Text>
          )}

          <View style={c_adst.borderBottom} />
          <TouchableOpacity
            style={[c_adst.viewFooter, appst.center]}
            onPress={() => navigation.navigate('AddNewAddress')}>
            <Image
              style={appst.icon30}
              source={require('../../../assets/icons/add_adr.png')}
            />
            <Text style={c_adst.textAdd}>{t('buttons.btn_new_address')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChooseAddress;
