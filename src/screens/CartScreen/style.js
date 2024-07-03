import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
import {sizes, spacing} from '../../constants';
import {fonts} from '../../constants/fonts';

export const cartst = StyleSheet.create({
  container: {
    backgroundColor: colors.background_secondary,
  },
  viewBody: {
    marginTop: spacing.sm,
    flex: 1,
  },
  text1: {
    fontFamily: fonts.pp_medium,
    color: colors.color1A2530,
    fontSize: sizes.size16,
    marginBottom: spacing.sm,
    marginHorizontal: spacing.lg,
  },
  flat: {
    flex: 1,
  },
  viewFooter: {
    backgroundColor: colors.background_primary,
    width: '100%',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  text2: {
    fontSize: sizes.size16,
    fontFamily: fonts.rlw_medium,
    color: colors.color707B81,
  },
  text3: {
    color: colors.color1A2530,
    fontFamily: fonts.pp_medium,
    fontSize: sizes.size16,
  },
  borderBottom: {
    borderColor: colors.color707B81,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    paddingVertical: spacing.sm,
  },
  view1: {
    marginVertical: spacing.sm,
  },
  text4: {
    fontSize: sizes.size16,
    fontFamily: fonts.pp_medium,
    color: colors.text_black,
  },
  text5: {
    color: colors.primary,
    fontSize: sizes.size16,
    fontFamily: fonts.pp_medium,
  },
  text6: {
    fontSize: sizes.size14,
    fontFamily: fonts.pp_medium,
    marginLeft: spacing.xm,
    color: colors.primary,
  },
  btCheckout: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    width: 210,
  },
  textTouch: {
    paddingVertical: spacing.md,
    textAlign: 'center',
    color: colors.colorFFF,
    fontFamily: fonts.rlw_medium,
    fontSize: sizes.size14,
  },
});
