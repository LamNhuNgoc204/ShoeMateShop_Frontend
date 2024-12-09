import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
import {sizes, spacing} from '../../constants';
import {fonts} from '../../constants/fonts';

export const oddt = StyleSheet.create({
  container: {
    backgroundColor: colors.background_secondary,
  },
  itemContainer: {
    backgroundColor: colors.background_primary,
    paddingVertical: spacing.lg,
    flex: 1,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: spacing.lg,
  },
  location: {
    marginRight: spacing.sm,
  },
  txt1: {
    fontFamily: fonts.rlw_semibold,
    fontSize: sizes.size14,
    color: colors.black,
    marginBottom: spacing.xm,
  },
  text2: {
    fontFamily: fonts.rlw_medium,
    fontSize: sizes.size13,
    color: colors.black,
  },
  text3: {
    fontFamily: fonts.pp_regular,
  },
  border: {
    height: 1,
    backgroundColor: '#d1d1d1',
    width: '100%',
    marginVertical: spacing.sm,
  },
  body: {
    marginHorizontal: spacing.lg,
  },
  view: {
    marginBottom: spacing.sm,
  },
  text4: {
    fontFamily: fonts.pp_semibold,
    fontSize: sizes.size15,
    color: colors.black,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: spacing.sm,
    resizeMode: 'cover',
  },
  view1: {
    flex: 1,
    height: 70,
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: fonts.rlw_medium,
    fontSize: sizes.size14,
    color: colors.black,
  },
  text5: {
    fontFamily: fonts.rlw_bold,
    fontSize: sizes.size13,
    color: colors.black,
  },
  text6: {
    fontFamily: fonts.pp_regular,
  },
  text7: {
    fontFamily: fonts.rlw_bold,
    color: colors.black,
    fontSize: sizes.size14,
    marginVertical: spacing.xm,
  },
  text8: {
    fontFamily: fonts.rlw_semibold,
    fontSize: sizes.size14,
    color: colors.black,
  },
  view2: {
    marginHorizontal: spacing.xm,
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: spacing.sm,
  },
  text8: {
    fontFamily: fonts.rlw_semibold,
    fontSize: sizes.size12,
    color: colors.black,
    marginTop: spacing.xm,
  },
  text9: {
    fontFamily: fonts.rlw_bold,
    fontSize: sizes.size14,
    color: colors.black,
    marginBottom: spacing.sm,
  },
  text10: {
    fontFamily: fonts.pp_semibold,
    fontSize: sizes.size14,
    color: colors.black,
  },
  text11: {
    fontFamily: fonts.pp_medium,
    fontSize: sizes.size12,
    color: '#202020',
  },
  text12: {
    fontFamily: fonts.rlw_semibold,
    fontSize: sizes.size12,
    color: colors.black,
  },
  press: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    marginVertical: spacing.lg,
    marginHorizontal: spacing.lg,
    width: '90%',
  },
  disable: {
    backgroundColor: '#ccc',
    borderRadius: 8,
    marginVertical: spacing.lg,
    marginHorizontal: spacing.lg,
    width: '90%',
  },
  titleStyle: {
    color: '#fff',
    fontSize: sizes.size18,
  },
  titleDisable: {
    color: '#000',
    fontSize: sizes.size18,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginHorizontal: 20,
    marginTop: 10,
  },
  modalbuttons: {
    width: '40%',
    borderRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  modalText1: {
    fontSize: 25,
    color: 'orange',
    fontWeight: '700',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  body1: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
  },
  button: {
    paddingHorizontal: 10,
    width: '47%',
    height: 40,
  },
  text1: {
    color: 'white',
    fontWeight: 'bold',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
});
