import React from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Image, Text, View, FlatList, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from './style';
import ChildItem from './ChildItems';
import ChildItemGadget from './Mygadget';
import {PROFILE} from '../../api/mockData';
import appst from '../../constants/AppStyle';
import ProductList from '../Product/ProductList';

const ProfileScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {user, avatar, infor} = useSelector(state => state.user);
  const isTokenValid = useSelector(state => state?.user?.isValidToken);
  const lstProducts = useSelector(state => state?.products?.products?.data);

  // Hàm điều hướng tới ví
  const handleToWallet = async () => {
    try {
      const response = await AxiosInstance().get('/wallet/balance');

      if (response.status) {
        navigation.navigate('HomeWallet');
      } else {
        navigation.navigate('SetupWallet');
        console.log('Chưa có ví');
      }
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
    }
  };

  // Hàm render cho FlatList
  const renderItem = ({item}) => (
    <ChildItem
      onPress={() => {
        isTokenValid
          ? navigation.navigate(
              item.navigateTo,
              item.navigateTo == 'MessageScreen' ? {product: null} : {},
            )
          : navigation.navigate('RequireLogin');
      }}
      iconSource={item.iconSource}
      text={t(item.text)}
    />
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profile}>
        {isTokenValid ? (
          <View style={appst.rowStart}>
            <Image
              style={styles.avatar}
              source={{
                uri: avatar
                  ? avatar
                  : 'https://i.pinimg.com/enabled_hi/564x/d4/35/42/d435423c9386e708c678b7663656b9c0.jpg',
              }}
            />
            <View style={styles.info}>
              <Text style={styles.name}>{user && infor?.name}</Text>
              <Text style={styles.email}>{user && infor?.email}</Text>
            </View>
          </View>
        ) : (
          <Image
            style={styles.avatar}
            source={{
              uri: 'https://i.pinimg.com/enabled_hi/564x/d4/35/42/d435423c9386e708c678b7663656b9c0.jpg',
            }}
          />
        )}

        {isTokenValid ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('SettingScreen')}>
            <Image
              style={appst.icon30}
              source={require('../../assets/icons/setting.png')}
            />
          </TouchableOpacity>
        ) : (
          <View style={appst.rowStart}>
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                await AsyncStorage.removeItem('token');
                navigation.replace('LoginScreen');
              }}>
              <Text style={styles.buttonText}>{t('buttons.btn_signin')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                navigation.navigate('SignUpScreen');
              }}>
              <Text style={styles.buttonText}>{t('buttons.btn_signup')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('HomeWallet')}
        style={styles.myGadget}>
        <Image
          style={styles.ic_mygadget}
          source={require('../../assets/icons/icons8-wallet.png')}
        />
        <Text style={styles.text1}>{t('profiles.wallet')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          isTokenValid
            ? navigation.navigate('Voucher')
            : navigation.navigate('RequireLogin');
        }}
        style={styles.myGadget}>
        <Image
          style={styles.ic_mygadget}
          source={require('../../assets/icons/icons8-voucher-24.png')}
        />
        <Text style={styles.text1}>{t('checkout.vouchers')}</Text>
      </TouchableOpacity>

      <View style={styles.childsMyGadget}>
        <ChildItemGadget
          onPress={() => {
            isTokenValid
              ? navigation.navigate('OrderScreen', {
                  initialRoute: t('orders.pay'),
                })
              : navigation.navigate('RequireLogin');
          }}
          iconSource={require('../../assets/icons/icons8-wallet-24.png')}
          text={t('orders.pay')}
        />
        <ChildItemGadget
          onPress={() => {
            isTokenValid
              ? navigation.navigate('OrderScreen', {
                  initialRoute: t('orders.ship'),
                })
              : navigation.navigate('RequireLogin');
          }}
          iconSource={require('../../assets/icons/icons8-box-24.png')}
          text={t('orders.ship')}
        />
        <ChildItemGadget
          onPress={() => {
            isTokenValid
              ? navigation.navigate('OrderScreen', {
                  initialRoute: t('orders.completed'),
                })
              : navigation.navigate('RequireLogin');
          }}
          iconSource={require('../../assets/icons/icons8-delivered-24.png')}
          text={t('orders.completed')}
        />
        <ChildItemGadget
          onPress={() => {
            isTokenValid
              ? navigation.navigate('MyRating')
              : navigation.navigate('RequireLogin');
          }}
          iconSource={require('../../assets/icons/icons8-star-24.png')}
          text={t('profiles.rate')}
        />
      </View>

      <FlatList
        data={PROFILE}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        scrollEnabled={false}
      />

      <View style={{marginTop: 10}}>
        <ProductList listProduct={lstProducts || []} />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
