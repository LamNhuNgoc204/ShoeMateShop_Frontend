import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
import {sizes, spacing} from '../../constants';
import {fonts} from '../../constants/fonts';

export const cartst = StyleSheet.create({
  container: {
    backgroundColor: colors.background_secondary,
    marginTop: spacing.md,
  },
  header: {
    marginHorizontal: spacing.md,
  },
  viewHeader: {
    width: '100%',
    height: 50,
    backgroundColor: colors.background_blue,
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
    paddingVertical: 20,
    paddingHorizontal: spacing.md,
  },
  text2: {
    color: 'black',
    fontSize: 12,
  },
  text3: {
    marginRight: 8,
    color: colors.primary,
    fontSize: 14,
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
    paddingHorizontal: 15,
  },
  textTouch: {
    textAlign: 'center',
    color: colors.colorFFF,
    fontFamily: fonts.rlw_medium,
    fontSize: sizes.size13,
    fontWeight: '650',
  },
  placeholder: {
    width: '100%',
    height: 250,
    justifyContent: 'flex-end',
  },
  text: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: fonts.rlw_bold,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
