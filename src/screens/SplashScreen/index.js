import {View, Image} from 'react-native';
import React, {useEffect} from 'react';
import appst from '../../constants/AppStyle';
import splashStyle from './style';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('OnBoardScreen');
    }, 3000);
  }, []);

  return (
    <View style={[appst.container, splashStyle.container]}>
      <Image
        style={splashStyle.logo}
        source={require('../../assets/images/logo.png')}
      />
    </View>
  );
};

export default SplashScreen;
