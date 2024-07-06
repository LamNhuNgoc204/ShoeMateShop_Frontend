import { StyleSheet } from 'react-native'
import appst from '../../constants/AppStyle';
import {sizes, spacing} from '../../constants';
import {fonts} from '../../constants/fonts';
import {colors} from '../../constants/colors';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.lg,
        backgroundColor: 'white',
      },
      text1: {
        fontSize: sizes.size32,
        fontFamily: fonts.rlw_semibold,
        color: colors.text_black,
        marginTop: spacing.lg,
        marginBottom: spacing.sm,
        fontWeight: 'bold',
      },
      text2: {
        fontSize: sizes.size18,
        fontFamily: fonts.rlw_medium,
        color: colors.color707B81,
        marginBottom: spacing.sm,
        textAlign: 'center',
      },
    
      text3: {
        fontSize: sizes.size20,
        fontFamily: fonts.rlw_medium,
        color: colors.text_black2B,
        marginTop: spacing.xsm,
        fontWeight: 'bold',
      },

      text4: {
        fontSize: sizes.size14,
        fontFamily: fonts.rlw_medium,
        color: colors.color7D848D,
        marginTop: spacing.xm,
      },

      button: {
        backgroundColor: colors.primary,
        borderRadius: sizes.size14,
        height: sizes.size50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.xl,
      },
      text5: {
        fontSize: sizes.size16,
        fontFamily: fonts.rlw_medium,
        color: colors.colorFFF,
        fontWeight: 'semibold',
      },
      otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: spacing.md,
        marginTop: spacing.xl,
      },
      otpInput: {
        width: sizes.size70,
        height: sizes.size56,
        borderWidth: 1,
        borderColor: '#ddd',
        textAlign: 'center',
        fontSize: 18,
        borderRadius: 8,
        backgroundColor: colors.background_secondary,
      },
      
})

