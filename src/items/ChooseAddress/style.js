import {StyleSheet} from 'react-native';
import {sizes, spacing} from '../../constants';
import {colors} from '../../constants/colors';
import {fonts} from '../../constants/fonts';

export const c_adrIt = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.md,
  },
  viewContent: {
    flex: 1,
    marginHorizontal: spacing.sm,
  },
  icon: {
    width: 30,
  },
  text: {
    fontSize: sizes.size14,
    color: colors.color95989A,
    fontFamily: fonts.rlw_regular,
  },
  textName: {
    color: colors.black,
  },
  textPhone: {
    fontFamily: fonts.pp_regular,
  },
  textDefault: {
    color: colors.primary,
    fontSize: sizes.size10,
    fontFamily: fonts.rlw_medium,
    padding: spacing.xm,
    textAlign: 'center',
  },
  viewDefault: {
    borderWidth: 1,
    borderColor: colors.primary,
    marginTop: spacing.xm,
    width: 60,
  },
});
