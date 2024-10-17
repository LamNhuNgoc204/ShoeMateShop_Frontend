import React from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Image, Text, View, FlatList, ToastAndroid} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from './style';
import ChildItem from './ChildItems';
import ChildItemGadget from './Mygadget';
import {PROFILE} from '../../api/mockData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logout} from '../../redux/reducer/userReducer';
import appst from '../../constants/AppStyle';

const ProfileScreen = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {user} = useSelector(state => state.user);

  const renderItem = ({item}) => (
    <ChildItem
      onPress={() => navigation.navigate(item.navigateTo)}
      iconSource={item.iconSource}
      text={item.text}
    />
  );

  const Logout = async () => {
    try {
      dispatch(logout());
      await AsyncStorage.removeItem('token');
      navigation.replace('LoginScreen');
    } catch (error) {
      ToastAndroid.show('Xảy ra lỗi. Thử lại sau', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <View style={appst.rowStart}>
          <Image
            style={styles.avatar}
            source={{
              uri:
                user && user.avatar
                  ? user.avatar
                  : 'https://i.pinimg.com/enabled_hi/564x/d4/35/42/d435423c9386e708c678b7663656b9c0.jpg',
            }}
          />
          <View style={styles.info}>
            <Text style={styles.name}>{user && user.name}</Text>
            <Text style={styles.email}>{user && user.email}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={Logout}>
          <Image
            style={styles.logout}
            source={require('../../assets/icons/logout.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.myGadget}>
        <Image
          style={styles.ic_mygadget}
          source={require('../../assets/icons/ic_mygadget.png')}
        />
        <Text style={styles.text1}>{t('profiles.bag')}</Text>
      </View>
      <View style={styles.childsMyGadget}>
        <ChildItemGadget
          onPress={() => navigation.navigate('MyWallet')}
          iconSource={require('../../assets/icons/ic_mywallet.png')}
          text={t('profiles.wallet')}
        />
        <ChildItemGadget
          onPress={() => navigation.navigate('Vouchers')}
          iconSource={require('../../assets/icons/ic_myvoucher.png')}
          text={t('checkout.vouchers')}
        />
        <ChildItemGadget
          onPress={() => navigation.navigate('MiniGame')}
          iconSource={require('../../assets/icons/ic_minigame.png')}
          text={t('profiles.game')}
        />
        <ChildItemGadget
          onPress={() => navigation.navigate('Rate')}
          iconSource={require('../../assets/icons/ic_torate.png')}
          text={t('profiles.rate')}
        />
      </View>
      <FlatList
        data={PROFILE}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default ProfileScreen;
