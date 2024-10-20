import {StyleSheet} from 'react-native';
import {colors} from '../../../../constants/colors';
import {fonts} from '../../../../constants/fonts';

const zalo = StyleSheet.create({
  img: {
    height: 150,
    width: 250,
    borderRadius: 10,
  },
  container: {
    justifyContent: 'space-between',
  },
  text1: {
    color: colors.primary,
    fontSize: 24,
    fontFamily: fonts.pp_bold,
    textAlign: 'center',
    paddingTop: 10,
  },
  text2: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: fonts.pp_medium,
  },
  button: {
    borderRadius: 0,
    backgroundColor: colors.primary,
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewHead: {
    paddingTop: 10,
  },
});

export default zalo;
