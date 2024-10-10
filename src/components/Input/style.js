import { StyleSheet, Text, View } from 'react-native'
import { sizes, spacing } from '../../constants';
import { fonts } from '../../constants/fonts';
import { colors } from '../../constants/colors';

export default styles = StyleSheet.create({
    viewInput: {
      marginBottom: spacing.xl,
      position: 'relative',
    },
    label: {
      fontSize: sizes.size16,
      fontFamily: fonts.rlw_medium,
      color: colors.text_black,
      marginBottom: spacing.sm,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background_secondary,
      borderRadius: sizes.size14,
      height: sizes.size48,
    },
    input: {
      flex: 1,
      paddingHorizontal: spacing.sm,
    },
    iconContainer: {
      padding: spacing.sm,
    },
    icon: {
      width: sizes.size22,
      height: sizes.size22,
    },
  });
  