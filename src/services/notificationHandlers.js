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
    vibrate: true, // (optional) default: true
    priority: 'max', // (optional) set notification priority, default: high
    allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
  });
};

export const handleCancelLocalNotificationScheduled = async (notId) => {
  PushNotification.cancelLocalNotifications({id: notId});
  console.log('done');
  return notId;
};

export const getAllScheduledNotifications = (callback) => {
  console.log(
    'notifivations:',
    PushNotification.getScheduledLocalNotifications(callback),
  );
};

export const handleCancel = () => {
  PushNotification.cancelAllLocalNotifications();
};
