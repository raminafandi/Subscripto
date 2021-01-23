import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  handlelocalNotification,
  handleCancel,
  handleCancelLocalNotificationScheduled,
  handlelocalNotificationScheduled,
} from '../services/notificationHandlers';

const WidgetContext = React.createContext({
  getAllWidgets: () => { },
  getWidgetById: () => { },
  createWidget: () => { },
  clearStorage: () => { },
  updateWidgetById: () => { },
  deleteWidgetById: () => { },
  getTotalAmount: () => { },
});

//   updateWidgetById: () => {},
const WidgetProvider = ({ children, ...props }) => {
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
      // console.log(arr);
      handlelocalNotificationScheduled(
        name,
        'Your subscription will be renewed in 1 days.',
        notificationId,
        billingDate,
        'month',
      );
      return newWidget;
    } catch (e) {
      console.log(e);
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
          // arr[elem].notificationId = notificationId;
          //update notification id when changing billingdate
        }
      }
      console.log('elem', arr);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
      return arr;
    } catch (e) {
      alert('Failed to update data from storage');
    }
  };
  const deleteWidgetById = async (idToRemove) => {
    try {
      let arr = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY)).filter(
        (item) => item.id !== idToRemove,
      );
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    } catch (e) {
      alert('Failed to delete data from storage');
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
  const getRate = (from, to) => {
    if (from == to) {
      return 1
    }
    fetch('http://www.floatrates.com/daily/usd.json').then(res => res.json()).then(data => {console.log(data[from.toLowerCase()].rate) })
  }

  const getTotalAmount = (to) => {
    let ret = 0.0;
    return getAllWidgets().then((items) => {
      items.map(item => {
        // get rates
        let rate = getRate(item.currency, to)

        // multiply and add to find total amount in dollar
        ret += rate * parseFloat(item.amount)
      })
      return ret;
    });
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
      }}>
      {children}
    </WidgetContext.Provider>
  );
};

export { WidgetContext, WidgetProvider };
