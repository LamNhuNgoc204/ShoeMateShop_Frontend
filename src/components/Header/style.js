import {StyleSheet} from 'react-native';
import {sizes} from '../../constants';
import {fonts} from '../../constants/fonts';
import {colors} from '../../constants/colors';

export const hdst = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: colors.background_primary,
  },
  press: {
    width: 44,
    height: 44,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background_primary,
    // elevation: 5
  },
  name: {
    fontSize: sizes.size20,
    fontFamily: fonts.rlw_semibold,
    color: colors.text_black2B,
    flex: 1,
    textAlign: 'center',
  },
  view: {
    width: 24,
  },
});
