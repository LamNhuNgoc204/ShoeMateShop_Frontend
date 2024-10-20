import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
import {fonts} from '../../constants/fonts';

const payst = StyleSheet.create({
  container: {
    margin: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  text1: {
    color: 'black',
    fontSize: 16,
    marginLeft: 20,
    fontFamily: fonts.pp_medium,
  },
});

export default payst;
