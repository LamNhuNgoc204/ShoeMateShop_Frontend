import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
import {sizes, spacing} from '../../constants';
import {fonts} from '../../constants/fonts';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background_secondary,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  statusText: {
    marginStart: 5,
    fontSize: 14,
    flex: 1,
  },
  dateTimeContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 12,
    color: '#999',
  },
  timeText: {
    fontSize: 12,
    color: '#999',
  },
  product: {
    flexDirection: 'row',
    marginTop: 10,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productSizes: {
    fontSize: 12,
    color: '#666',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  productQuantity: {
    position: 'absolute',
    right: 10,
    top: 10,
    fontSize: 14,
    color: '#666',
  },
});

export default styles;
