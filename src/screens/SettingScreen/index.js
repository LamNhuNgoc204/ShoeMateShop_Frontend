import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
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
import Header from '../../components/Header';

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
    <View style={[appst.container, appst.columnSb]}>
      <View style={{marginTop: 5}}>
        <Header
          backgroundColor={'white'}
          name={t('home.profile')}
          iconLeft={require('../../assets/icons/back.png')}
          leftOnPress={() => navigation.goBack()}
          iconRight={require('../../assets/icons/mesage.png')}
          rightOnPress={() => {
            navigation.navigate('MessageScreen');
          }}
        />
        <FlatList
          scrollEnabled={false}
          data={SETTING}
          renderItem={({item}) => <RenderSettingItem item={item} />}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={{marginBottom: 20}}>
        <TouchableOpacity style={styles.button} onPress={Logout}>
          <Text style={styles.signOut}>{t('buttons.btn_signout')}</Text>
        </TouchableOpacity>
        <Text style={styles.text1}>Shoe Mate v 1.0.0</Text>
      </View>
    </View>
  );
};

export default SettingScreen;
