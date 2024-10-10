import AsyncStorage from '@react-native-async-storage/async-storage';
export const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        // Token exists
        console.log("Token retrieved: " + token);
        return token;
      } else {
        // Token does not exist
        console.log("No token found");
        return null;
      }
    } catch (error) {
      console.error("Failed to fetch token: " + error.message);
      return null;
    }
  };