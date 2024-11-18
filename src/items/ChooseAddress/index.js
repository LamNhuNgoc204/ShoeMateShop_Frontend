import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {c_adrIt} from './style';
import appst from '../../constants/AppStyle';

const ChooseAddressItem = ({
  item,
  deleteAddress,
  isChoose,
  addressDefault,
  setAddressDefault,
}) => {
  // console.log('address id', item._id);

  return (
    <TouchableOpacity
      onPress={() => setAddressDefault(item)}
      onLongPress={() => deleteAddress(item._id)}
      style={[c_adrIt.container, appst.rowCenter]}>
      {isChoose && addressDefault == item._id ? (
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
        {item.isDefault && (
          <View style={c_adrIt.viewDefault}>
            <Text style={c_adrIt.textDefault}>Default</Text>
          </View>
        )}
      </View>

      <TouchableOpacity style={c_adrIt.icon}>
        <Image
          style={appst.icon30}
          source={require('../../assets/icons/edit_adr.png')}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ChooseAddressItem;
