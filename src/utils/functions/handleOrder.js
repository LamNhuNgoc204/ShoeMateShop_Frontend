export const gotoOrderDetail = async (name, navigation, index) => {
  navigation.navigate(name, (index && {index: index}));
};
