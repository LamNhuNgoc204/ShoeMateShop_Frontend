import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import appst from '../../../constants/AppStyle';
import c_adst from './style';
import ChooseAddressItem from '../../../items/ChooseAddress';
import Header from '../../../components/Header';
import {useTranslation} from 'react-i18next';
import {
  deleteUserAdress,
  getAllAddress,
  setUserAddressDefault,
} from '../../../api/UserApi';
import SweetAlert from 'react-native-sweet-alert';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setAddress} from '../../../redux/reducer/cartReducer';
import SkeletonLoader from '../../../placeholders/addresses/AddressSkeleton';
import Loading from '../../../components/Loading';
import Toast from 'react-native-toast-message';

const ChooseAddress = ({navigation, route}) => {
  const {t} = useTranslation();
  const [addresses, setAddresses] = useState([]);
  const {isChoose, addressDefault} = route.params || false;
  const [idAddressDefault, setIdaddressDefault] = useState(addressDefault);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isSetDefault, setIsSetDefault] = useState(false);

  // console.log('------------', isChoose, '---------', addressDefault);

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.newAddressItem) {
        setAddresses(ad => [...ad, route.params.newAddressItem]);
      }
    }, [route.params?.newAddressItem]),
  );

  useEffect(() => {
    const fetchAddress = async () => {
      setLoading(true);
      try {
        const response = await getAllAddress();
        if (response.status) {
          setAddresses(response.data);
          setLoading(false);
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
          title: t('toast.del_address'),
          subTitle: t('toast.title_del_address'),
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

              Toast.show({
                text1: `${t('toast.del_add_succ')}`,
                type: 'success'
            });
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

  const setAddressDefault = async address => {
    console.log('set default');
    if (isChoose && addressDefault) {
      setIdaddressDefault(address._id);
      dispatch(setAddress(address));
    } else {
      try {
        setIsSetDefault(true);
        const response = await setUserAddressDefault(address._id);
        if (response.status) {
          // Đánh dấu địa chỉ mặc định local
          const updatedAddresses = addresses.map(item =>
            item._id === address._id
              ? {...item, isDefault: true}
              : {...item, isDefault: false},
          );
          setAddresses(updatedAddresses);
          Toast.show({text2 : `${t('toast.change_add')}`, type : 'success'});
          setIsSetDefault(false);
        }
      } catch (error) {
        console.log('Error set default address:', error);
        setIsSetDefault(false);
      }
    }
  };

  return (
    <View style={[appst.container]}>
      <Header
        iconLeft={require('../../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
        name={t('home.address')}
      />
      <View style={{flex: 1}}>
        {isSetDefault ? (
          <Loading />
        ) : (
          <View style={{flex: 1}}>
            {loading ? (
              <SkeletonLoader />
            ) : (
              <View style={c_adst.viewBody}>
                <ScrollView style={[c_adst.body1, c_adst.viewBody]}>
                  {addresses && addresses.length > 0 ? (
                    <FlatList
                      style={c_adst.flat}
                      data={addresses}
                      renderItem={({item}) => (
                        <ChooseAddressItem
                          item={item}
                          setAddressDefault={setAddressDefault}
                          deleteAddress={deleteAddress}
                          isChoose={isChoose}
                          addressDefault={idAddressDefault}
                        />
                      )}
                      extraData={item => item.id}
                      scrollEnabled={false}
                      ItemSeparatorComponent={
                        <View style={c_adst.borderBottom} />
                      }
                    />
                  ) : (
                    <Text style={{textAlign: 'center', paddingBottom: 10}}>
                      {t('address.no_address')}
                    </Text>
                  )}

                  <View style={c_adst.borderBottom} />
                  <TouchableOpacity
                    style={[c_adst.viewFooter, appst.center]}
                    onPress={() =>
                      navigation.navigate('AddNewAddress', {
                        screen: 'ChooseAddress',
                      })
                    }>
                    <Image
                      style={appst.icon30}
                      source={require('../../../assets/icons/add_adr.png')}
                    />
                    <Text style={c_adst.textAdd}>
                      {t('buttons.btn_new_address')}
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default ChooseAddress;
