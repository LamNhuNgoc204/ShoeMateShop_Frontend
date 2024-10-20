import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';

const itship = StyleSheet.create({
  container: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    borderStyle: 'dashed',
  },
  border: {
    flex: 1,
    borderLeftWidth: 8,
    borderLeftColor: colors.primary,
  },
  view1: {
    marginLeft: 8,
    paddingVertical: 10,
  },
  text1: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 14,
  },
});
export default itship;
