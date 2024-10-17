import {Image, Text, View, FlatList} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import ChildItemGadget from './Mygadget';
import ChildItem from './ChildItems';
import styles from './style';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import { PROFILE } from '../../api/mockData';

const ProfileScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const {user} = useSelector(state => state.user);
  console.log('user', user);

  const renderItem = ({item}) => (
    <ChildItem
      onPress={() => navigation.navigate(item.navigateTo)}
      iconSource={item.iconSource}
      text={item.text}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{
            uri: user.avatar
              ? user.avatar
              : 'https://i.pinimg.com/enabled_hi/564x/d4/35/42/d435423c9386e708c678b7663656b9c0.jpg',
          }}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
        <TouchableOpacity>
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
      <Image
        style={styles.line}
        source={require('../../assets/icons/lineprofile.png')}
      />
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
