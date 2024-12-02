import {Dimensions, StyleSheet} from 'react-native';
import {sizes, spacing} from '../../../constants';
import {colors} from '../../../constants/colors';
import {fonts} from '../../../constants/fonts';

const {width, height} = Dimensions;

const pddtit = StyleSheet.create({
  container: {
    width: width,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.colorE5EBFC,
    paddingHorizontal: spacing.lg,
    backgroundColor: '#fff',
    marginTop: 5,
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 20,
    marginRight: spacing.sm,
  },
  body1: {
    marginTop: spacing.xm,
  },
  name: {
    fontSize: sizes.size10,
    color: colors.black,
    fontFamily: fonts.rlw_semibold,
    marginBottom: spacing.xm,
  },
  size: {
    color: '#7e7e7e',
    fontSize: sizes.size10,
    fontFamily: fonts.pp_regular,
    lineHeight: 22,
  },
  descript: {
    color: colors.black,
    fontSize: sizes.size12,
    fontFamily: fonts.rlw_regular,
    textAlign: 'justify',
  },
  flex: {
    flex: 1,
  },
  body2: {
    marginTop: spacing.sm,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: spacing.xm,
  },
});

export default pddtit;
