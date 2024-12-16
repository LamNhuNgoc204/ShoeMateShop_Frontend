import {StyleSheet} from 'react-native';
import {sizes, spacing} from '../../../constants';
import {colors} from '../../../constants/colors';
import {fonts} from '../../../constants/fonts';

export default anst = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: spacing.lg,
    paddingVertical: 8,
  },
  viewBody: {
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'semibold',
    color: colors.text_black2B,
    fontFamily: fonts.rlw_medium,
  },
  pickerContainer: {
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#ccc',
  },
  label: {
    fontSize: sizes.size16,
    fontFamily: fonts.rlw_medium,
    color: colors.text_black,
    marginBottom: spacing.sm,
  },
  press: {
    width: '100%',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: colors.primary,
  },
  textPress: {
    color: colors.background_primary,
    textAlign: 'center',
    fontSize: sizes.size16,
    fontFamily: fonts.rlw_bold,
    paddingVertical: spacing.md,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 15,
    marginTop: -25,
  },
});
