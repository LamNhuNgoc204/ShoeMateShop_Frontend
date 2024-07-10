import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {sizes, spacing} from '../../constants';
import {fonts} from '../../constants/fonts';
import {colors} from '../../constants/colors';
import appst from '../../constants/AppStyle';
import {useNavigation} from '@react-navigation/native';
import RenderSettingItem from './ItemSetting/RenderSettingItem';
import styles from './style';
const SettingScreen = () => {
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
        <Text style={styles.title}>Profile</Text>
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
        <Text style={styles.signOut}>Sign Out</Text>
      </View>
    </View>
  );
};

export default SettingScreen;

