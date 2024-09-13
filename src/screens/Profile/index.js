import {Image, Text, View, FlatList} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import ChildItemGadget from './Mygadget';
import ChildItem from './ChildItems';
import styles from './style';
import {useTranslation} from 'react-i18next';

const ProfileScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const data = [
    {
      id: '1',
      iconSource: require('../../assets/icons/ic_recently.png'),
      text: 'Recently Viewed',
      navigateTo: 'RecentlyViewed',
    },
    {
      id: '2',
      iconSource: require('../../assets/icons/ic-myrating.png'),
      text: 'My Rating',
      navigateTo: 'MyRating',
    },
    {
      id: '3',
      iconSource: require('../../assets/icons/ic_orderhistory.png'),
      text: 'Order History',
      navigateTo: 'OrderHistory',
    },
    {
      id: '4',
      iconSource: require('../../assets/icons/ic_accountsettings.png'),
      text: 'Account Settings',
      navigateTo: 'AccountSettings',
    },
    {
      id: '5',
      iconSource: require('../../assets/icons/ic_informationsecurity.png'),
      text: 'Information Security',
      navigateTo: 'InformationSecurity',
    },
    {
      id: '6',
      iconSource: require('../../assets/icons/ic_help.png'),
      text: 'Help',
      navigateTo: 'Help',
    },
    {
      id: '7',
      iconSource: require('../../assets/icons/ic_chatwithshop.png'),
      text: 'Chat with Shop',
      navigateTo: 'ChatWithShop',
    },
  ];

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
          source={require('../../assets/images/avatar.png')}
        />
        <View style={styles.info}>
          <Text style={styles.name}>Nguyen Van A</Text>
          <Text style={styles.email}>vana123@gmail.com</Text>
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
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default ProfileScreen;
