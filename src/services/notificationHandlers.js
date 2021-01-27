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

  let nextDate = new Date(date)
  nextDate.setSeconds(nextDate.getSeconds() + repeatType[1])

  PushNotification.localNotificationSchedule({
    id: id,
    title: title,
    message: message,
    date: nextDate,
    repeatType: repeatType[0],
  });
};

export const handleCancelLocalNotificationScheduled = (title, message) => {
  PushNotification.cancelLocalNotifications({ id: '123' });
};

export const handleCancel = () => {
  PushNotification.cancelAllLocalNotifications();
};
