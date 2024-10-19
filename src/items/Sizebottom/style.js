import {StyleSheet} from 'react-native';
import {fonts} from '../../constants/fonts';
import {sizes} from '../../constants';
import {colors} from '../../constants/colors';

export const bottomSheetStyle = StyleSheet.create({
  container: {
    height: 360,
    width: '100%',
    backgroundColor: 'white',
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
  },
  colContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 15,
    justifyContent: 'flex-end',
  },
  handleCountContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: '#838080',
  },
  handleCountBtn: {
    width: 20,
    height: 20,
    objectFit: 'cover',
    resizeMode: 'contain',
  },
  handleCountText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: '#000',
    marginHorizontal: 10,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#C9C7C78A',
    opacity: 0.5,
  },
  sizeText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: '#3498DB',
  },
  sizeView: {
    width: 40,
    height: 40,
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginRight: 10,
  },
  textSizeItem: {
    fontSize: 16,
    lineHeight: 28,
    fontWeight: '400',
    color: '#6A6A6A',
  },
  image: {
    height: 70,
    width: 70,
    objectFit: 'cover',
  },
  buyButton: {
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  bottomContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  txtPress: {
    color: '#fff',
    fontFamily: fonts.rlw_semibold,
    fontSize: sizes.size14,
    lineHeight: 22,
    textAlign: 'center',
  },
  handleBotton: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  minBotton: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  minText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  sizeTouchableOpacity: {
    width: 50,
    height: 50,
    backgroundColor: '#F8F9FA',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 10,
  },
  sizeSelct: {
    backgroundColor: colors.primary,
  },
});
