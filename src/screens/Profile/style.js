import { StyleSheet } from 'react-native'
import {colors} from '../../constants/colors';
import {sizes, spacing} from '../../constants';

import {fonts} from '../../constants/fonts';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      profile: {
        backgroundColor: colors.colorD8E8FF,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: sizes.size16,
        height:108,
      },
      avatar: {
        width: sizes.size80,
        height: sizes.size80,
        borderRadius: 50,
      },
      info: {
        marginRight: spacing.xxxxl,
      },
      name: {
        fontSize: sizes.size18,
        fontFamily: fonts.rlw_semibold,
        color: colors.color001560,
        marginBottom: spacing.xs,
      },
      email: {
        fontSize: sizes.size14,
        fontFamily: fonts.pp_medium,
        color: colors.color001560,
      },
      logout: {
        width: sizes.size24,
        height: sizes.size24,
      },
      myGadget: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: spacing.md,
        paddingStart: spacing.lg,
      },
      ic_mygadget: {
        width: sizes.size32,
        height: sizes.size32,
        marginRight: spacing.md,
      },
      text1: {
        fontSize: sizes.size20,
        fontFamily: fonts.rlw_medium,
        color: colors.text_black,
      },
      childsMyGadget: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingStart: spacing.lg,
        paddingEnd: spacing.lg,
        paddingTop: spacing.md,
        paddingBottom: spacing.md,
      },
    
})