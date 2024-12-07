import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
import {fonts} from '../../constants/fonts';

export const fvst = StyleSheet.create({
  container: {
    backgroundColor: colors.background_primary,
    paddingTop: 6,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container2: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 50,
    flex: 1,
    marginBottom: 100,
  },
  text1: {
    marginBottom: 5,
    fontSize: 16,
    fontFamily: fonts.pp_bold,
    textAlign: 'center',
  },
  icon: {
    width: 70,
    height: 70,
  },
});
