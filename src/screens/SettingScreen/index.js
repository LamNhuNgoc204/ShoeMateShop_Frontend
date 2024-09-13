import React from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import appst from '../../constants/AppStyle';
import {useNavigation} from '@react-navigation/native';
import RenderSettingItem from './ItemSetting/RenderSettingItem';
import styles from './style';
import {useTranslation} from 'react-i18next';

const SettingScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const data = [
    {
      id: '1',
      text: 'Change Profile Picture',
      navigateTo: 'ChangeProfilePicture',
    },
    {id: '2', text: 'Shipping Address', navigateTo: 'ShippingAddress'},
    {id: '3', text: 'Payment Method', navigateTo: 'PaymentMethod'},
    {id: '4', text: 'Password', navigateTo: 'Password'},
    {
      id: '5',
      text: 'Country',
      navigateTo: 'Country',
      additionalInfo: 'Vietnam',
    },
    {id: '6', text: 'Size', navigateTo: 'Size', additionalInfo: 'UK'},
    {id: '7', text: 'Terms and Conditions', navigateTo: 'TermsAndConditions'},
  ];

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
          data={data}
          renderItem={({item}) => <RenderSettingItem item={item} />}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={appst.center}>
        <Text style={styles.signOut}>{t('buttons.btn_signout')}</Text>
      </View>
    </View>
  );
};

export default SettingScreen;
