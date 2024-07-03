import {StyleSheet} from 'react-native';
import {colors} from './colors';

const appst = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.background_onboard
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowStart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  columnSb: {
    justifyContent: 'space-between'
  },
  //ICON
  icon24: {
    width: 24,
    height: 24,
  },
});


export default appst;
