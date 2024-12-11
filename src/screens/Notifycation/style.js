import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
import {fonts} from '../../constants/fonts';

const st = StyleSheet.create({
  text: {
    fontSize: 18,
    color: colors.color615D5D,
    marginTop: -10,
    fontFamily: fonts.rlw_medium,
  },
  img: {
    width: 150,
    height: 150,
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
    marginHorizontal: 30,
  },
  icon: {
    width: 100,
    height: 100,
  },
  text1: {
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
    fontFamily: fonts.pp_regular,
  },
  text2: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.primary,
    textDecorationColor: colors.primary,
    textDecorationLine: 'underline',
    fontFamily: fonts.pp_bold,
  },
});

export default st;
