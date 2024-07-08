import {StyleSheet} from 'react-native';
import {sizes, spacing} from '../../constants';
import {colors} from '../../constants/colors';
import {fonts} from '../../constants/fonts';

export const odst = StyleSheet.create({
  flat1: {
    paddingTop: spacing.sm,
  },
  flat2: {
    marginTop: spacing.md,
  },
  border: {
    backgroundColor: colors.color93B3FF,
    height: 1,
    borderRadius: 1,
    flex: 1,
  },
  text: {
    marginHorizontal: spacing.md,
    fontFamily: fonts.rlw_semibold,
    fontSize: sizes.size12,
    color: colors.black,
  },
  text1: {
    fontFamily: fonts.rlw_medium,
    fontSize: sizes.size11,
    color: '#5E5E5E',
  },
  img: {
    width: 70,
    height: 70,
  },
  view: {
    width: '100%',
    paddingVertical: 60,
  },
});
