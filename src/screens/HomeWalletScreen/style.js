import { StyleSheet } from 'react-native'
import { sizes, spacing } from '../../constants';

import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: spacing.lg,
      },
      title: {
        fontSize: 20,
        fontWeight: 'semibold',
        color: colors.text_black2B,
        fontFamily: fonts.rlw_medium,
      },
      viewBody: {
        marginTop: spacing.lg,
      },
      balance: {
        fontSize: sizes.size18,
        fontWeight: 'semibold',
        color: colors.colorA0A0A0,
        fontFamily: fonts.rlw_medium,
      },
      price: {
        fontSize: sizes.size28,
        fontWeight: 'semibold',
        color: colors.text_black2B,
        fontFamily: fonts.pp_bold,
      },
      point: {
        fontSize: sizes.size16,
        fontWeight: 'semibold',
        color: colors.text_black00,
        fontFamily: fonts.pp_medium,
      },
      button: {
        marginTop: spacing.sm,
        backgroundColor: colors.color0159A6,
        borderRadius: sizes.size12,
        height: sizes.size48,
        width: 126,
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonText: {
        fontSize: sizes.size16,
        fontWeight: 'semibold',
        color: colors.colorFFF,
        fontFamily: fonts.rlw_bold,
      },
      history: {
        fontSize: sizes.size18,
        fontWeight: 'semibold',
        color: colors.text_black2B,
        fontFamily: fonts.rlw_medium,
        marginTop: spacing.lg,
      },
    
  filterContainer: {
    marginVertical: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  picker: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 14,
  },
})

