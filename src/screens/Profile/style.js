import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
import {sizes, spacing} from '../../constants';

import {fonts} from '../../constants/fonts';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    backgroundColor: colors.colorF2F7FF,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: sizes.size16,
    paddingVertical: 8,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  info: {
    marginLeft: 10,
  },
  name: {
    fontSize: sizes.size16,
    fontFamily: fonts.rlw_semibold,
    color: colors.color001560,
    marginBottom: 5,
  },
  email: {
    fontSize: sizes.size12,
    fontFamily: fonts.pp_medium,
    color: colors.color001560,
  },
  myGadget: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingStart: spacing.lg,
    marginVertical: 4,
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
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});
