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
    
     
      text4: {
        fontSize: sizes.size14,
        fontFamily: fonts.rlw_medium,
        color: colors.color707B81,
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
      buttonGoogle: {
        backgroundColor: colors.background_secondary,
        borderRadius: sizes.size14,
        height: sizes.size50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.xl,
        flexDirection: 'row',
      },
      iconGoogle: {
        width: sizes.size22,
        height: sizes.size22,
        marginRight: spacing.sm,
      },
      text6: {
        fontSize: sizes.size14,
        fontFamily: fonts.rlw_medium,
        color: colors.text_black,
        fontWeight: 'semibold',
      },
      text7: {
        fontSize: sizes.size16,
        fontFamily: fonts.rlw_medium,
        color: colors.color707B81,
        marginTop: spacing.xm,
      },
      text8: {
        fontSize: sizes.size16,
        fontFamily: fonts.rlw_medium,
        color: colors.text_black,
        marginTop: spacing.xm,
      },
      press: {
        width: '100%',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: colors.primary,
        marginTop: spacing.xl,
      },
      textPress: {
        color: colors.background_primary,
        textAlign: 'center',
        fontSize: sizes.size16,
        fontFamily: fonts.rlw_bold,
        paddingVertical: spacing.md,
      },
})

