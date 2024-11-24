import { StyleSheet } from 'react-native'
import {fonts} from '../../constants/fonts';
import {colors} from '../../constants/colors';
import {sizes, spacing} from '../../constants';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.lg,
        paddingBottom: 0,
      },
      depositIcon: {
        width: 50,
        height: 50,
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
      viewInput: {
        marginTop: spacing.xm,
        backgroundColor: colors.background_primary,
        padding: spacing.md,
        borderRadius: 10,
      },
      label: {
        fontSize: 16,
        marginBottom: spacing.xm,
        color: colors.text_black2B,
        fontFamily: fonts.pp_medium,
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 67,
        borderRadius: 5,
        backgroundColor: colors.colorE9F3FF,
        paddingHorizontal: 10,
      },
      boldText: {
        fontWeight: 'bold',
      },
      dollarSign: {
        fontSize: sizes.size20,
        color: colors.text_black2B,
        fontWeight: 'bold',
        marginTop: spacing.sm,
      },
      textInput: {
        flex: 1,
        height: '100%',
        fontSize: sizes.size22,
        paddingHorizontal: 10,
        fontWeight: 'bold',
      },
      closeIcon: {
        width: sizes.size24,
        height: sizes.size24,
      },
      currentBalance: {
        marginTop: spacing.lg,
        fontSize: sizes.size16,
        color: colors.color707B81,
        fontFamily: fonts.pp_medium,
      },
      valueButtonsContainer: {
        flexDirection: 'row',
        marginTop: spacing.md,
        justifyContent: 'space-between',
      },
      valueButton: {
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.colorC8C7C7,
        backgroundColor: colors.background_primary,
      },
      selectedValueButton: {
        backgroundColor: colors.colorE9F3FF,
        borderColor: colors.background_blue,
      },
      valueButtonText: {
        fontSize: sizes.size16,
        color: colors.text_black2B,
      },
      line: {
        width: '100%',
        height: 1,
        marginTop: spacing.lg,
      },
      depositButton: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      depositButtonText: {
        fontSize: sizes.size14,
        color: colors.text_black2B,
        fontFamily: fonts.pp_medium,
        marginLeft: spacing.sm,
      },
      depositContainer: {
        marginTop: spacing.lg,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      totalcheckout: {
        marginTop: spacing.sm,
        fontSize: sizes.size16,
        color: colors.primary,
        fontFamily: fonts.pp_medium,
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
      summaryContainer: {
        marginTop: spacing.lg,
        backgroundColor: colors.background_primary,
        padding: spacing.md,
        borderRadius: 10,
      },
      bottomContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: spacing.md,
        paddingTop: spacing.xm,
        backgroundColor: colors.background_primary,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
      text:{
        fontSize: sizes.size12,
        color: colors.color95989A,
        fontFamily: fonts.pp_medium,
        marginTop: spacing.sm
      },
      TermOfUse:{
        color: colors.primary
      }
})