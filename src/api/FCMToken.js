
import messaging from '@react-native-firebase/messaging';

export const checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    messaging().notifi;
    if (enabled) {
     return getToken();
    } else {
      requestPermission();
    }
  };
  const getToken = async () => {
    const fcmToken = await messaging().getToken();
    return fcmToken
  };
  const requestPermission = async () => {
    console.log('requestPermission call');
    try {
      await messaging().requestPermission();
      getToken();
    } catch (error) {}
  };