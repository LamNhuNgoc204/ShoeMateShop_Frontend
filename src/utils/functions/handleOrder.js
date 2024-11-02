export const gotoOrderDetail = async (name, navigation, item) => {
  navigation.navigate(name, (item && {item: item}));
};
