import {StyleSheet} from 'react-native';
import {sizes, spacing} from '../../../constants';
import {fonts} from '../../../constants/fonts';
import {colors} from '../../../constants/colors';

export const modalst = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    paddingVertical: spacing.lg,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  img: {
    width: 135,
    height: 135,
  },
  modalText: {
    width: 200,
    marginVertical: spacing.md,
    textAlign: 'center',
    fontSize: sizes.size20,
    fontFamily: fonts.rlw_medium,
    color: colors.text_black2B,
  },
  closeButton: {
    marginBottom: spacing.md,
    marginTop: spacing.sm,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 16,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50
  },
  closeButtonText: {
    color: colors.background_primary,
    fontSize: sizes.size16,
    fontFamily: fonts.rlw_medium,
    textAlign: 'center',
  },
  modalContent: {
    fontSize: sizes.size16,
    fontFamily: fonts.rlw_medium,
    color: colors.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: spacing.md,
    marginTop: spacing.xl,
  },
  otpInput: {
    width: sizes.size70,
    height: sizes.size56,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
    fontSize: 18,
    borderRadius: 8,
    backgroundColor: colors.background_secondary,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  otpInput: {
    borderBottomWidth: 1,
    borderBottomColor: colors.text_gray,
    fontSize: 24,
    width: 50,
    height: 50,
    textAlign: 'center',
    marginHorizontal: 5,
  },
});
