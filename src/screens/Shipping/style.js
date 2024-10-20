import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';

const ship = StyleSheet.create({
  text1: {
    paddingVertical: 10,
    textAlign: 'center',
    fontSize: 14,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 0,
  },
  titleButton: {
    color: 'white',
  },
  flat: {
    backgroundColor: 'white',
    marginTop: 20,
  },
});

export default ship;
