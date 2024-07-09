import { StyleSheet } from 'react-native'
import { sizes, spacing } from '../../../constants';
import { fonts } from '../../../constants/fonts';
import { colors } from '../../../constants/colors';

export default styles = StyleSheet.create({
    text: {
      fontSize: sizes.size16,
      fontWeight: 'semibold',
      color: colors.black,
      fontFamily: fonts.rlw_medium,
    },
    text1: {
      fontSize: sizes.size14,
      marginEnd: spacing.sm,
      color: colors.black,
      fontFamily: fonts.rlw_medium,
    },
    
    line: {
      width: '100%',
      height: 1,
      marginTop: sizes.size24
    },
  });