import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
import {sizes, spacing} from '../../constants';
import {fonts} from '../../constants/fonts';

export const c_outst = StyleSheet.create({
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
  body2:{
    marginTop: spacing.sm
  },
  bd2Text1:{
    color: colors.black,
    fontSize: sizes.size14,
    fontFamily: fonts.rlw_semibold,
    marginLeft: spacing.md
  },
  flat:{
    marginHorizontal: spacing.sm,
    marginTop: spacing.sm
  },



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
    fontSize: sizes.size14,
    fontFamily: fonts.rlw_bold,
    paddingVertical: spacing.sm,
  },
  text4: {
    color: colors.text_black2B,
    fontSize: sizes.size16,
    fontFamily: fonts.rlw_medium,
  },
  text5: {
    fontFamily: fonts.pp_medium,
    fontSize: sizes.size16,
    color: colors.primary
  },
});
