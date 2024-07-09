import { StyleSheet } from 'react-native'
import {colors} from '../../../constants/colors';
import {sizes, spacing} from '../../../constants';
import {fonts} from '../../../constants/fonts';
 export default styles = StyleSheet.create({
    recentlyViewedContainer: {
        height:sizes.size50,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: spacing.sm,
        paddingStart: spacing.lg,
        paddingEnd: spacing.lg,
        paddingTop: spacing.md,
        paddingBottom: spacing.md,
      },
      recentlyViewed: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      ic_recently: {
        width: sizes.size28,
        height: sizes.size28,
        marginRight: spacing.xs,
      },
    
      text3: {
        fontSize: sizes.size18,
        fontFamily: fonts.rlw_medium,
        color: colors.color001560,
        marginStart: spacing.lg,
      },
})