import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {c_adrIt} from './style';
import appst from '../../constants/AppStyle';

const ChooseAddressItem = ({item}) => {
  const [defaultValue, setDefaultValue] = useState(true);

  return (
    <View style={[c_adrIt.container, appst.rowCenter]}>
      {item.isDefault ? (
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
          <Text>{item.recieverName} |</Text>
          <Text style={c_adrIt.textPhone}>
            (+84) {item.recieverPhoneNumber}
          </Text>
          {'\n'}
          {item.address}
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
