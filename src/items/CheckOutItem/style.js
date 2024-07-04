import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
import {sizes, spacing} from '../../constants';
import {fonts} from '../../constants/fonts';

export const c_outIt = StyleSheet.create({
  container: {
    width: '100%',
    padding: spacing.sm,
    flexDirection: 'row',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  viewText: {
    marginLeft: spacing.sm,
    flex: 1,
    marginVertical: spacing.sm,
    justifyContent: 'space-between',
  },
  name: {
    color: colors.black,
    fontFamily: fonts.rlw_medium,
    fontSize: sizes.size12,
  },
  text: {
    color: colors.black,
    fontFamily: fonts.rlw_bold,
    fontSize: sizes.size12,
  },
  size1: {
    fontFamily: fonts.pp_medium,
  },
  price1: {
    fontFamily: fonts.rlw_bold,
  },
});
