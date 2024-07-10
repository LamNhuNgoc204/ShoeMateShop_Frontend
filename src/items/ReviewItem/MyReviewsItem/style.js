import {StyleSheet} from 'react-native';
import {colors} from '../../../constants/colors';
import {sizes, spacing} from '../../../constants';
import {fonts} from '../../../constants/fonts';

const mrvit = StyleSheet.create({
  flat:{
    flex: 1
  },
  container: {
    backgroundColor: colors.background_primary,
  },
  body: {
    flex: 1,
  },
  viewBuying: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    width: '100%',
  },
  buying: {
    width: 300,
    height: 150,
  },
  itemContainer: {
    backgroundColor: colors.colorF3F6FF,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    width: '100%',
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 24,
    marginRight: spacing.xm,
    marginTop: spacing.xm,
  },
  icon: {
    width: 10,
    height: 12,
    marginRight: spacing.xm,
  },
  viewInf: {
    height: 24,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: sizes.size10,
    fontFamily: fonts.rlw_semibold,
    color: colors.black,
  },
  viewRate: {
    flexDirection: 'row',
  },
  time: {
    fontFamily: fonts.pp_regular,
    fontSize: sizes.size10,
    color: '#6a6a6a',
    paddingTop: spacing.xm,
  },
  content: {
    color: colors.black,
    fontFamily: fonts.rlw_regular,
    fontSize: sizes.size10,
    lineHeight: 20,
  },
  imgContainer: {
    flexDirection: 'row',
    paddingVertical: spacing.md,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 10,
  },
  imageRv: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  videoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoDuration: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 8,
  },
  viewRp: {
    backgroundColor: colors.background_primary,
    padding: spacing.sm,
  },
  response: {
    fontFamily: fonts.pp_regular,
    fontSize: sizes.size10,
    color: colors.black,
  },
  rpContent: {
    fontSize: 8,
    color: colors.black,
    fontFamily: fonts.rlw_regular,
    lineHeight: 14,
  },
  item: {
    backgroundColor: colors.background_primary,
    padding: spacing.xm,
    marginTop: spacing.md,
  },
  pdName: {
    marginLeft: spacing.sm,
    color: colors.black,
    fontSize: sizes.size10,
    fontFamily: fonts.rlw_bold,
    flex: 1,
  },
});

export default mrvit;
