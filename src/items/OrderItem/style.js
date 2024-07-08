import {StyleSheet} from 'react-native';
import {withDecay} from 'react-native-reanimated';
import {sizes, spacing} from '../../constants';
import {fonts} from '../../constants/fonts';
import {colors} from '../../constants/colors';

const odit = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: spacing.sm,
    marginBottom: spacing.sm,
    paddingBottom: spacing.xm,
  },
  textCode: {
    fontFamily: fonts.rlw_semibold,
    fontSize: sizes.size15,
    color: colors.black,
    paddingHorizontal: spacing.lg,
  },
  itemContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginRight: spacing.sm,
  },
  viewContent: {
    height: 70,
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: fonts.rlw_medium,
    fontSize: sizes.size14,
    color: colors.black,
  },
  text: {
    fontFamily: fonts.rlw_bold,
    fontSize: sizes.size12,
    color: colors.black,
  },
  text1: {
    fontFamily: fonts.pp_regular,
  },
  view1: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: colors.colorB7B7B7,
    borderTopColor: colors.colorB7B7B7,
  },
  quatity: {
    fontFamily: fonts.pp_regular,
    fontSize: sizes.size12,
    color: colors.black,
  },
  total: {
    fontFamily: fonts.rlw_regular,
    fontSize: sizes.size12,
    color: colors.black,
  },
  price: {
    fontFamily: fonts.pp_regular,
  },
  view2: {
    paddingVertical: spacing.xm,
    paddingHorizontal: spacing.lg,
  },
  textWait: {
    fontFamily: fonts.rlw_medium,
    fontSize: sizes.size10,
    color: colors.black,
  },
  press: {
    marginVertical: spacing.sm,
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  textTouch: {
    color: '#fff',
    paddingVertical: spacing.sm,
    fontSize: sizes.size14,
    textAlign: 'center'
  },
  textCancel: {
    fontSize: sizes.size10,
    fontFamily: fonts.rlw_medium,
    color: colors.color707070
  },
});
export default odit;
