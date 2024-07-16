import { StyleSheet } from "react-native";
import { sizes, spacing } from '../../../constants';
import { colors } from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';
export default styles = StyleSheet.create({
    titlehistory: {
      fontSize: sizes.size18,
      fontWeight: '700',
      color: colors.text_black2B,
      fontFamily: fonts.rlw_medium,
      marginBottom: spacing.sm,
    },
    datehistory: {
      fontSize: sizes.size16,
      fontWeight: 'semibold',
      color: colors.color615D5D,
      fontFamily: fonts.pp_medium,
    },
    priceminushistory: {
      fontSize: sizes.size18,
      fontWeight: '700',
      color: colors.colorDC1414,
      fontFamily: fonts.pp_medium,
    },
    priceplushistory: {
      fontSize: sizes.size18,
      fontWeight: '700',
      color: colors.color23AD00,
      fontFamily: fonts.pp_medium,
    },
  });