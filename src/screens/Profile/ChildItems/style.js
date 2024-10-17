import {StyleSheet} from 'react-native';
import {fonts} from '../../../constants/fonts';
import {colors} from '../../../constants/colors';
import {sizes, spacing} from '../../../constants';

export default styles = StyleSheet.create({
  recentlyViewedContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  recentlyViewed: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text3: {
    fontSize: sizes.size18,
    fontFamily: fonts.rlw_medium,
    color: colors.color001560,
    marginStart: spacing.lg,
  },
});
