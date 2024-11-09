import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';

const requestUserPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        return true;
      }
      return false;
    } else if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Notification Permission',
          message: 'App needs notification permission to receive messages',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
  } catch (error) {
    console.error('Permission request failed:', error);
    return false;
  }
};

const getFCMToken = async () => {
  try {
    // Check if permission is granted
    const hasPermission = await requestUserPermission();
    if (!hasPermission) {
      console.log('No permission for notifications');
      return null;
    }

    // For Android, ensure device is registered
    if (Platform.OS === 'android') {
      await messaging().registerDeviceForRemoteMessages();
    }

    // Get the token
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('FCM Token:', fcmToken);
      return fcmToken;
    } else {
      console.log('Failed to get FCM token');
      return null;
    }
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

// Function to handle background messages
const backgroundMessageHandler = async (remoteMessage) => {
  console.log('Background Message received:', remoteMessage);
  // Handle your background message here
};

// Setup message handlers
const setupMessageHandlers = () => {
  // Register background handler
  messaging().setBackgroundMessageHandler(backgroundMessageHandler);

  // Handle foreground messages
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('Foreground Message received:', remoteMessage);
    // Handle your foreground message here
  });

  return unsubscribe;
};

export { getFCMToken, setupMessageHandlers };