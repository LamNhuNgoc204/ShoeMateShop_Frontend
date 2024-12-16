import {StyleSheet} from 'react-native';
import {colors} from '../../../constants/colors';
import {sizes, spacing} from '../../../constants';
import {fonts} from '../../../constants/fonts';

const c_adst = StyleSheet.create({
  container: {
    backgroundColor: colors.background_secondary,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: colors.colorC8C7C7,
  },
  viewBody: {
    flex: 1,
  },
  body1: {
    backgroundColor: colors.background_primary,
  },
  viewFooter: {
    flexDirection: 'row',
    paddingVertical: spacing.sm,
  },
  textAdd: {
    fontFamily: fonts.rlw_medium,
    fontSize: sizes.size12,
    color: colors.primary,
    marginLeft: spacing.xm,
  },
});

export default c_adst;
