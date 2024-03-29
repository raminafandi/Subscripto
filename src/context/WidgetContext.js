import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  handlelocalNotification,
  handleCancel,
  handleCancelLocalNotificationScheduled,
  handlelocalNotificationScheduled,
  getAllScheduledNotifications,
} from '../services/notificationHandlers';
import axios from 'axios';
import {repeatType} from '../utils/repeattype';

const WidgetContext = React.createContext({
  getAllWidgets: () => {},
  getWidgetById: () => {},
  createWidget: () => {},
  clearStorage: () => {},
  restoreWidgets: () => {},
  updateWidgetById: () => {},
  deleteWidgetById: () => {},
  getTotalAmount: () => {},
  getCurrency: () => {},
});

//   updateWidgetById: () => {},
const WidgetProvider = ({children, ...props}) => {
  const STORAGE_KEY = '@user_widgets';

  function guidGenerator() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      S4() +
      Date.now()
    );
  }

  const getAllWidgets = async () => {
    try {
      let arr = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
      if (arr != null) return arr;
      return [];
    } catch (e) {
      alert('Failed to fetch the data from storage');
    }
  };

  const getWidgetById = async (id) => {
    try {
      let element = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY)).find(
        (x) => x.id === id,
      );
      console.log(element);
      return element;
    } catch (e) {
      alert('Failed to find data from storage');
    }
  };

  const restoreWidgets = async (arr) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
      return true;
    } catch (e) {
      alert('Failed to restore data from storage');
    }
  };

  const createWidget = async (
    name,
    amount,
    currency,
    billingDate,
    billingPeriod,
    iconName,
    description,
    paymentMethod,
  ) => {
    try {
      let id = guidGenerator();
      let notificationId = Math.floor(Math.random() * 90000) + 1000;
      const newWidget = {
        id,
        name,
        amount,
        currency,
        billingDate,
        billingPeriod,
        iconName,
        description,
        paymentMethod,
        notificationId,
      };

      // console.log(newWidget);
      let arr = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
      if (arr) {
        await arr.push(newWidget);
      } else {
        arr = [newWidget];
      }
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
      if (billingPeriod === 'Daily') {
        handlelocalNotificationScheduled(
          name,
          'Your subscription will be renewed in 1 hour.',
          notificationId,
          billingDate,
          repeatType[billingPeriod],
        );
      } else {
        handlelocalNotificationScheduled(
          name,
          'Your subscription will be renewed in 1 day.',
          notificationId,
          billingDate,
          repeatType[billingPeriod],
        );
      }
      return newWidget;
    } catch (e) {
      console.log('Catch error', e);
      alert('Failed to create data ');
    }
  };
  const updateWidgetById = async (
    id,
    name,
    amount,
    currency,
    billingDate,
    billingPeriod,
    iconName,
    description,
    paymentMethod,
    // notificationId,
  ) => {
    try {
      let arr = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
      for (var elem in arr) {
        if (arr[elem].id === id) {
          arr[elem].name = name;
          arr[elem].amount = amount;
          arr[elem].currency = currency;
          arr[elem].billingDate = billingDate;
          arr[elem].billingPeriod = billingPeriod;
          arr[elem].iconName = iconName;
          arr[elem].description = description;
          arr[elem].paymentMethod = paymentMethod;

          //update notification id when changing billingdate
          // getAllScheduledNotifications();
          console.log('elem', arr);
          await handleCancelLocalNotificationScheduled(
            arr[elem].notificationId,
          );
          if (billingPeriod === 'Daily') {
            handlelocalNotificationScheduled(
              name,
              'Your subscription will be renewed in 1 hour.',
              arr[elem].notificationId,
              billingDate,
              repeatType[billingPeriod],
            );
          } else {
            handlelocalNotificationScheduled(
              name,
              'Your subscription will be renewed in 1 day.',
              arr[elem].notificationId,
              billingDate,
              repeatType[billingPeriod],
            );
          }
        }
      }
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
      return arr;
    } catch (e) {
      alert('Failed to update data from storage', e);
    }
  };
  const deleteWidgetById = async (idToRemove) => {
    try {
      let arr = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
      let item = arr.filter((item) => item.id === idToRemove);
      let notId = item[0].notificationId;
      arr = arr.filter((item) => item.id !== idToRemove);
      handleCancelLocalNotificationScheduled(notId);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    } catch (e) {
      alert('Failed to delete data from storage', e);
    }
  };
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      alert('Storage successfully cleared!');
    } catch (e) {
      alert('Failed to clear the async storage.');
    }
  };

  // return rate respect to dollar
  const getRate = async (from, to) => {
    if (from == to) {
      return 1;
    }
    // check exist or not
    let oneWeek = 86400 * 1000 * 7;
    let updateDate = await AsyncStorage.getItem('rates');
    if ((updateDate == null) | (parseInt(updateDate) - Date.now() > oneWeek)) {
      let res = await axios.get('https://www.floatrates.com/daily/usd.json');
      await AsyncStorage.setItem('rates', JSON.stringify(res.data));
      await AsyncStorage.setItem('updateDate', JSON.stringify(Date.now()));
      return res.data[from.toLowerCase()].rate;
    }
    const res = JSON.parse(await AsyncStorage.getItem('rates'));
    return res[from.toLowerCase()].rate;
  };

  const getCurrency = async () => {
    let currency = await AsyncStorage.getItem('currency');
    if (currency) return currency;
    return 'USD';
  };

  const getTotalAmount = async (to) => {
    const items = await getAllWidgets();
    let sum = 0.0;

    for (var i = 0; i < items.length; i++) {
      let rate = await getRate(items[i].currency, to);
      sum += (1 / parseFloat(rate)) * parseFloat(items[i].amount);
    }

    let currency = await getCurrency();

    if (currency == 'USD') {
      return sum.toFixed(2);
    }

    let newRate = await getRate(currency, to);
    return (sum * parseFloat(newRate)).toFixed(2);
  };

  return (
    <WidgetContext.Provider
      value={{
        getAllWidgets: getAllWidgets,
        getWidgetById: getWidgetById,
        updateWidgetById: updateWidgetById,
        createWidget: createWidget,
        deleteWidgetById: deleteWidgetById,
        clearStorage: clearStorage,
        getTotalAmount: getTotalAmount,
        restoreWidgets: restoreWidgets,
        getCurrency: getCurrency,
      }}>
      {children}
    </WidgetContext.Provider>
  );
};

export {WidgetContext, WidgetProvider};
