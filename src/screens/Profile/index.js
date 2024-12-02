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
  const {user, avatar} = useSelector(state => state.user);
  const productState = useSelector(state => state.products);

  const renderItem = ({item}) => (
    <ChildItem
      onPress={() => navigation.navigate(item.navigateTo)}
      iconSource={item.iconSource}
      text={t(item.text)}
    />
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profile}>
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
            <Text style={styles.name}>{user && user.name}</Text>
            <Text style={styles.email}>{user && user.email}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SettingScreen')}>
          <Image
            style={appst.icon30}
            source={require('../../assets/icons/setting.png')}
          />
        </TouchableOpacity>
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
        onPress={() => navigation.navigate('Voucher')}
        style={styles.myGadget}>
        <Image
          style={styles.ic_mygadget}
          source={require('../../assets/icons/icons8-voucher-24.png')}
        />
        <Text style={styles.text1}>{t('checkout.vouchers')}</Text>
      </TouchableOpacity>

      <View style={styles.childsMyGadget}>
        <ChildItemGadget
          onPress={() =>
            navigation.navigate('OrderScreen', {initialRoute: t('orders.pay')})
          }
          iconSource={require('../../assets/icons/icons8-wallet-24.png')}
          text={t('orders.pay')}
        />
        <ChildItemGadget
          onPress={() =>
            navigation.navigate('OrderScreen', {initialRoute: t('orders.ship')})
          }
          iconSource={require('../../assets/icons/icons8-box-24.png')}
          text={t('orders.ship')}
        />
        <ChildItemGadget
          onPress={() =>
            navigation.navigate('OrderScreen', {
              initialRoute: t('orders.completed'),
            })
          }
          iconSource={require('../../assets/icons/icons8-delivered-24.png')}
          text={t('orders.completed')}
        />
        <ChildItemGadget
          onPress={() => navigation.navigate('MyRating')}
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
        <ProductList listProduct={productState.products} />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
