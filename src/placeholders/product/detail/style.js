import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageBox: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  infoContainer: {
    marginBottom: 20,
  },
  title: {
    width: '60%',
    height: 20,
    marginBottom: 8,
    borderRadius: 4,
  },
  price: {
    width: '40%',
    height: 20,
    marginBottom: 8,
    borderRadius: 4,
  },
  rating: {
    width: '30%',
    height: 20,
    marginBottom: 8,
    borderRadius: 4,
  },
  description: {
    width: '100%',
    height: 80,
    marginBottom: 8,
    borderRadius: 4,
  },
  button: {
    width: '100%',
    height: 200,
    borderRadius: 8,
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
