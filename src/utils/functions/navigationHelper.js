import {useNavigation} from '@react-navigation/native';

const navigation = useNavigation();

export const gotoCart = async () => {
  navigation.reset({
    // Đảm bảo tab này là tab đầu tiên khi reset
    index: 0,
    routes: [{name: 'BottomNav', params: {screen: 'CartScreen'}}],
  });
};
