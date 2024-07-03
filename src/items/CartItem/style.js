import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
import {sizes, spacing} from '../../constants';
import {fonts} from '../../constants/fonts';

export const itCart = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: spacing.xm,
  },
  viewContainer: {
    width: '90%',
    backgroundColor: colors.colorFFF,
    padding: spacing.sm,
    borderRadius: 8,
    //ios
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    // android
    elevation: 5,
  },
  image: {
    width: 83,
    height: 85,
    borderRadius: 16,
    marginHorizontal: spacing.sm,
  },
  name: {
    fontFamily: fonts.rlw_medium,
    fontSize: sizes.size16,
    color: colors.text_black,
  },
  price: {
    fontFamily: fonts.pp_medium,
    color: colors.text_black,
    fontSize: sizes.size14,
  },
  viewQuatity: {
    height: 84,
  },
  view: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xm,
  },
  quatity: {
    color: colors.colorFFF,
    fontSize: sizes.size14,
    fontFamily: fonts.pp_regular,
  },
  //Delete
  deleteContainer: {
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    width: 58,
    borderRadius: 8,
    marginRight: spacing.md,
  },
});
