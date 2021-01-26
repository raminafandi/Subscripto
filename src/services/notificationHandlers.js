import PushNotification from 'react-native-push-notification';

export const handlelocalNotification = (title, message) => {
  PushNotification.localNotification({
    title: title,
    message: message,
    color: 'red', // (optional) default: system default
  });
};

export const handlelocalNotificationScheduled = (
  title,
  message,
  id,
  date,
  repeatType,
) => {
  console.log(date - Date.now());

  PushNotification.localNotificationSchedule({
    id: id,
    title: title,
    message: message,
    date: new Date(date), // in 60 secs
    repeatType: repeatType,
  });
};

export const handleCancelLocalNotificationScheduled = (title, message) => {
  PushNotification.cancelLocalNotifications({id: '123'});
};

export const handleCancel = () => {
  PushNotification.cancelAllLocalNotifications();
};
