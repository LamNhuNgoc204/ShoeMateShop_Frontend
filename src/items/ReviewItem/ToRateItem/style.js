import {StyleSheet} from 'react-native';
import {colors} from '../../../constants/colors';
import {sizes, spacing} from '../../../constants';
import {fonts} from '../../../constants/fonts';

export const rtit = StyleSheet.create({
  container: {
    backgroundColor: colors.colorF3F6FF,
    // width: '100%',
    paddingVertical: spacing.sm,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  code: {
    paddingHorizontal: spacing.sm,
    fontFamily: fonts.rlw_regular,
    fonts: sizes.size12,
    color: colors.black,
  },
  itemContainer: {
    paddingHorizontal: spacing.sm,
    flexDirection: 'row',
    borderBottomColor: colors.color7D848D,
    borderBottomWidth: 0.5,
    paddingVertical: spacing.sm,
    flex: 1,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: spacing.sm,
  },
  name: {
    fontFamily: fonts.rlw_medium,
    fontSize: 14,
    color: colors.black,
    flex: 1,
  },
  view: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
    marginBottom: spacing.xm,
  },
  time: {
    color: '#6A6A6A',
    fontSize: sizes.size12,
    fontFamily: fonts.rlw_regular,
  },
  press: {
    backgroundColor: '#002A8E',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTouch: {
    color: 'white',
    fontSize: sizes.size10,
    fontFamily: fonts.rlw_bold,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
});
