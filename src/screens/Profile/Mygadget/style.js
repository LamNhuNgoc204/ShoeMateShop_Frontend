import {StyleSheet} from 'react-native';
import {colors} from '../../../constants/colors';
import {sizes, spacing} from '../../../constants';
import {fonts} from '../../../constants/fonts';
export default styles = StyleSheet.create({
  childsMyGadget: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  childItem: {
    alignItems: 'center',
  },
  ic_childs_mygadget: {
    marginBottom: spacing.xm,
  },
  text2: {
    fontSize: sizes.size16,
    fontFamily: fonts.rlw_medium,
    color: colors.text_black00,
    textAlign: 'center',
  },
});
