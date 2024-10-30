import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginTop: 16,
    alignSelf: 'center',
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  categoryItem: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginBottom: 16,
    marginRight: 5,
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  productItem: {
    width: 170,
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
});

export default styles;
