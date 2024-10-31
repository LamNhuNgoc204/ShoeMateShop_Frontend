import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import appst from '../../../constants/AppStyle';
import c_adst from './style';
import ChooseAddressItem from '../../../items/ChooseAddress';
import Header from '../../../components/Header';
import {useTranslation} from 'react-i18next';
import {deleteUserAdress, getAllAddress} from '../../../api/UserApi';
import {useSelector} from 'react-redux';
import SweetAlert from 'react-native-sweet-alert';
import {useFocusEffect} from '@react-navigation/native';

const ChooseAddress = ({navigation, route}) => {
  const {t} = useTranslation();
  const state = useSelector(state => state.user);
  const [addresses, setAddresses] = useState(state.listAddress);

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.newAddressItem) {
        setAddresses(ad => [...ad, route.params.newAddressItem]);
      }
    }, [route.params?.newAddressItem]),
  );

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await getAllAddress();
        if (response.status) {
          setAddresses(response.data);
        }
      } catch (error) {
        console.log('error address===', error);
      }
    };
    fetchAddress();
  }, []);

  // console.log('addresses', addresses);
  // console.log('c_adst', c_adst);

  const deleteAddress = async id => {
    try {
      SweetAlert.showAlertWithOptions(
        {
          title: 'Remove Item?',
          subTitle: `Oops. Bạn có chắc chắn muốn xóa địa chỉ này không?`,
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          style: 'error',
          cancellable: true,
        },
        async () => {
          try {
            const response = await deleteUserAdress(id);

            if (response.status) {
              const updatedAddresses = addresses.filter(
                item => item._id !== id,
              );
              setAddresses(updatedAddresses);

              ToastAndroid.show('Xóa địa chỉ thành công', ToastAndroid.SHORT);
            }
          } catch (error) {
            console.log('Error removing item from address:', error);
          }
        },
      );
    } catch (error) {
      console.log('Error displaying alert:', error);
    }
  };

  return (
    <View style={[appst.container]}>
      <Header
        iconLeft={require('../../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
        name={t('home.address')}
      />
      <View style={c_adst.viewBody}>
        <View style={c_adst.body1}>
          {addresses && addresses.length > 0 ? (
            <FlatList
              style={c_adst.flat}
              data={addresses}
              renderItem={({item}) => (
                <ChooseAddressItem item={item} deleteAddress={deleteAddress} />
              )}
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
