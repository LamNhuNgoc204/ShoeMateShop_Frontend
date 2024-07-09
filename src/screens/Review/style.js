import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
import {sizes, spacing} from '../../constants';
import {fonts} from '../../constants/fonts';

const rvst = StyleSheet.create({
  container: {
    backgroundColor: colors.background_primary,
  },
  imgPd: {
    width: 30,
    height: 30,
    borderRadius: 3,
    resizeMode: 'cover',
    marginRight: spacing.xm,
  },
  viewContent: {
    height: 30,
    justifyContent: 'space-between',
  },
  itemPd: {
    backgroundColor: colors.colorF3F6FF,
    padding: spacing.sm,
    flexDirection: 'row',
  },
  name: {
    fontFamily: fonts.rlw_medium,
    fontSize: sizes.size12,
    color: colors.black,
  },
  size: {
    fontFamily: fonts.pp_light,
    fontSize: sizes.size10,
    color: '#a0a0a0',
  },
  viewStar: {
    margin: spacing.sm,
  },
  quality: {
    fontFamily: fonts.rlw_medium,
    fontSize: sizes.size12,
    color: colors.black,
    marginRight: spacing.md,
  },
  viewAsset: {
    marginHorizontal: spacing.sm,
  },
  viewBorder: {
    flexDirection: 'row',
    paddingVertical: spacing.md,
    paddingHorizontal: '12%',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts.rlw_medium,
    fontSize: sizes.size12,
    color: colors.primary,
    marginLeft: spacing.xm,
  },
  flatImg: {
    marginVertical: spacing.md,
    marginHorizontal: spacing.sm,
  },
  imgContainer: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: spacing.sm,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  imgRate: {
    width: 40,
    height: 40,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  pressImg: {
    position: 'absolute',
    right: 1,
    top: 1,
  },
  input:{
    marginHorizontal: spacing.sm,
    backgroundColor: colors.colorF3F6FF,
    padding: spacing.sm,
    borderRadius: 10
  }
});

export default rvst;
