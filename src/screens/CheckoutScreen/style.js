import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
import {sizes, spacing} from '../../constants';
import {fonts} from '../../constants/fonts';

export const c_outst = StyleSheet.create({
  containerPosition: {
    position: 'relative',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    backgroundColor: colors.background_secondary,
  },
  borderBottom: {
    paddingBottom: spacing.sm,
    borderBottomColor: colors.colorC8C7C7,
    borderBottomWidth: 0.5,
  },
  borderBottom2: {
    borderBottomColor: colors.colorC8C7C7,
    borderBottomWidth: 0.5,
  },
  borderTop: {
    paddingTop: spacing.sm,
    borderTopColor: colors.colorC8C7C7,
    borderTopWidth: 1,
    borderStyle: 'dashed',
  },
  viewHeader: {
    width: '100%',
    height: 50,
    backgroundColor: colors.primary,
  },
  viewBody: {
    flex: 1,
    backgroundColor: colors.background_primary,
    borderRadius: 20,
    marginHorizontal: spacing.sm,
    marginVertical: spacing.md,
    paddingVertical: spacing.md,
  },
  body1: {},
  view1: {
    flexDirection: 'row',
    marginLeft: spacing.sm,
  },
  body1Text: {
    marginLeft: spacing.sm,
    width: '80%',
  },
  text1: {
    color: colors.black,
    fontSize: sizes.size14,
    fontFamily: fonts.rlw_semibold,
  },
  text2: {
    fontSize: sizes.size12,
    color: colors.black,
    fontFamily: fonts.rlw_regular,
    marginTop: spacing.xm,
  },
  text3: {
    fontFamily: fonts.pp_light,
  },
  body2: {
    marginTop: spacing.sm,
  },
  bd2Text1: {
    color: colors.black,
    fontSize: sizes.size14,
    fontFamily: fonts.rlw_semibold,
    marginLeft: spacing.md,
  },
  flat: {
    marginHorizontal: spacing.sm,
    marginTop: spacing.sm,
    marginBottom: spacing.xm,
    backgroundColor: colors.colorF3F6FF,
    borderRadius: 10
  },
  body3: {
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    width: '100%',
  },
  text6: {
    fontSize: sizes.size13,
    fontFamily: fonts.rlw_semibold,
    color: colors.black,
    marginLeft: spacing.sm,
  },
  text7: {
    fontSize: sizes.size10,
    fontFamily: fonts.rlw_regular,
    color: colors.color05E444,
    marginRight: spacing.xm,
  },
  body4: {
    marginVertical: spacing.sm,
  },
  view4Text: {
    marginHorizontal: spacing.xm,
  },
  textTitle: {
    color: colors.black,
    fontSize: sizes.size12,
    fontFamily: fonts.rlw_regular,
  },
  textTitle1: {
    fontFamily: fonts.rlw_semibold,
  },
  textPrice: {
    fontSize: sizes.size12,
    fontFamily: fonts.pp_light,
    color: colors.black,
  },
  textPrice1: {
    fontFamily: fonts.pp_medium,
  },
  body5: {
    marginTop: spacing.sm,
    marginRight: spacing.md,
    width: '100%',
    paddingBottom:spacing.xl
  },
  textTerm: {
    marginLeft: spacing.xm,
    fontSize: sizes.size10,
    color: colors.black,
    flex:1,
    fontFamily: fonts.rlw_regular,
  },
  textTerm1: {color: colors.primary},
  viewFooter: {
    backgroundColor: colors.background_primary,
    padding: spacing.lg,
  },
  press: {
    width: '100%',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: colors.primary,
    marginTop: spacing.md,
  },
  textPress: {
    color: colors.background_primary,
    textAlign: 'center',
    fontSize: sizes.size16,
    fontFamily: fonts.rlw_bold,
    paddingVertical: spacing.md,
  },
  text4: {
    color: colors.text_black2B,
    fontSize: sizes.size16,
    fontFamily: fonts.rlw_medium,
  },
  text5: {
    fontFamily: fonts.pp_medium,
    fontSize: sizes.size16,
    color: colors.primary,
  },
});
