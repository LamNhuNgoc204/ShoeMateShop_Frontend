import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {c_adrIt} from './style';
import appst from '../../constants/AppStyle';

const ChooseAddressItem = () => {
  const [defaultValue, setDefaultValue] = useState(true);

  return (
    <View style={[c_adrIt.container, appst.rowCenter]}>
      {defaultValue ? (
        <TouchableOpacity style={c_adrIt.icon}>
          <Image
            style={appst.icon30}
            source={require('../../assets/icons/choose_ad.png')}
          />
        </TouchableOpacity>
      ) : (
        <View />
      )}

      <View style={c_adrIt.viewContent}>
        <Text style={c_adrIt.text}>
          <Text>Minh Quan |</Text>{' '}
          <Text style={c_adrIt.textPhone}>(+84) 336758295</Text> {'\n'}
          số 10 phố Phạm Văn Bạch, phường Dịch Vọng, quận Cầu Giấy, Hà Nội, Việt
          Nam
        </Text>
        <View style={c_adrIt.viewDefault}>
          <Text style={c_adrIt.textDefault}>Default</Text>
        </View>
      </View>

      <TouchableOpacity style={c_adrIt.icon}>
        <Image
          style={appst.icon30}
          source={require('../../assets/icons/edit_adr.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ChooseAddressItem;
