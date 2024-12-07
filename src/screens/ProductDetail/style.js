import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
import {sizes, spacing} from '../../constants';
import {fonts} from '../../constants/fonts';

const {width, height} = Dimensions.get('window');

const pddt = StyleSheet.create({
  container: {
    backgroundColor: colors.background_secondary,
  },
  pdImg: {
    width: width,
    height: 250,
    resizeMode: 'cover',
  },
  controlItem: {
    width: 40,
    height: 40,
    borderRadius: 5,
    elevation: 10,
  },
  flatItem: {
    margin: spacing.sm,
  },
  body: {
    backgroundColor: colors.background_primary,
    borderRadius: 10,
    padding: spacing.lg,
  },
  iconfav: {
    width: 36,
    height: 36,
    backgroundColor: colors.colorC8C7C7,
    borderRadius: 36,
  },
  bestSl: {
    fontSize: sizes.size14,
    fontFamily: fonts.rlw_regular,
    color: colors.primary,
  },
  body1: {
    marginVertical: spacing.sm,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  name: {
    color: colors.text_black1A,
    fontSize: sizes.size24,
    fontFamily: fonts.rlw_bold,
    flex: 1,
  },
  price: {
    marginTop: spacing.xm,
    color: colors.text_black1A,
    fontSize: sizes.size20,
    fontFamily: fonts.pp_bold,
  },
  textStar: {
    marginHorizontal: spacing.sm,
    color: colors.color507AAB,
    fontSize: sizes.size14,
    fontFamily: fonts.pp_bold,
  },
  bought: {
    color: '#868686',
    fontSize: sizes.size12,
    fontFamily: fonts.pp_regular,
  },
  viewDes: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  des: {
    fontFamily: fonts.rlw_regular,
    fontSize: sizes.size14,
    color: colors.color707B81,
    marginVertical: 5,
    textAlign: 'justify',
    lineHeight: 20,
  },
  readmore: {
    textAlign: 'right',
    color: colors.primary,
    fontSize: sizes.size14,
    fontFamily: fonts.pp_regular,
    lineHeight: 21,
  },
  body2: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: spacing.md,
    marginTop: spacing.xl,
  },
  reviewTitle: {
    fontFamily: fonts.rlw_semibold,
    fontSize: sizes.size14,
    lineHeight: 22,
    color: colors.black,
    borderBottomColor: colors.colorE5EBFC,
    borderBottomWidth: 1,
    paddingBottom: spacing.sm,
  },
  pdHorizon: {
    paddingHorizontal: spacing.lg,
  },
  text1: {
    color: colors.primary,
    fontFamily: fonts.pp_bold,
    fontSize: sizes.size12,
    lineHeight: 22,
    textAlign: 'center',
    marginVertical: spacing.xm,
  },
  border: {
    width: '25%',
    height: 1,
    backgroundColor: colors.black,
  },
  text2: {
    fontFamily: fonts.rlw_semibold,
    fontSize: sizes.size14,
    color: colors.black,
    marginVertical: spacing.md,
    marginHorizontal: spacing.sm,
  },

  footer: {
    backgroundColor: '#F0F6FB',
    paddingHorizontal: spacing.xm,
    width: width,
  },
  pressBuynow: {
    flex: 1,
    height: 50,
    backgroundColor: '#0159A6',
    borderRadius: 12,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  chat: {
    width: 70,
    height: 70,
  },
  pressAddtocart: {
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  txtPress: {
    color: '#fff',
    fontFamily: fonts.rlw_semibold,
    fontSize: sizes.size14,
    lineHeight: 22,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center', // Center the modal vertically
    alignItems: 'center', // Center the modal horizontally
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent gray background
  },

  modalContent: {
    backgroundColor: 'white', // Modal content background
    padding: 20,
    borderRadius: 10,
    width: '80%', // Adjust this width to be relative to screen size
    maxWidth: 400, // Optional: max width for larger screens
    alignItems: 'center', // Center text and buttons inside
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  sizeOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginVertical: 5,
  },

  sizeText: {
    fontSize: 16,
  },
  modalClose: {
    marginTop: 20,
    fontSize: 16,
    color: colors.primary,
  },
});

export default pddt;
