import {View, Text, FlatList, Image} from 'react-native';
import React from 'react';
import appst from '../../../constants/AppStyle';
import {c_adst} from './style';
import ChooseAddressItem from '../../../items/ChooseAddress';
import Header from '../../../components/Header';

const ChooseAddress = ({navigation}) => {
  return (
    <View style={[appst.container]}>
      {/* <View style={c_adst.viewHeader}></View> */}
      <Header
        iconLeft={require('../../../assets/icons/back.png')}
        leftOnPress={() => navigation.goBack()}
        name={t('home.address')}
      />
      <View style={c_adst.viewBody}>
        <Text style={c_adst.text}>{t('titles.address')}:</Text>
        <View style={c_adst.body1}>
          <FlatList
            style={c_adst.flat}
            data={[1, 2, 3]}
            renderItem={({item}) => <ChooseAddressItem item={item} />}
            extraData={item => item.id}
            ItemSeparatorComponent={<View style={c_adst.borderBottom} />}
          />
          <View style={c_adst.borderBottom} />
          <View style={[c_adst.viewFooter, appst.center]}>
            <Image
              style={appst.icon30}
              source={require('../../../assets/icons/add_adr.png')}
            />
            <Text style={c_adst.textAdd}>{t('buttons.btn_new_address')}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChooseAddress;
