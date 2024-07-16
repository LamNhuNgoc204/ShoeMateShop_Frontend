import { StyleSheet } from 'react-native'
import {colors} from '../../constants/colors';
import {sizes, spacing} from '../../constants';
import {fonts} from '../../constants/fonts';
export default  styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: spacing.lg,
      paddingBottom: 0,
    },
    title: {
      fontSize: 20,
      fontWeight: 'semibold',
      color: colors.text_black2B,
      fontFamily: fonts.rlw_medium,
    },
    viewBody: {
      marginTop: spacing.lg,
      flex: 1,
    },
    boxwallet: {
      width: 165,
      height: 50,
      backgroundColor: colors.background_onboard,
      marginTop: spacing.md,
      marginBottom: spacing.xl,
      justifyContent: 'center',
      borderRadius: 10,
    },
    textwallet: {
      fontSize: 14,
      fontWeight: 'semibold',
      marginStart: spacing.md,
      color: colors.background_primary,
      fontFamily: fonts.rlw_medium,
    },
    textmoney: {
      fontSize: 14,
      fontWeight: 'bold',
      marginStart: spacing.md,
      color: colors.background_primary,
      fontFamily: fonts.rlw_medium,
    },
  
    input: {
      height: 50,
      padding: 10,
      borderRadius: 10,
      backgroundColor: colors.background_primary,
    },
    lable: {
      fontSize: 16,
      marginBottom: spacing.xm,
      color: colors.text_black2B,
      fontFamily: fonts.pp_medium,
    },
    boxStyles: {
      borderWidth: 0,
      borderRadius: 12,
    },
    selectListContainer: {
      width: '100%',
      maxHeight: 300, 
      borderRadius: 10,
      overflow: 'hidden',
    },
    selectListBox: {
      borderWidth: 0,
      borderRadius: 10,
      backgroundColor: 'white',
    },
    selectListInput: {
      fontSize: 16,
      color: colors.text_black2B,
    },
    selectListDropdown: {
      borderWidth: 1,
      borderColor: colors.colorC8C7C7,
      borderRadius: 10,
      backgroundColor: 'white',
      maxHeight: 130,
    },
    viewButton: {
      position: 'absolute',
      bottom: 8,
      width: '100%',
     
    },
    press: {
      width: '100%',
      alignItems: 'center',
      borderRadius: 12,
      backgroundColor: colors.primary,
      marginTop: spacing.md,
    },
    textPress: {
      color: colors.background_primary,
      textAlign: 'center',
      fontSize: sizes.size16,
      fontFamily: fonts.rlw_bold,
      paddingVertical: spacing.md,
    },
  });