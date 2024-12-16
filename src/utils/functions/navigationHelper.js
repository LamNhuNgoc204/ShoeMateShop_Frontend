export const gotoCart = async navigation => {
  navigation.reset({
    // Đảm bảo tab này là tab đầu tiên khi reset
    index: 0,
    routes: [{name: 'BottomNav', params: {screen: 'CartScreen'}}],
  });
};
