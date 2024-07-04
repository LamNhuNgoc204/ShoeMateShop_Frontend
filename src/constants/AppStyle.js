import {StyleSheet} from 'react-native';

const appst = StyleSheet.create({
  container: {
    flex: 1,
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
    justifyContent: 'space-between',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  //ICON
  icon24: {
    width: 24,
    height: 24,
  },
  icon30: {
    width: 30,
    height: 30,
  },
});
export default appst;
