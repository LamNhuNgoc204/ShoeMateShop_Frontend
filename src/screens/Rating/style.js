import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
import {sizes, spacing} from '../../constants';
import {fonts} from '../../constants/fonts';

const ratingst = StyleSheet.create({
  container: {
    backgroundColor: colors.background_primary,
  },
  //ToRate
  flatRate: {
    marginTop: spacing.sm,
  },
  textRate: {
    textAlign: 'center',
    color: colors.primary,
    fontSize: sizes.size14,
    fontFamily: fonts.rlw_regular,
    marginVertical: spacing.sm,
  },
});

export default ratingst;
