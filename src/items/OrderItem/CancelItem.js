import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import appst from '../../constants/AppStyle';
import {colors} from '../../constants/colors';

const CancelItem = item => {
  return (
    <View style={[appst.rowStart, st.container]}>
      <Image
        source={require('../../assets/images/placeholder_image.jpg')}
        style={st.img}
      />
      <View style={st.view1}>
        <Text style={st.text}>name</Text>
        <Text style={st.text}>proce</Text>
        <Text style={st.text}>size</Text>
      </View>
    </View>
  );
};

export default CancelItem;

const st = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.background_secondary,
    marginVertical: 5,
    borderRadius: 10,
  },
  img: {
    width: 70,
    height: 70,
  },
  view1: {
    marginLeft: 10,
  },
  text: {
    color: colors.color1A2530,
  },
});
