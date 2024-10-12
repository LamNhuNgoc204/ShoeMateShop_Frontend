import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
import {sizes, spacing} from '../../constants';
import {fonts} from '../../constants/fonts';

const {width, height} = Dimensions.get('window');

export const bottomSheetStyle = StyleSheet.create({
  container: {
    height: 340,
    width: '100%',
    backgroundColor: 'white'
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20
  },
  colContainer: {
    display: 'flex',
    flexDirection: "column",
    marginLeft: 15,
    justifyContent: 'flex-end'
  },
  handleCountContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  priceText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: "#838080",
  },
  handleCountBtn: {
    width: 20, height: 20,
    objectFit: 'cover',
    resizeMode: 'contain'
  },
  handleCountText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: "#000",
    marginHorizontal: 10
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: "#C9C7C78A",
    opacity: 0.5
  },
  sizeText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: "#3498DB"
  },
  sizeView: {
    width: 40,
    height: 40,
    backgroundColor: "#F8F9FA",
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginRight: 10
  },
  textSizeItem: {
    fontSize: 16,
    lineHeight: 28,
    fontWeight: '400',
    color: "#6A6A6A"
  },
  image: {
    height: 70,
    width: 70,
    objectFit: 'cover'
  },
  buyButton: {
    width: '100%',
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white'
  },
  txtPress: {
    color: '#fff',
    fontFamily: fonts.rlw_semibold,
    fontSize: sizes.size14,
    lineHeight: 22,
    textAlign: 'center',
  },
  handleBotton: {
    width: 20, height: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  minBotton: {
    width: 20, height: 20,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  minText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary
  }
})

const pddt = StyleSheet.create({
  container: {
    backgroundColor: colors.background_secondary,
  },
  pdImg: {
    width: width,
    height: 200,
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
    marginVertical: spacing.md,
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
    width: '45%',
    height: 50,
    backgroundColor: '#0159A6',
    borderRadius: 12,
  },
  footer1: {
    width: '50%',
  },
  chat: {
    width: 70,
    height: 70,
  },
  pressAddtocart: {
    width: '70%',
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 12,
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
