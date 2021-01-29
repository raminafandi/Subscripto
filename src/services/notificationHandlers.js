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
  let nextDate = new Date(date);

  while (nextDate - Date.now() < 0) {
    nextDate.setSeconds(nextDate.getSeconds() + repeatType[1]);
    console.log(nextDate);
  }

  PushNotification.localNotificationSchedule({
    id: id,
    title: title,
    message: message,
    date: nextDate,
    repeatType: repeatType[0],
    allowWhileIdle,
  });
};

export const handleCancelLocalNotificationScheduled = (title, message) => {
  PushNotification.cancelLocalNotifications({id: '123'});
};

export const handleCancel = () => {
  PushNotification.cancelAllLocalNotifications();
};
