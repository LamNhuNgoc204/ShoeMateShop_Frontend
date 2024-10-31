export const gotoOrderDetail = async (navigation, index) => {
  navigation.navigate('OrderDetail', {index: index});
};
