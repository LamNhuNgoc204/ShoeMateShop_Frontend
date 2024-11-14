import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";

// Tạo channel với importance cao nhất
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
    showBadge: true
  },
  (created) => console.log(`Channel created: ${created}`)
);

// Cấu hình push notification
PushNotification.configure({
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
    // Không tạo notification mới ở đây
    // Chỉ xử lý khi người dùng tương tác với notification
  },

  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);
  },

  popInitialNotification: true,
  requestPermissions: true, // Nên để true để xin quyền
});

// Xử lý foreground messages
messaging().onMessage(async remoteMessage => {
  console.log('Received foreground message:', remoteMessage);
  
  PushNotification.localNotification({
    channelId: "fcm_fallback_notification_channel",
    smallIcon: "ic_notification",
    title: remoteMessage.notification?.title,
    message: remoteMessage.notification?.body,
    
    // Thay đổi các thuộc tính quan trọng
    priority: "max",
    importance: "max",
    
    // Các thuộc tính khác
    autoCancel: true,
    ongoing: false,
    visibility: "public",
    vibrate: true,
    vibration: 1000,
    playSound: true,
    soundName: "default",
    showWhen: true,
    invokeApp: true,
    
    // Thêm các thuộc tính mới
    largeIcon: "ic_launcher",
    bigText: remoteMessage.notification?.body,
    color: "#FF0000",
    ignoreInForeground: false,
    alertAction: "view",
    category: "notification",
    
    // Data từ notification
    userInteraction: false,
    data: remoteMessage.data,
  });
});

// Xử lý background messages
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  
  PushNotification.localNotification({
    // Cấu hình giống như trên
    channelId: "fcm_fallback_notification_channel",
    smallIcon: "ic_notification",
    title: remoteMessage.notification?.title,
    message: remoteMessage.notification?.body,
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
    largeIcon: "ic_launcher",
    bigText: remoteMessage.notification?.body,
    color: "#FF0000",
    ignoreInForeground: false,
    alertAction: "view",
    category: "notification",
    userInteraction: false,
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