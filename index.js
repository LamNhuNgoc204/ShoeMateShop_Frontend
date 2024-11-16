import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";

// Tạo channel với importance cao nhất và tắt badge
PushNotification.createChannel(
  {
    channelId: "fcm_fallback_notification_channel",
    channelName: "Important Notifications",
    channelDescription: "Used for important notifications", 
    importance: 5,
    vibrate: true,
    playSound: true,
    soundName: "default",
    enableVibrate: true,
    enableLights: true,
    showBadge: false // Tắt badge trên channel
  },
  (created) => console.log(`Channel created: ${created}`)
);

// Cấu hình push notification với tắt badge cho iOS
PushNotification.configure({
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
  },

  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);
  },

  // Tắt badge cho iOS
  permissions: {
    badge: false,
    alert: true,
    sound: true,
  },

  popInitialNotification: true,
  requestPermissions: true,
});

// Reset badge number về 0
PushNotification.setApplicationIconBadgeNumber(0);

// Cấu hình notification chung
const notificationConfig = {
  channelId: "fcm_fallback_notification_channel",
  priority: "max",
  importance: "max",
  autoCancel: true,
  ongoing: false,
  visibility: "public",
  vibrate: true,
  vibration: 1000,
  playSound: true,
  soundName: "default",
  showWhen: true,
  invokeApp: true,
  color: "#FFFFFF",
  ignoreInForeground: false,
  alertAction: "view",
  category: "notification",
  userInteraction: false,
  
  // Tắt badges và icons
  badge: 0,
  number: 0,
  smallIcon: "",
  largeIcon: "",
};

// Xử lý foreground messages
messaging().onMessage(async remoteMessage => {
  console.log('Received foreground message:', remoteMessage);
  
  PushNotification.localNotification({
    ...notificationConfig,
    title: remoteMessage.notification?.title,
    message: remoteMessage.notification?.body,
    bigText: remoteMessage.notification?.body,
    data: remoteMessage.data,
  });
});

// Xử lý background messages
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  
  PushNotification.localNotification({
    ...notificationConfig,
    title: remoteMessage.notification?.title,
    message: remoteMessage.notification?.body,
    bigText: remoteMessage.notification?.body,
    data: remoteMessage.data,
  });
});

// Kiểm tra và yêu cầu permission khi khởi động app
const checkPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

checkPermission();

AppRegistry.registerComponent(appName, () => App);