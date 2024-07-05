import {StyleSheet} from 'react-native';
import {sizes, spacing} from '../../constants';
import {fonts} from '../../constants/fonts';
import {colors} from '../../constants/colors';

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
    fontFamily: fonts.pp_medium,
    color: colors.color707B81,
    textAlign: 'center',
  },
});
