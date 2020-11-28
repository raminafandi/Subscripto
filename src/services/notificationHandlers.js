import PushNotification from 'react-native-push-notification';

export const handlelocalNotification = (title, message) => {
  PushNotification.localNotification({
    title: title,
    message: message,
    color: 'red', // (optional) default: system default
  });
};

export const handlelocalNotificationScheduled = (title, message) => {
  PushNotification.localNotificationSchedule({
    title: title,
    message: message,
    date: new Date(Date.now() + 5 * 1000), // in 60 secs
  });
  // .then((pn) => {
  //   console.log(pn);
  // });
};

export const handleCancel = () => {
  PushNotification.cancelAllLocalNotifications();
};
