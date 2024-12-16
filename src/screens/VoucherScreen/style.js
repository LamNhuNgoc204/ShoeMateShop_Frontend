import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
import {fonts} from '../../constants/fonts';

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  inputText: {
    padding: 14,
    backgroundColor: colors.colorDEDEDE,
    borderRadius: 14,
    flex: 1,
  },
  searchSection: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
    height: 48,
  },
  buttonSearch: {
    width: 85,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.color004CFF,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  btnText: {
    fontFamily: fonts.rlw_medium,
    fontSize: 16,
    color: 'white',
  },
  flat: {
    marginTop: 10,
  },
  flatContainer: {
    paddingBottom: 10,
    alignItems: 'center',
  },
});

export default style;
