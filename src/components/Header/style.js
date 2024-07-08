import {StyleSheet} from 'react-native';
import {sizes, spacing} from '../../constants';
import {fonts} from '../../constants/fonts';
import {colors} from '../../constants/colors';

export const hdst = StyleSheet.create({
  container: {
    height: 50,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm
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
    fontSize: sizes.size16,
    fontFamily: fonts.rlw_semibold,
    color: colors.text_black2B,
  },
  view:{
    width: 24
  }
});
