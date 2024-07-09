import {StyleSheet} from 'react-native';

const appst = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  rowEnd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  //ICON
  icon10: {
    width: 10,
    height: 10,
  },
  icon24: {
    width: 24,
    height: 24,
  },
  icon30: {
    width: 30,
    height: 30,
  },
  icon40: {
    width: 40,
    height: 40,
  },
  icon50: {
    width: 50,
    height: 50,
  },
});
export default appst;
