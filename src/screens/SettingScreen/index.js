import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import appst from '../../constants/AppStyle';
import {useNavigation} from '@react-navigation/native';
import RenderSettingItem from './ItemSetting/RenderSettingItem';
import styles from './style';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logout} from '../../redux/reducer/userReducer';
import {useDispatch} from 'react-redux';
import {SETTING} from '../../api/mockData';

const SettingScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
      <View style={appst.rowCenter}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={appst.icon40}
            source={require('../../assets/icons/ic_back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{t('home.profile')}</Text>
        <View style={{width: 40}} />
      </View>
      <View style={styles.viewBody}>
        <FlatList
          data={SETTING}
          renderItem={({item}) => <RenderSettingItem item={item} />}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={appst.center}>
        <TouchableOpacity onPress={Logout}>
          <Text style={styles.signOut}>{t('buttons.btn_signout')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingScreen;
