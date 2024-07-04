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
        fontSize: sizes.size16,
        fontFamily: fonts.pp_medium,
        color: colors.color707B81,
        marginBottom: spacing.sm,
        textAlign: 'center',
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
    
      ViewInput:{
        marginTop: spacing.lg
      }
})

